-- ============================================
-- LookLab — Schema do banco de dados
-- ============================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELAS DE CATÁLOGO
-- ============================================

CREATE TABLE IF NOT EXISTS personas (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  gender      TEXT NOT NULL CHECK (gender IN ('masculino', 'feminino')),
  display_order INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS pieces (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  persona_id  UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  sku         TEXT,
  name        TEXT,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS looks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT,
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS look_pieces (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  look_id   UUID NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  piece_id  UUID NOT NULL REFERENCES pieces(id) ON DELETE CASCADE,
  slot      INT NOT NULL CHECK (slot BETWEEN 1 AND 5),
  UNIQUE(look_id, slot)
);

-- ============================================
-- TABELAS DE TAGS
-- ============================================

CREATE TABLE IF NOT EXISTS tags (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name      TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS look_tags (
  look_id UUID NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (look_id, tag_id)
);

-- ============================================
-- TABELAS DE ANALYTICS
-- ============================================

CREATE TABLE IF NOT EXISTS sessions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  started_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at    TIMESTAMPTZ,
  persona_id  UUID REFERENCES personas(id)
);

CREATE TABLE IF NOT EXISTS events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL CHECK (event_type IN (
    'select_persona', 'select_category', 'view_piece', 'view_look', 'give_feedback'
  )),
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedback (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  look_id     UUID NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  liked       BOOLEAN NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_pieces_persona ON pieces(persona_id);
CREATE INDEX IF NOT EXISTS idx_pieces_category ON pieces(category_id);
CREATE INDEX IF NOT EXISTS idx_pieces_active ON pieces(is_active);
CREATE INDEX IF NOT EXISTS idx_look_pieces_look ON look_pieces(look_id);
CREATE INDEX IF NOT EXISTS idx_look_pieces_piece ON look_pieces(piece_id);
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_feedback_session ON feedback(session_id);
CREATE INDEX IF NOT EXISTS idx_feedback_look ON feedback(look_id);
