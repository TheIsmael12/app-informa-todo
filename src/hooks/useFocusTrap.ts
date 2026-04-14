import { useEffect, useRef, RefObject } from 'react';

interface UseFocusTrapOptions<T extends HTMLElement = HTMLElement> {
    isActive: boolean;
    onEscape?: () => void;
    ref?: RefObject<T | null>;
}

/**
 * Hook para capturar el foco dentro de un elemento (modal, dialog, etc.)
 * Mejora la accesibilidad manteniendo el foco dentro del contenedor
 */

export function useFocusTrap<T extends HTMLElement>(
    options: UseFocusTrapOptions<T>
) {

    const { isActive, onEscape, ref: externalRef } = options;
    const internalRef = useRef<T | null>(null);
    const containerRef = externalRef || internalRef;
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        
        if (!isActive || !containerRef.current) return;

        // Guardar el elemento activo antes de abrir el modal
        previousActiveElement.current = document.activeElement as HTMLElement;

        const container = containerRef.current;

        // Selector de elementos focusables
        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        // Función para verificar si un elemento es visible y focusable
        const isElementVisible = (el: HTMLElement): boolean => {
            // Verificar display y visibility
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }

            // Verificar aria-hidden
            if (el.getAttribute('aria-hidden') === 'true') {
                return false;
            }

            // Verificar si tiene dimensiones (está renderizado)
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) {
                return false;
            }

            return true;
        };

        // Función para obtener elementos focusables
        const getFocusableElements = (): HTMLElement[] => {
            return Array.from(
                container.querySelectorAll<HTMLElement>(focusableSelector)
            ).filter(isElementVisible);
        };

        // Enfocar el primer elemento focusable al abrir
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            // Dar un pequeño delay para que el modal se renderice completamente
            setTimeout(() => {
                focusableElements[0]?.focus();
            }, 10);
        }

        // Variable para rastrear navegación con teclado
        let isKeyboardNavigation = false;

        // Manejar la navegación con teclado
        const handleKeyDown = (event: KeyboardEvent) => {
            // Marcar que estamos usando navegación por teclado
            if (event.key === 'Tab') {
                isKeyboardNavigation = true;
            }

            // ESC para cerrar
            if (event.key === 'Escape' && onEscape) {
                event.preventDefault();
                onEscape();
                return;
            }

            // Solo manejar Tab
            if (event.key !== 'Tab') return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement as HTMLElement;

            let nextElement: HTMLElement | null = null;

            // Shift + Tab (ir hacia atrás)
            if (event.shiftKey) {
                if (activeElement === firstElement) {
                    event.preventDefault();
                    nextElement = lastElement;
                }
            } else {
                // Tab (ir hacia adelante)
                if (activeElement === lastElement) {
                    event.preventDefault();
                    nextElement = firstElement;
                }
            }

            // Si hay un siguiente elemento, enfocarlo y asegurar que sea visible
            if (nextElement) {
                nextElement.focus();
                // No hacer scroll aquí, dejar que handleFocus lo maneje
            }
        };

        // Listener para asegurar que elementos enfocados sean visibles en scroll
        // Solo aplicar cuando el usuario navega con teclado
        const handleFocus = (event: FocusEvent) => {
            if (!isKeyboardNavigation) return;
            
            const target = event.target as HTMLElement;
            if (target && container.contains(target)) {
                // Resetear flag después de procesar
                setTimeout(() => {
                    isKeyboardNavigation = false;
                }, 0);
                
                // Usar requestAnimationFrame para evitar conflictos con la navegación
                requestAnimationFrame(() => {
                    // Usar 'auto' en lugar de 'smooth' para evitar retrasos en contenedores anidados
                    target.scrollIntoView({
                        behavior: 'auto',
                        block: 'nearest',
                        inline: 'nearest'
                    });
                });
            }
        };

        // Agregar listeners
        container.addEventListener('keydown', handleKeyDown);
        container.addEventListener('focusin', handleFocus);

        // Cleanup
        return () => {
            container.removeEventListener('keydown', handleKeyDown);
            container.removeEventListener('focusin', handleFocus);

            // Restaurar el foco al elemento anterior
            if (previousActiveElement.current) {
                setTimeout(() => {
                    previousActiveElement.current?.focus();
                }, 10);
            }
        };
    }, [isActive, onEscape, containerRef]);

    return externalRef ? undefined : (internalRef as RefObject<T | null>);
}
