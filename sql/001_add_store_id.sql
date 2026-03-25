-- Step 2: Adicionar store_id nas tabelas existentes do Zandu
-- Risco: Baixo — ADD COLUMN com DEFAULT nao quebra queries existentes
-- Default 'brisa-matriz' para a loja atual; segunda loja usara outro valor

ALTER TABLE zandu_persons
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';

ALTER TABLE zandu_invoices
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';

ALTER TABLE zandu_appointments
  ADD COLUMN IF NOT EXISTS store_id TEXT DEFAULT 'brisa-matriz';
