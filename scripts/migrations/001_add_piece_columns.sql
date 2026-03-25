-- Migration: Add extended columns to pieces table
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS cor TEXT;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS preco_pdv NUMERIC(10,2);
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS tamanho TEXT;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS grade TEXT;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS subcategoria TEXT;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS codigo_aero TEXT;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS quantidade INTEGER DEFAULT 0;
ALTER TABLE pieces ADD COLUMN IF NOT EXISTS status_looklab TEXT DEFAULT 'Ativo'
  CHECK (status_looklab IN ('Ativo', 'Inativo'));

-- Indexes for filter performance
CREATE INDEX IF NOT EXISTS idx_pieces_cor ON pieces(cor);
CREATE INDEX IF NOT EXISTS idx_pieces_preco ON pieces(preco_pdv);
CREATE INDEX IF NOT EXISTS idx_pieces_tamanho ON pieces(tamanho);
CREATE INDEX IF NOT EXISTS idx_pieces_subcategoria ON pieces(subcategoria);
CREATE INDEX IF NOT EXISTS idx_pieces_status ON pieces(status_looklab);
