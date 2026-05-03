import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    // Fetch stats in parallel
    const [
      { count: appointmentsToday },
      { data: revenueTodayData },
      { count: newClients },
      { data: servicesDataRaw },
      { data: appointmentsTodayData }
    ] = await Promise.all([
      supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('appointment_date', today),
      supabase.from('appointments').select('total_price').eq('appointment_date', today).eq('status', 'COMPLETED'),
      supabase.from('clients').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase.from('appointments').select('service:services(name)').limit(100),
      supabase.from('appointments')
        .select(`
          id,
          start_time,
          status,
          total_price,
          client:clients(name, phone),
          service:services(name),
          specialist:specialists(name)
        `)
        .eq('appointment_date', today)
        .order('start_time', { ascending: true })
    ])

    const totalRevenueToday = revenueTodayData?.reduce((acc, curr) => acc + Number(curr.total_price), 0) || 0

    // Process service data for pie chart
    const serviceCounts: Record<string, number> = {}
    servicesDataRaw?.forEach((apt: any) => {
      const name = apt.service?.name || 'Otro'
      serviceCounts[name] = (serviceCounts[name] || 0) + 1
    })
    const serviceData = Object.entries(serviceCounts).map(([name, value]) => ({ name, value }))

    // Mock weekly revenue if DB is empty
    const weeklyRevenue = [
      { name: "Lun", ingresos: 4000 },
      { name: "Mar", ingresos: 3000 },
      { name: "Mie", ingresos: 2000 },
      { name: "Jue", ingresos: 2780 },
      { name: "Vie", ingresos: 1890 },
      { name: "Sab", ingresos: 2390 },
      { name: "Dom", ingresos: 3490 },
    ]

    return NextResponse.json({
      summary: {
        citasHoy: appointmentsToday || 0,
        ingresosHoy: totalRevenueToday,
        nuevosClientes: newClients || 0,
        rating: 4.9
      },
      weeklyRevenue,
      serviceData: serviceData.length > 0 ? serviceData : [
        { name: 'Pestañas', value: 400 },
        { name: 'Cejas', value: 300 },
        { name: 'Uñas', value: 300 },
        { name: 'Facial', value: 200 },
      ],
      todayAppointments: appointmentsTodayData?.map((apt: any) => ({
        id: apt.id,
        startTime: apt.start_time,
        status: apt.status,
        price: apt.total_price,
        client: {
          name: apt.client?.name || 'Cliente',
          phone: apt.client?.phone || ''
        },
        service: {
          name: apt.service?.name || 'Servicio'
        },
        specialist: {
          name: apt.specialist?.name || 'Especialista'
        }
      })) || []
    })
  } catch (error) {
    console.error("Stats API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
