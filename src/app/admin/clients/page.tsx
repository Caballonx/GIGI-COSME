"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Loader2,
  ExternalLink,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createClient()

  const fetchClients = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        appointments:appointments(count)
      `)
      .order('name', { ascending: true })
    
    if (error) console.error("Error fetching clients:", error)
    else setClients(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" />
        <p className="text-neutral-400 font-medium font-outfit">Cargando base de clientes...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bebas tracking-tight text-neutral-900">
            NUESTROS <span className="text-brand-deep-pink">CLIENTES</span>
          </h1>
          <p className="text-neutral-500 mt-2 text-lg font-outfit">Base de datos de contacto y fidelidad.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-2xl font-bebas tracking-widest hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10">
          <UserPlus className="w-5 h-5" />
          AÑADIR CLIENTE
        </button>
      </header>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-deep-pink transition-colors" />
        <input 
          type="text" 
          placeholder="Buscar por nombre, teléfono o email..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-brand-pink/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-pink/50 font-outfit text-neutral-700 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Clients Table */}
      <Card className="bg-white border-brand-pink/20 rounded-3xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] bg-brand-pink/5">
                <tr>
                  <th className="px-8 py-5 font-bold">Cliente</th>
                  <th className="px-8 py-5 font-bold">Contacto</th>
                  <th className="px-8 py-5 font-bold">Citas Realizadas</th>
                  <th className="px-8 py-5 font-bold text-center">Registro</th>
                  <th className="px-8 py-5 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pink/10">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-brand-pink/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-lg font-bold text-brand-deep-pink border border-brand-pink/20">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 text-base font-outfit">{client.name}</div>
                          <div className="text-xs text-neutral-400 uppercase tracking-widest font-bold mt-0.5">Frecuente</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-neutral-600 font-medium">
                          <Phone className="w-3.5 h-3.5 text-brand-deep-pink" />
                          {client.phone}
                        </div>
                        {client.email && (
                          <div className="flex items-center gap-2 text-neutral-400 text-xs">
                            <Mail className="w-3.5 h-3.5" />
                            {client.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-brand-pink/20 text-brand-deep-pink rounded-lg font-bold text-xs">
                          {client.appointments?.[0]?.count || 0}
                        </div>
                        <span className="text-neutral-500 text-xs font-medium">Servicios</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <Calendar className="w-4 h-4 text-neutral-300" />
                        <span className="text-neutral-500 text-xs font-bold font-outfit">
                          {new Date(client.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <button className="p-2.5 rounded-xl bg-brand-pink/20 text-brand-deep-pink hover:bg-brand-deep-pink hover:text-white transition-all shadow-sm">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 rounded-xl text-neutral-400 hover:text-neutral-900 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredClients.length === 0 && (
        <div className="py-24 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 text-brand-pink" />
            </div>
            <h3 className="text-2xl font-bebas text-neutral-900">No se encontraron clientes</h3>
            <p className="text-neutral-400 font-medium font-outfit max-w-md">
              Intenta buscar por otro nombre o añade un nuevo cliente manualmente.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
