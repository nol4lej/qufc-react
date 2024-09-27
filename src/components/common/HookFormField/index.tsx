import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
    type: string;
    placeholder: string;
    register: UseFormRegister<any>;
    name: string;
    error?: FieldError;
    label: string;
}

export const HookFormField = ({ type, placeholder, register, name, error, label }: FormFieldProps) => {
    return (
        <div className="grid grid-cols-1 gap-2">
            <label className="block text-gray-700 text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && (
                <p className="text-red-500">{error.message}</p>
            )}
        </div>
    );
};