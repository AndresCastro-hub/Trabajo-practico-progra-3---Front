import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RecetaActionButton() {
    const router = useRouter();
    return (
        <Button className="h-[50px] px-6" onClick={() => router.push("/recetario/nueva")}>
            + Nueva Receta Global
        </Button>
    )
}