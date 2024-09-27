interface SectionComponentProps {
    title: string;
    children: React.ReactNode;
}

export const SectionComponent = ({ title, children }: SectionComponentProps) => {
    return (
        <div className="w-full p-6 rounded-md bg-gray-100 shadow-lg border border-gray-200">
            <div className="mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
                {children}
            </div>
        </div>
    )
}