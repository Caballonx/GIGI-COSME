"use client"

import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Star, Loader2, ArrowUpRight, TrendingUp, Check, X, MessageSquare, Sparkles } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { cn } from "@/lib/utils"

const COLORS = ['#f06292', '#b2dfdb', '#fce4ec', '#4db6ac', '#8b5cf6']

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      const stats = await res.json()
      setData(stats)
    } catch (err) {
      console.error("Error fetching stats:", err)
    }
  }

  useEffect(() => {
    fetchStats().then(() => setLoading(false))
    
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (res.ok) {
        fetchStats()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-brand-pink rounded-full animate-pulse" />
          <Loader2 className="w-12 h-12 text-brand-deep-pink animate-spin absolute inset-0" />
        </div>
        <p className="text-neutral-400 font-medium animate-pulse font-outfit">Cargando métricas...</p>
      </div>
    )
  }

  const { summary, weeklyRevenue, serviceData, todayAppointments } = data || {}

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bebas tracking-tight text-neutral-900">
            BIENVENIDO, <span className="text-brand-deep-pink">ADMIN</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg font-outfit">Resumen de GIGI STYLE para el día de hoy.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-brand-pink/20 shadow-sm">
          <div className="px-4 py-2 bg-brand-pink/20 rounded-xl border border-brand-pink/30">
            <span className="text-brand-deep-pink text-sm font-bold flex items-center gap-2 font-outfit">
              <TrendingUp className="w-4 h-4" />
              Live Dashboard
            </span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Citas Hoy", value: summary?.citasHoy || 0, icon: Calendar, color: "#f06292", label: "Programadas" },
          { title: "Ingresos Hoy", value: `RD$ ${summary?.ingresosHoy?.toLocaleString() || 0}`, icon: DollarSign, color: "#b2dfdb", label: "Generados" },
          { title: "Clientes Nuevos", value: `+${summary?.nuevosClientes || 0}`, icon: Users, color: "#fce4ec", label: "Esta semana" },
          { title: "Calificación", value: summary?.rating?.toFixed(1) || 5.0, icon: Star, color: "#f06292", label: "Promedio" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="bg-white border-brand-pink/20 hover:border-brand-deep-pink/30 transition-all duration-300 group overflow-hidden relative shadow-sm hover:shadow-md rounded-3xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-16 h-16" style={{ color: stat.color }} />
              </div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.title}</CardTitle>
                <div className="p-2 rounded-lg bg-brand-pink/10 group-hover:bg-brand-pink/20 transition-colors">
                  <stat.icon className="w-4 h-4 text-brand-deep-pink" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bebas tracking-wider text-neutral-900">{stat.value}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1 h-1 rounded-full animate-pulse bg-brand-deep-pink" />
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="h-full bg-white border-brand-pink/20 rounded-3xl shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-neutral-900 text-xl font-bebas tracking-wide">Ingresos de la Semana</CardTitle>
                <p className="text-sm text-neutral-400 font-outfit mt-1">Histórico de rendimiento</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-300" />
            </CardHeader>
            <CardContent className="h-[350px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyRevenue}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f06292" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f06292" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fce4ec" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#neutral-200" 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontWeight: 'bold' }} 
                    axisLine={false} 
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#neutral-200" 
                    tick={{ fill: '#a3a3a3', fontSize: 10, fontWeight: 'bold' }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #fce4ec', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#f06292', fontWeight: 'bold' }}
                    labelStyle={{ color: '#737373', marginBottom: '4px', fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ingresos" 
                    stroke="#f06292" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorIngresos)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="h-full bg-white border-brand-pink/20 rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-neutral-900 text-xl font-bebas tracking-wide">Distribución de Servicios</CardTitle>
              <p className="text-sm text-neutral-400 font-outfit mt-1">Servicios populares</p>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {serviceData?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #fce4ec', borderRadius: '16px' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle" 
                    formatter={(value) => <span className="text-neutral-500 text-xs font-bold uppercase tracking-tighter">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Appointments Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white border-brand-pink/20 rounded-3xl shadow-sm overflow-hidden">
          <CardHeader className="border-b border-brand-pink/10 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-neutral-900 text-xl font-bebas tracking-wide">PRÓXIMAS CITAS</CardTitle>
                <p className="text-sm text-neutral-400 font-outfit mt-1">Listado detallado para hoy</p>
              </div>
              <button className="text-xs font-bold text-brand-deep-pink hover:underline uppercase tracking-widest">
                Ver todas
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] bg-brand-pink/5">
                  <tr>
                    <th className="px-6 py-4 font-bold">Hora</th>
                    <th className="px-6 py-4 font-bold">Cliente</th>
                    <th className="px-6 py-4 font-bold">Servicio</th>
                    <th className="px-6 py-4 font-bold">Especialista</th>
                    <th className="px-6 py-4 font-bold text-center">Estado</th>
                    <th className="px-6 py-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink/10">
                  {todayAppointments?.length > 0 ? todayAppointments.map((apt: any) => (
                    <tr key={apt.id} className="hover:bg-brand-pink/5 transition-colors group">
                      <td className="px-6 py-5 font-bold text-neutral-900 tabular-nums">{apt.startTime}</td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-neutral-900 font-outfit">{apt.client.name}</div>
                        <div className="text-xs text-neutral-400 mt-0.5">{apt.client.phone}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-neutral-700 font-semibold">{apt.service.name}</div>
                        <div className="text-brand-deep-pink font-bebas text-lg mt-0.5">RD$ {apt.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-[10px] font-bold text-brand-deep-pink border border-brand-pink/30">
                            {apt.specialist.name.charAt(0)}
                          </div>
                          <span className="text-neutral-600 font-medium">{apt.specialist.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-bold rounded-full border tracking-wider uppercase",
                            apt.status === 'COMPLETED' ? 'bg-teal-50 text-teal-600 border-teal-200' :
                            apt.status === 'CONFIRMED' ? 'bg-brand-pink/10 text-brand-deep-pink border-brand-pink/20' : 
                            apt.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                            'bg-red-50 text-red-600 border-red-200'
                          )}>
                            {apt.status === 'COMPLETED' ? 'Completada' : 
                             apt.status === 'CONFIRMED' ? 'Confirmada' : 
                             apt.status === 'PENDING' ? 'Pendiente' : 'Cancelada'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          {apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED' && (
                            <>
                              <button 
                                onClick={() => handleStatusUpdate(apt.id, 'COMPLETED')}
                                className="p-2 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                                title="Marcar como completada"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(apt.id, 'CANCELLED')}
                                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                title="Cancelar cita"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <a 
                            href={`https://wa.me/${apt.client.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-brand-pink/20 text-brand-deep-pink hover:bg-brand-deep-pink hover:text-white transition-all shadow-sm"
                            title="Enviar WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-brand-pink/10 rounded-full flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-brand-pink" />
                          </div>
                          <p className="text-neutral-400 font-medium text-lg font-outfit">No hay citas programadas para hoy.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
