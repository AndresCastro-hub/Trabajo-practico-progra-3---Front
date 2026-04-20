import BottomNav from "@/components/navigation/mobile/BottomNav"
import MobileHeader from "@/components/navigation/mobile/MobileHeader"
import Sidebar from "@/components/navigation/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <MobileHeader />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  )
}