-- Corrigir política RLS para permitir agendamentos públicos (kiosk mode)
-- O sistema deve funcionar sem autenticação para visitantes

-- Remover a política restritiva atual
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

-- Criar nova política que realmente permite inserções públicas
CREATE POLICY "Public can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Verificar se a política de visualização está correta (só admin pode ver)
-- Esta já está configurada corretamente