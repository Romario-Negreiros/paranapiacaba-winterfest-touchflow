-- Integrar sistema de agendamento com Supabase
-- Atualizar a função handleSubmit para salvar no banco

-- Adicionar missing phone ao bookings
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS phone text;

-- Criar trigger para gerar protocol_number automaticamente se não fornecido
CREATE OR REPLACE FUNCTION public.set_protocol_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.protocol_number IS NULL OR NEW.protocol_number = '' THEN
    NEW.protocol_number := public.generate_protocol_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger na tabela bookings
DROP TRIGGER IF EXISTS set_protocol_number_trigger ON public.bookings;
CREATE TRIGGER set_protocol_number_trigger
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_protocol_number();