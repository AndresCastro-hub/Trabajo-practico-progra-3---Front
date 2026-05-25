interface ButtonConfig {
    label: string
    onClick: () => void
}

interface IHeader {
    title: string
    subtitle?: string
    buttons?: ButtonConfig[]
}

export default function Header({ title, subtitle, buttons = [] }: IHeader) {
    return (
        <header className="bg-gray-50 px-4 md:px-8 py-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                    {subtitle && (
                        <p className="text-gray-500 mt-0.5">{subtitle}</p>
                    )}
                </div>

                {buttons.length > 0 && (
                    <div className="flex items-center gap-2">
                        {buttons.map((btn, index) => (
                            <button
                                key={index}
                                onClick={btn.onClick}
                                className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors bg-green-500 hover:bg-green-600 text-white"
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </header>
    )
}