"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calendar as CalendarIcon, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Sparkles,
  Check,
  X,
  MessageSquare,
  Loader2,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filter, setFilter] = useState("ALL") // ALL, PENDING, CONFIRMED, COMPLETED, CANCELLED
  const supabase = createClient()

  const fetchAppointments = async () => {
    setLoading(true)
    let query = supabase
      .from('appointments')
      .select(`
        *,
        client:clients(name, phone),
        service:services(name, price),
        specialist:specialists(name)
      `)
      .eq('appointment_date', selectedDate)
      .order('start_time', { ascending: true })

    if (filter !== "ALL") {
      query = query.eq('status', filter)
    }

    const { data, error } = await query
    
    if (error) console.error("Error fetching appointments:", error)
    else setAppointments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate, filter])

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id)
    
    if (error) console.error("Error updating status:", error)
    else fetchAppointments()
  }

  const changeDate = (days: number) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + days)
    setSelectedDate(date.toISOString().split('T')[0])
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bebas tracking-tight text-neutral-900">
            AGENDA DE <span className="text-brand-deep-pink">CITAS</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg font-outfit">Control total de tus reservas y horarios.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-brand-pink/20 shadow-sm">
          <button 
            onClick={() => changeDate(-1)}
            className="p-2 hover:bg-brand-pink/10 rounded-xl transition-colors text-neutral-400 hover:text-brand-deep-pink"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="px-4 py-2 text-center min-w-[200px]">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest block leading-none mb-1">
              {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long' })}
            </span>
            <span className="text-xl font-bebas text-neutral-900 tracking-wider">
              {new Date(selectedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <button 
            onClick={() => changeDate(1)}
            className="p-2 hover:bg-brand-pink/10 rounded-xl transition-colors text-neutral-400 hover:text-brand-deep-pink"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all border",
              filter === status 
                ? "bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-900/10 scale-105" 
                : "bg-white text-neutral-400 border-brand-pink/20 hover:border-brand-deep-pink/40 hover:text-neutral-600"
            )}
          >
            {status === "ALL" ? "Todas" : 
             status === "PENDING" ? "Pendientes" : 
             status === "CONFIRMED" ? "Confirmadas" : 
             status === "COMPLETED" ? "Completadas" : "Canceladas"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col h-[40vh] items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" />
          <p className="text-neutral-400 font-medium font-outfit">Consultando agenda...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group"
            >
              <Card className="bg-white border-brand-pink/20 hover:border-brand-deep-pink/30 transition-all duration-300 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch">
                <div className={cn(
                  "w-2 md:w-4 transition-colors",
                  apt.status === 'COMPLETED' ? 'bg-teal-400' :
                  apt.status === 'CONFIRMED' ? 'bg-brand-pink' : 
                  apt.status === 'PENDING' ? 'bg-amber-400' : 'bg-red-400'
                )} />
                
                <div className="p-6 md:p-8 flex-1 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
                  {/* Time & Price */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-neutral-900">
                      <Clock className="w-5 h-5 text-brand-deep-pink" />
                      <span className="text-3xl font-bebas tracking-wider tabular-nums">{apt.start_time}</span>
                    </div>
                    <div className="text-2xl font-bebas text-brand-deep-pink">
                      RD$ {Number(apt.service?.price || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Client */}
                  <div className="md:col-span-1 lg:col-span-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-deep-pink font-bold border border-brand-pink/20">
                        {apt.client?.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 text-lg font-outfit leading-none">{apt.client?.name}</div>
                        <div className="text-xs text-neutral-400 mt-1">{apt.client?.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="md:col-span-1 lg:col-span-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-deep-pink" />
                      <span className="font-bold text-neutral-700 text-sm uppercase tracking-wide">{apt.service?.name}</span>
                    </div>
                  </div>

                  {/* Specialist (Desktop only badge) */}
                  <div className="hidden lg:block">
                    <div className="px-4 py-2 bg-neutral-50 rounded-2xl border border-neutral-100 inline-flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-deep-pink" />
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{apt.specialist?.name.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    {apt.status === 'PENDING' && (
                      <button 
                        onClick={() => handleStatusUpdate(apt.id, 'CONFIRMED')}
                        className="px-4 py-2 bg-brand-pink/10 text-brand-deep-pink rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-deep-pink hover:text-white transition-all border border-brand-pink/20"
                      >
                        Confirmar
                      </button>
                    )}
                    
                    {apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'COMPLETED')}
                          className="p-3 rounded-2xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                          title="Marcar como completada"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'CANCELLED')}
                          className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Cancelar"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <a 
                      href={`https://wa.me/${apt.client?.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-brand-pink/20 text-brand-deep-pink hover:bg-brand-deep-pink hover:text-white transition-all shadow-sm"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-white border border-brand-pink/10 rounded-[40px] shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-brand-pink/5 rounded-full flex items-center justify-center animate-pulse">
              <CalendarIcon className="w-12 h-12 text-brand-pink/40" />
            </div>
            <div>
              <h3 className="text-3xl font-bebas text-neutral-900 tracking-wide">Día despejado</h3>
              <p className="text-neutral-400 font-medium font-outfit mt-2">
                No hay citas {filter !== "ALL" ? "con este estado" : ""} programadas para esta fecha.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
