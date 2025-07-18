-- Recriar RLS com políticas mais específicas
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Política para INSERT - qualquer um pode criar agendamentos (público/kiosk)
CREATE POLICY "Allow public bookings"
ON public.bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Política para SELECT - apenas usuários autenticados podem visualizar
CREATE POLICY "Authenticated users can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);

-- Política adicional para anon users não poderem fazer SELECT
CREATE POLICY "Block anonymous select"
ON public.bookings
FOR SELECT
TO anon
USING (false);