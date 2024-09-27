interface BoxComponentProps {
    title?: string;
    children: React.ReactNode;
}

export const BoxComponent = ({ title, children }: BoxComponentProps) => {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            {
                title &&
                <div className="mb-4 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                </div>
            }
            <div className="text-gray-700 leading-relaxed">
                {children}
            </div>
        </div>
    )
}