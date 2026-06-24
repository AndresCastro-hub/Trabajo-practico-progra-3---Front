import BottomNav from "@/components/navigation/mobile/BottomNav";
import MobileHeader from "@/components/navigation/mobile/MobileHeader";
import Sidebar from "@/components/navigation/Sidebar";
import { NotificacionGlobal } from "@/components/Notificaciones/NotificacionGlobal";
import { ModoControlProvider } from "@/context/ModoControlContext";
import { NotificacionProvider } from "@/context/NotificacionContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ModoControlProvider>
      <NotificacionProvider>
        <NotificacionGlobal /> 

        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <MobileHeader />
            <main className="flex-1 overflow-y-auto bg-gray-50">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </NotificacionProvider>
    </ModoControlProvider>
  )
}