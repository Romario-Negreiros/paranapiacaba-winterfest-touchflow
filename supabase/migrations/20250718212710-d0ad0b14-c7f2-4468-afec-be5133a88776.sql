-- Correção definitiva: Desabilitar RLS completamente para kiosk público
-- Remove todas as políticas e desabilita RLS

DROP POLICY IF EXISTS "Allow public bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Block anonymous select" ON public.bookings;

-- Desabilitar RLS completamente para permitir operações públicas
ALTER TABLE public.bookings DISABLE ROW LEVEL SECURITY;

-- Verificar se não há outras políticas interferindo
SELECT * FROM pg_policies WHERE tablename = 'bookings';