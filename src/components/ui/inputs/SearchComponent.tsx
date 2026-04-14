import { useEffect, useState, useRef } from "react";

import InputComponent from "@/components/ui/inputs/InputComponent";

import { SearchComponentProps } from "@/types/ui";

export default function SearchComponent({
    id,
    name,
    label,
    value,
    debounceTime = 500,
    onChange,
}: SearchComponentProps) {

    const [localValue, setLocalValue] = useState(value);

    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                const syntheticEvent = {
                    target: { value: localValue },
                } as React.ChangeEvent<HTMLInputElement>;
                onChangeRef.current(syntheticEvent);
            }
        }, debounceTime);

        return () => clearTimeout(timer);
    }, [localValue, debounceTime, value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    return (

        <InputComponent
            id={id}
            name={name}
            type="search"
            label={label}
            placeholder="search"
            value={localValue}
            onChange={handleChange}
        />

    );

}