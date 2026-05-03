export interface Service {
  id: string
  name: string
  description?: string
  price: number
  duration: number
  category?: string
  image_url?: string
  is_active: boolean
  created_at: string
}

export interface Specialist {
  id: string
  name: string
  specialty?: string
  bio?: string
  photo_url?: string
  is_active: boolean
  created_at: string
}

export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  created_at: string
}

export interface Appointment {
  id: string
  client_id: string
  service_id: string
  specialist_id: string
  appointment_date: string
  start_time: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  total_price: number
  created_at: string
  
  // Joins
  client?: Client
  service?: Service
  specialist?: Specialist
}

export interface BlockedSlot {
  id: string
  specialist_id: string
  block_date: string
  start_time: string
  end_time: string
  reason?: string
}
