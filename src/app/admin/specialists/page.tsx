"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  UserCheck, 
  Sparkles, 
  MapPin, 
  Clock,
  ShieldCheck,
  Edit2,
  Camera,
  Loader2,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchSpecialists = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('specialists')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) console.error("Error fetching specialists:", error)
    else setSpecialists(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSpecialists()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" />
        <p className="text-neutral-400 font-medium font-outfit">Cargando perfiles...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bebas tracking-tight text-neutral-900">
            NUESTRA <span className="text-brand-deep-pink">EXPERTA</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg font-outfit">Gestiona los perfiles del equipo y especialidades.</p>
        </div>
      </header>

      <div className="grid gap-8">
        {specialists.map((specialist) => (
          <motion.div
            key={specialist.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white border-brand-pink/20 rounded-[40px] shadow-sm overflow-hidden border-2">
              <div className="grid md:grid-cols-12 gap-0">
                {/* Photo Section */}
                <div className="md:col-span-4 bg-brand-pink/10 relative h-[400px] md:h-auto">
                  <img 
                    src={specialist.photo_url || "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&h=800&auto=format&fit=crop"} 
                    alt={specialist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-6 left-6 md:hidden">
                    <h2 className="text-4xl font-bebas text-white tracking-wider">{specialist.name}</h2>
                    <p className="text-brand-pink font-bold text-sm uppercase tracking-widest">{specialist.specialty}</p>
                  </div>
                  <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-brand-pink/20 text-brand-deep-pink hover:bg-brand-deep-pink hover:text-white transition-all shadow-lg">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                {/* Info Section */}
                <div className="md:col-span-8 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="hidden md:block mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-6xl font-bebas text-neutral-900 tracking-tight">{specialist.name}</h2>
                      <div className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full border border-teal-100 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Activo</span>
                      </div>
                    </div>
                    <p className="text-brand-deep-pink font-bebas text-2xl tracking-widest">{specialist.specialty}</p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-pink" />
                        Biografía Profesional
                      </h3>
                      <p className="text-neutral-600 text-lg font-outfit leading-relaxed">
                        {specialist.bio || "No hay biografía configurada para este especialista."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-brand-pink/5 rounded-3xl border border-brand-pink/10">
                        <div className="flex items-center gap-3 text-neutral-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Ubicación</span>
                        </div>
                        <p className="text-neutral-900 font-bold font-outfit">Sede Central - GIGI STYLE</p>
                      </div>
                      <div className="p-6 bg-brand-pink/5 rounded-3xl border border-brand-pink/10">
                        <div className="flex items-center gap-3 text-neutral-400 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Estado de Citas</span>
                        </div>
                        <p className="text-neutral-900 font-bold font-outfit">Disponible para Reservas</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-neutral-900 text-white rounded-2xl font-bebas tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20">
                        <Edit2 className="w-5 h-5" />
                        EDITAR PERFIL
                      </button>
                      <button className="p-4 bg-white border-2 border-brand-pink/20 text-neutral-400 rounded-2xl hover:border-brand-deep-pink hover:text-brand-deep-pink transition-all">
                        <Settings className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
