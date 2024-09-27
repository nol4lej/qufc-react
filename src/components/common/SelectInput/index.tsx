import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    error?: string;
    placeholder: string;
    isDisabled?: boolean;
    register: UseFormRegisterReturn;
}

export const SelectInput = ({
    id,
    label,
    value,
    options,
    error,
    placeholder,
    isDisabled = false,
    register,
}: SelectInputProps) => {
    const [disabled, setDisabled] = useState(isDisabled);

    useEffect(() => {
        setDisabled(options.length === 0);
    }, [options.length]);

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2">{label}</label>
            <select
                id={id}
                value={value}
                disabled={disabled}
                className={`p-2 border border-gray-300 rounded-md ${error ? 'border-red-500' : ''}`}
                {...register}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option, index) => (
                    <option value={option.value} key={index}>{option.label}</option>
                ))}
            </select>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};