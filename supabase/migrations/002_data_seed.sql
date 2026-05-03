-- Seed Data for GIGI STYLE
-- This migration populates the database with the services and the single specialist.

-- 1. Insert Specialist (Giselle / Gigi)
INSERT INTO public.specialists (name, specialty, bio, photo_url, is_active)
VALUES (
    'Giselle "Gigi" Rosado', 
    'Lashista y Cosmetóloga', 
    'Experta en realce de mirada y cuidado de la piel con más de 5 años de experiencia.',
    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=200&h=200&auto=format&fit=crop',
    true
) ON CONFLICT DO NOTHING;

-- 2. Insert Services
-- Pestañas
INSERT INTO public.services (name, description, price, duration, category, is_active) VALUES
('Pelo a pelo clásica', 'Extensiones individuales para un look natural.', 1200, 90, 'Pestañas', true),
('Efecto Rímel', 'Mayor densidad y oscuridad similar al rímel.', 1500, 105, 'Pestañas', true),
('Volumen Ruso', 'Look dramático y tupido con múltiples fibras por pestaña.', 2200, 150, 'Pestañas', true),
('Lifting de pestañas', 'Elevación natural de tus propias pestañas.', 1000, 60, 'Pestañas', true);

-- Cejas
INSERT INTO public.services (name, description, price, duration, category, is_active) VALUES
('Diseño y perfilado', 'Forma perfecta según tu visagismo facial.', 500, 30, 'Cejas', true),
('Laminado de cejas', 'Control y peinado semipermanente para cejas rebeldes.', 1200, 45, 'Cejas', true),
('Tintado con Henna', 'Sombreado natural que rellena espacios vacíos.', 800, 40, 'Cejas', true);

-- Depilación con Cera
INSERT INTO public.services (name, description, price, duration, category, is_active) VALUES
('Depilación de Bozzo', 'Eliminación suave de vello facial.', 300, 15, 'Depilación con Cera', true),
('Depilación de Axilas', 'Piel suave y libre de vello por semanas.', 500, 20, 'Depilación con Cera', true),
('Piernas Completas', 'Depilación profesional para piernas suaves.', 1200, 60, 'Depilación con Cera', true);
