"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Clock, 
  DollarSign,
  Loader2,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createClient()

  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('category', { ascending: true })
    
    if (error) console.error("Error fetching services:", error)
    else setServices(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = Array.from(new Set(services.map(s => s.category))).filter(Boolean)

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" />
        <p className="text-neutral-400 font-medium font-outfit">Cargando catálogo...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bebas tracking-tight text-neutral-900">
            GESTIÓN DE <span className="text-brand-deep-pink">SERVICIOS</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg font-outfit">Administra tu catálogo de belleza y precios.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-2xl font-bebas tracking-widest hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10">
          <Plus className="w-5 h-5" />
          NUEVO SERVICIO
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-deep-pink transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-brand-pink/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-pink/50 font-outfit text-neutral-700 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-brand-pink/20 rounded-2xl text-neutral-600 font-bold text-xs uppercase tracking-widest hover:bg-brand-pink/5 transition-all">
            <Filter className="w-4 h-4" />
            FILTRAR
          </button>
        </div>
      </div>

      {/* Categories Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat: any) => (
          <div key={cat} className="p-4 bg-white border border-brand-pink/10 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{cat}</span>
            <span className="text-xl font-bebas text-neutral-900">
              {services.filter(s => s.category === cat).length} SERVICIOS
            </span>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="bg-white border-brand-pink/20 hover:border-brand-deep-pink/40 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl relative">
              <div className="absolute top-4 right-4 z-10">
                <button className="p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-brand-pink/10 text-neutral-400 hover:text-brand-deep-pink transition-all shadow-sm">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="h-48 bg-brand-pink/5 relative overflow-hidden">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-brand-pink/30" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/80 to-transparent">
                  <span className="px-3 py-1 bg-brand-pink/20 text-brand-deep-pink text-[10px] font-bold rounded-full uppercase tracking-widest border border-brand-pink/30">
                    {service.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bebas tracking-wide text-neutral-900 group-hover:text-brand-deep-pink transition-colors">
                  {service.name}
                </h3>
                <p className="text-neutral-400 text-sm font-outfit mt-2 line-clamp-2 min-h-[40px]">
                  {service.description || "Sin descripción disponible."}
                </p>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-brand-pink/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Precio</span>
                    <div className="text-2xl font-bebas text-neutral-900">
                      RD$ {Number(service.price).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Duración</span>
                    <div className="flex items-center gap-1.5 text-neutral-600 font-bold font-outfit">
                      <Clock className="w-4 h-4 text-brand-deep-pink" />
                      {service.duration} min
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-pink/10 text-brand-deep-pink rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-deep-pink hover:text-white transition-all">
                    <Edit2 className="w-4 h-4" />
                    EDITAR
                  </button>
                  <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-24 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-brand-pink" />
            </div>
            <h3 className="text-2xl font-bebas text-neutral-900">No se encontraron servicios</h3>
            <p className="text-neutral-400 font-medium font-outfit max-w-md">
              Intenta buscar con otros términos o crea un nuevo servicio para tu catálogo.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
