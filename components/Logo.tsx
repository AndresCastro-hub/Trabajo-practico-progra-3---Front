import { Zap } from "lucide-react";

export default function Logo() {
    return (
        <>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="font-semibold text-foreground text-lg tracking-tight">
                Vitalis
            </span>
        </>
    )
}