-- Temporariamente desabilitar RLS para permitir agendamentos públicos
-- Esta é a solução mais simples para um kiosk público

ALTER TABLE public.bookings DISABLE ROW LEVEL SECURITY;

-- Vamos recriar as políticas de forma mais específica depois
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Only authenticated users can view bookings" ON public.bookings;