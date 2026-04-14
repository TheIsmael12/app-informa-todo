import { useEffect, RefObject } from "react";

interface UseOutsideClickOptions {
  onOutsideClick: () => void;
  isActive: boolean;
  lockScroll?: boolean;
}

/**
 * Hook personalizado que detecta clicks fuera de un elemento y gestiona el scroll
 *
 * @param ref - Referencia al elemento que se quiere detectar clicks fuera
 * @param options - Opciones de configuración
 *
 * @example
 * ```tsx
 * const menuRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * useOutsideClick(menuRef, {
 *   onOutsideClick: () => setIsOpen(false),
 *   isActive: isOpen,
 *   lockScroll: true
 * });
 * ```
 */

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  options: UseOutsideClickOptions,
) {
  const { onOutsideClick, isActive, lockScroll = false } = options;

  useEffect(() => {
    // Si no está activo, no hacer nada
    if (!isActive) {
      return;
    }

    // Función que maneja el click
    const handleClickOutside = (event: MouseEvent) => {
      // Si el ref no existe o el click fue dentro del elemento, no hacer nada
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Click fuera del elemento
      onOutsideClick();
    };

    // Función que maneja la tecla Escape
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOutsideClick();
      }
    };

    // Agregar listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Manejar scroll del body
    if (lockScroll) {
      // Bloquear scroll sin usar position fixed para evitar conflictos con elementos fixed
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);

      // Restaurar scroll
      if (lockScroll) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  }, [ref, onOutsideClick, isActive, lockScroll]);
}
