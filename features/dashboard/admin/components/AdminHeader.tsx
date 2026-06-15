import { ShieldUser } from 'lucide-react';

export default function AdminHeader (){
    return (
        <div className="flex flex-row gap-4 items-center mb-2 p-4">
            <ShieldUser size={50}  />
            <span>
                <p className="text-lg font-semibold">Panel de administración</p>
                <p className="text-sm text-gray-500 ">Solo accesible para administradores</p>
            </span>
        </div>
    )
}