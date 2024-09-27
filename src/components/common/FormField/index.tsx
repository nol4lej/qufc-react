interface FormFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (id: string, value: string) => void;
    error?: string;
    type?: string;
    placeholder?: string;
}

export const FormField = ({ label, id, value, onChange, error, type = "text", placeholder }: FormFieldProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
                className={`p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder={placeholder}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};