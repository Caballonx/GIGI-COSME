"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Calendar, 
  Users, 
  Sparkles, 
  DollarSign, 
  Settings, 
  LayoutDashboard, 
  ChevronRight,
  Menu,
  X,
  UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Citas", href: "/admin/appointments", icon: Calendar },
  { name: "Especialistas", href: "/admin/specialists", icon: UserCheck },
  { name: "Servicios", href: "/admin/services", icon: Sparkles },
  { name: "Clientes", href: "/admin/clients", icon: Users },
  { name: "Ingresos", href: "/admin/revenue", icon: DollarSign },
  { name: "Ajustes", href: "/admin/settings", icon: Settings },
]

export default function AdminClientLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-brand-light flex text-neutral-900 font-outfit selection:bg-brand-pink/30">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-brand-pink/20 hidden md:flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="h-20 flex items-center px-8 border-b border-brand-pink/10">
          <Link href="/admin" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-deep-pink rounded-lg flex items-center justify-center shadow-lg shadow-brand-deep-pink/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bebas tracking-wider text-neutral-900">
              GIGI<span className="text-brand-deep-pink group-hover:text-brand-deep-pink/80 transition-colors">ADMIN</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                    active 
                      ? "bg-brand-pink/20 text-brand-deep-pink" 
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-brand-pink/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      active ? "text-brand-deep-pink" : "text-neutral-400 group-hover:text-neutral-600"
                    )} />
                    <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                  </div>
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-deep-pink shadow-md" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="p-6 border-t border-brand-pink/10 space-y-4">
          <div className="p-4 rounded-2xl bg-brand-pink/5 border border-brand-pink/10">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Usuario</p>
            <p className="text-sm font-bold text-neutral-900">Admin GIGI</p>
          </div>
          <button className="w-full py-3 rounded-xl bg-neutral-900 text-white font-bebas tracking-widest hover:bg-neutral-800 transition-colors">
            CERRAR SESIÓN
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 transition-opacity md:hidden",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white border-r border-brand-pink/20 z-50 flex flex-col transform transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-20 flex items-center justify-between px-8 border-b border-brand-pink/10">
          <span className="text-2xl font-bebas tracking-wider">
            GIGI<span className="text-brand-deep-pink">ADMIN</span>
          </span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    active
                      ? "bg-brand-pink/20 text-brand-deep-pink"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-brand-pink/5"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-brand-pink/10 flex items-center justify-between px-6 md:hidden sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-neutral-500"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-2xl font-bebas tracking-wider">
            GIGI<span className="text-brand-deep-pink">ADMIN</span>
          </span>
          <div className="w-10 h-10 rounded-full bg-brand-pink/20" />
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-brand-light">
          <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12 animate-in fade-in duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
