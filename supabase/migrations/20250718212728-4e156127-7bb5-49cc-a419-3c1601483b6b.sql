-- Verificar tabela e permissões
\d public.bookings;

-- Verificar se RLS está realmente desabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'bookings';