"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, Clock, Sparkles, User, CheckCircle, Loader2, ChevronRight, ChevronLeft, Heart, Star } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Step = 1 | 2 | 3 | 4 | 5

export function BookingWidget() {
  const [step, setStep] = useState<Step>(1)
  
  // Data state
  const [services, setServices] = useState<any[]>([])
  const [specialists, setSpecialists] = useState<any[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  
  // Selection state
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  
  // Form state
  const [clientData, setClientData] = useState({ name: "", phone: "", email: "" })
  
  // UI state
  const [loading, setLoading] = useState(true)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, specialistsRes] = await Promise.all([
          fetch("/api/services").then(res => res.json()),
          fetch("/api/specialists").then(res => res.json())
        ])
        setServices(Array.isArray(servicesRes) ? servicesRes : [])
        setSpecialists(Array.isArray(specialistsRes) ? specialistsRes : [])
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error cargando los datos. Por favor recarga la página.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Fetch availability when date, service or specialist changes
  useEffect(() => {
    if (selectedService && selectedSpecialist && selectedDate) {
      async function fetchSlots() {
        setLoadingSlots(true)
        try {
          const formattedDate = format(selectedDate!, "yyyy-MM-dd")
          const res = await fetch(`/api/availability?date=${formattedDate}&serviceId=${selectedService.id}&specialistId=${selectedSpecialist.id}`)
          if (!res.ok) throw new Error("Error")
          const data = await res.json()
          setAvailableSlots(data.availableSlots || [])
          setSelectedTime("") 
        } catch (err) {
          console.error("Error fetching slots", err)
        } finally {
          setLoadingSlots(false)
        }
      }
      fetchSlots()
    }
  }, [selectedService, selectedSpecialist, selectedDate])

  const handleNext = () => setStep(s => Math.min(s + 1, 5) as Step)
  const handlePrev = () => setStep(s => Math.max(s - 1, 1) as Step)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientData.name || !clientData.phone) {
      setError("Por favor completa los campos requeridos (*)")
      return
    }
    
    setError("")
    setIsSubmitting(true)
    
    try {
      const payload = {
        clientData,
        serviceId: selectedService.id,
        specialistId: selectedSpecialist.id,
        date: selectedDate,
        startTime: selectedTime
      }
      
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      
      if (!res.ok) throw new Error("Error al crear cita")
      setStep(5)
    } catch (err) {
      setError("Hubo un error al procesar tu cita. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return (
    <div className="w-full min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" />
    </div>
  )

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-brand-pink/20 border border-brand-pink/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
        
        {/* Left Sidebar: Progress & Selection Summary */}
        <div className="lg:col-span-4 bg-brand-pink/5 p-10 border-r border-brand-pink/10">
          <div className="mb-16">
            <h2 className="text-4xl font-bebas tracking-wider text-neutral-900 mb-2">TU <span className="text-brand-deep-pink">CITA</span></h2>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em]">Reserva tu momento</p>
          </div>

          <div className="space-y-10">
            {[
              { num: 1, label: "Servicio", active: step >= 1, done: step > 1, icon: Sparkles },
              { num: 2, label: "Especialista", active: step >= 2, done: step > 2, icon: User },
              { num: 3, label: "Horario", active: step >= 3, done: step > 3, icon: Clock },
              { num: 4, label: "Tus Datos", active: step >= 4, done: step > 4, icon: Heart },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-6 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  s.active 
                    ? "bg-brand-deep-pink text-white shadow-lg shadow-brand-deep-pink/30 scale-110" 
                    : "bg-white text-neutral-300 border border-brand-pink/20"
                }`}>
                  {s.done ? <CheckCircle size={18} /> : s.num}
                </div>
                <span className={`font-bebas text-xl tracking-widest uppercase transition-colors ${s.active ? "text-neutral-900" : "text-neutral-300"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Selection Summary at Bottom */}
          {(selectedService || selectedSpecialist || selectedDate) && step < 5 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 p-6 bg-white rounded-3xl border border-brand-pink/20 space-y-6 shadow-sm"
            >
              <h4 className="text-[10px] font-bold text-brand-deep-pink uppercase tracking-[0.3em] flex items-center gap-2">
                <Star size={10} className="fill-brand-deep-pink" /> Resumen actual
              </h4>
              <div className="space-y-4">
                {selectedService && (
                  <div>
                    <p className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Servicio</p>
                    <p className="text-sm font-semibold text-neutral-800">{selectedService.name}</p>
                  </div>
                )}
                {selectedSpecialist && (
                  <div>
                    <p className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Especialista</p>
                    <p className="text-sm font-semibold text-neutral-800">{selectedSpecialist.name}</p>
                  </div>
                )}
                {selectedDate && selectedTime && (
                  <div>
                    <p className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest mb-1">Día y Hora</p>
                    <p className="text-sm font-semibold text-neutral-800">{format(selectedDate, "dd 'de' MMMM", { locale: es })} • {selectedTime}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 p-10 md:p-16 relative bg-white">
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-5 bg-red-50 text-red-600 text-sm rounded-[20px] border border-red-100 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Servicios */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-5xl font-bebas tracking-tight text-neutral-900 mb-2">ELIGE TU <span className="text-brand-deep-pink">TRATAMIENTO</span></h3>
                  <p className="text-neutral-400 font-outfit">Selecciona el servicio que deseas realizarte hoy</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {services.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`group p-8 rounded-[30px] border-2 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                        selectedService?.id === service.id 
                          ? 'border-brand-deep-pink bg-brand-pink/5 shadow-xl shadow-brand-pink/10' 
                          : 'border-neutral-50 hover:border-brand-pink/30 bg-neutral-50/50 hover:bg-white'
                      }`}
                    >
                      {selectedService?.id === service.id && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-brand-deep-pink p-1 rounded-full">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <h4 className="font-bebas text-2xl mb-2 group-hover:text-brand-deep-pink transition-colors tracking-wide">{service.name}</h4>
                          <p className="text-xs text-neutral-400 font-outfit leading-relaxed line-clamp-2">{service.description || "Un tratamiento exclusivo para resaltar tu belleza natural."}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center">
                          <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{service.duration} MIN</span>
                          <span className="text-3xl font-bebas text-brand-deep-pink">RD${service.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-10">
                  <Button 
                    disabled={!selectedService}
                    onClick={handleNext}
                    className="rounded-full px-12 h-16 bg-neutral-900 hover:bg-neutral-800 text-white font-bebas tracking-[0.2em] text-xl group shadow-xl shadow-neutral-900/10"
                  >
                    SIGUIENTE PASO <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Especialistas */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-5xl font-bebas tracking-tight text-neutral-900 mb-2">TU <span className="text-brand-deep-pink">ESPECIALISTA</span></h3>
                  <p className="text-neutral-400 font-outfit">Confía en las mejores manos de Santo Domingo</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {specialists.map(person => (
                    <div 
                      key={person.id}
                      onClick={() => setSelectedSpecialist(person)}
                      className={`group p-6 rounded-[40px] border-2 transition-all duration-500 cursor-pointer text-center relative overflow-hidden ${
                        selectedSpecialist?.id === person.id 
                          ? 'border-brand-deep-pink bg-brand-pink/5 shadow-xl shadow-brand-pink/10' 
                          : 'border-neutral-50 hover:border-brand-pink/30 bg-neutral-50/50 hover:bg-white'
                      }`}
                    >
                      <div className="relative w-24 h-24 mx-auto mb-6 rounded-[30px] overflow-hidden border-4 border-white shadow-lg group-hover:rotate-3 transition-transform duration-500">
                        {person.photoUrl ? (
                          <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-brand-pink/20 flex items-center justify-center">
                            <User className="text-brand-deep-pink" size={32} />
                          </div>
                        )}
                      </div>
                      <h4 className="font-bebas text-2xl text-neutral-900 mb-1 tracking-wide">{person.name}</h4>
                      <p className="text-[10px] text-brand-deep-pink font-bold uppercase tracking-[0.2em]">{person.specialty}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-16">
                  <Button variant="ghost" onClick={handlePrev} className="rounded-full text-neutral-400 font-bebas tracking-widest text-lg px-8">
                    <ChevronLeft className="mr-2" /> VOLVER
                  </Button>
                  <Button 
                    disabled={!selectedSpecialist}
                    onClick={handleNext}
                    className="rounded-full px-12 h-16 bg-neutral-900 hover:bg-neutral-800 text-white font-bebas tracking-[0.2em] text-xl group shadow-xl shadow-neutral-900/10"
                  >
                    CONTINUAR <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Fecha y Hora */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-5xl font-bebas tracking-tight text-neutral-900 mb-2">FECHA Y <span className="text-brand-deep-pink">HORARIO</span></h3>
                  <p className="text-neutral-400 font-outfit">Selecciona el momento ideal para tu sesión</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="p-8 bg-neutral-50 rounded-[40px] border border-neutral-100">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      locale={es}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                      className="p-0"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-brand-deep-pink uppercase tracking-[0.3em] flex items-center gap-2">
                      <Clock size={14} /> Disponibilidad para hoy
                    </h4>
                    
                    {loadingSlots ? (
                      <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-brand-deep-pink animate-spin" /></div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-20 px-8 bg-brand-pink/5 rounded-[40px] border-2 border-dashed border-brand-pink/20">
                        <p className="text-sm text-neutral-400 font-outfit">Lo sentimos, no hay horarios disponibles para esta selección.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[350px] pr-3 custom-scrollbar">
                        {availableSlots.map(time => (
                          <button 
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-4 text-sm rounded-2xl transition-all duration-500 border-2 font-bebas tracking-widest ${
                              selectedTime === time 
                                ? 'bg-brand-deep-pink text-white border-brand-deep-pink shadow-xl shadow-brand-deep-pink/20' 
                                : 'bg-white border-neutral-50 text-neutral-600 hover:border-brand-pink/30 hover:text-brand-deep-pink'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-12">
                  <Button variant="ghost" onClick={handlePrev} className="rounded-full text-neutral-400 font-bebas tracking-widest text-lg px-8">
                    <ChevronLeft className="mr-2" /> VOLVER
                  </Button>
                  <Button 
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleNext}
                    className="rounded-full px-12 h-16 bg-neutral-900 hover:bg-neutral-800 text-white font-bebas tracking-[0.2em] text-xl group shadow-xl shadow-neutral-900/10"
                  >
                    CONTINUAR <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmación y Datos */}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="text-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg"
                  >
                    <Heart className="text-brand-deep-pink fill-brand-deep-pink" size={32} />
                  </motion.div>
                  <h3 className="text-5xl font-bebas tracking-tight text-neutral-900 mb-2">CASI <span className="text-brand-deep-pink">LISTO</span></h3>
                  <p className="text-neutral-400 font-outfit">Completa tus datos para finalizar la reserva</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase ml-4 tracking-[0.2em]">Nombre Completo *</label>
                      <Input 
                        value={clientData.name} 
                        onChange={e => setClientData({...clientData, name: e.target.value})}
                        placeholder="Ej. Isabella Rosado"
                        className="rounded-full h-16 px-8 border-neutral-100 bg-neutral-50 focus:bg-white focus:border-brand-deep-pink focus:ring-0 transition-all font-outfit"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase ml-4 tracking-[0.2em]">WhatsApp *</label>
                      <Input 
                        value={clientData.phone} 
                        onChange={e => setClientData({...clientData, phone: e.target.value})}
                        placeholder="809-XXX-XXXX"
                        className="rounded-full h-16 px-8 border-neutral-100 bg-neutral-50 focus:bg-white focus:border-brand-deep-pink focus:ring-0 transition-all font-outfit"
                      />
                    </div>
                  </div>

                  <div className="p-8 bg-brand-pink/5 rounded-[40px] border-2 border-brand-pink/10 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <h4 className="font-bebas text-3xl text-neutral-900 tracking-wide border-b border-brand-pink/20 pb-4">TU SESIÓN</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400 font-outfit uppercase tracking-widest text-[9px] font-bold">Servicio</span>
                        <span className="font-semibold text-neutral-800">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400 font-outfit uppercase tracking-widest text-[9px] font-bold">Experta</span>
                        <span className="font-semibold text-neutral-800">{selectedSpecialist?.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-400 font-outfit uppercase tracking-widest text-[9px] font-bold">Horario</span>
                        <span className="font-semibold text-neutral-800">{selectedTime} • {selectedDate && format(selectedDate, "dd MMM")}</span>
                      </div>
                      <div className="pt-6 border-t border-brand-pink/20 flex justify-between items-center">
                        <span className="text-neutral-900 font-bebas text-xl">TOTAL</span>
                        <span className="text-4xl font-bebas text-brand-deep-pink">RD${selectedService?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8">
                  <Button variant="ghost" onClick={handlePrev} className="rounded-full text-neutral-400 font-bebas tracking-widest text-lg px-8">
                    <ChevronLeft className="mr-2" /> VOLVER
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !clientData.name || !clientData.phone}
                    className="rounded-full px-16 h-20 bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-bebas tracking-[0.3em] text-2xl shadow-2xl shadow-brand-deep-pink/20 transition-all hover:scale-105"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "CONFIRMAR CITA"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Success State */}
            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-8 py-20"
              >
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center border-[8px] border-green-100 shadow-2xl shadow-green-200"
                  >
                    <CheckCircle className="text-white" size={60} />
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-brand-pink rounded-2xl flex items-center justify-center shadow-lg rotate-12"
                  >
                    <Star className="text-white fill-white" size={24} />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-6xl font-bebas tracking-tight text-neutral-900">¡CITA <span className="text-green-500">CONFIRMADA!</span></h3>
                  <p className="text-xl text-neutral-500 font-outfit max-w-md mx-auto">
                    Tu reserva ha sido procesada con éxito. Te hemos enviado un mensaje de confirmación a tu WhatsApp.
                  </p>
                </div>

                <div className="bg-neutral-50 p-8 rounded-[40px] border border-neutral-100 w-full max-w-sm">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-4 text-center">Ticket de Reserva</p>
                  <div className="flex justify-between items-center text-xl font-bebas text-neutral-900">
                    <span>{selectedTime}</span>
                    <span className="text-brand-deep-pink">•</span>
                    <span>{selectedDate && format(selectedDate, "dd 'de' MMMM", { locale: es })}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => window.location.reload()}
                  className="rounded-full px-12 h-16 bg-neutral-900 hover:bg-neutral-800 text-white font-bebas tracking-[0.2em] text-xl"
                >
                  VOLVER AL INICIO
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
