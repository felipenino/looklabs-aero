-- ============================================
-- LookLab — Seed inicial do banco de dados
-- Personas, Categorias e Tags (dados estáticos)
-- ============================================

-- Personas (6 registros)
INSERT INTO personas (id, name, gender, display_order, is_active) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Core',     'masculino', 1, true),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Plus',     'masculino', 2, true),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Platinum', 'masculino', 3, true),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'Core',     'feminino',  4, true),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'Plus',     'feminino',  5, true),
  ('a1b2c3d4-0001-4000-8000-000000000006', 'Platinum', 'feminino',  6, true)
ON CONFLICT (id) DO NOTHING;

-- Categorias (10 registros)
INSERT INTO categories (id, name, display_order, is_active) VALUES
  ('b2c3d4e5-0001-4000-8000-000000000001', 'Camiseta',         1, true),
  ('b2c3d4e5-0001-4000-8000-000000000002', 'Top / Blusa',      2, true),
  ('b2c3d4e5-0001-4000-8000-000000000003', 'Calça / Jeans',    3, true),
  ('b2c3d4e5-0001-4000-8000-000000000004', 'Bermuda',          4, true),
  ('b2c3d4e5-0001-4000-8000-000000000005', 'Saia',             5, true),
  ('b2c3d4e5-0001-4000-8000-000000000006', 'Vestido',          6, true),
  ('b2c3d4e5-0001-4000-8000-000000000007', 'Macacão',          7, true),
  ('b2c3d4e5-0001-4000-8000-000000000008', 'Jaqueta / Blazer', 8, true),
  ('b2c3d4e5-0001-4000-8000-000000000009', 'Moletom',          9, true),
  ('b2c3d4e5-0001-4000-8000-000000000010', 'Acessório',       10, true)
ON CONFLICT (id) DO NOTHING;

-- Tags (3 registros iniciais)
INSERT INTO tags (id, name, is_active) VALUES
  ('c3d4e5f6-0001-4000-8000-000000000001', 'Casual',   true),
  ('c3d4e5f6-0001-4000-8000-000000000002', 'Noite',    true),
  ('c3d4e5f6-0001-4000-8000-000000000003', 'Trabalho', true)
ON CONFLICT (id) DO NOTHING;
