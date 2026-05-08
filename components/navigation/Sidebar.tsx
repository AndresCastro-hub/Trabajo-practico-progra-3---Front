"use client"
import Logo from "../Logo"
import CardUser from "./CardUser"
import SideBarNav from "./SideBarNav/SideBarNav"

export default function Sidebar() {

  return (
    <aside className="hidden md:flex flex-col w-[260px] min-w-[260px] h-full bg-white border-r border-gray-100">

      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <Logo />
      </div>

      <SideBarNav/>

      <CardUser/>
    </aside>
  )
}