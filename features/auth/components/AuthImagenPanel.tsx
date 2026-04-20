interface Props {
    src: string;
    alt: string;
    badge: string;
    heading: React.ReactNode;
}

export default function AuthImagePanel({ src, alt, badge, heading }: Props) {
    return (
        <aside className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-12 left-10 right-10 text-white">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-medium tracking-wide opacity-90">{badge}</span>
                </div>
                <h2 className="text-3xl font-bold leading-tight">{heading}</h2>
            </div>
        </aside>
    );
}