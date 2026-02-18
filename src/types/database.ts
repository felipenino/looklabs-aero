export interface Persona {
  id: string;
  name: string;
  gender: "masculino" | "feminino";
  display_order: number;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  display_order: number;
  is_active: boolean;
}

export interface Piece {
  id: string;
  persona_id: string;
  category_id: string;
  image_url: string;
  sku: string | null;
  name: string | null;
  is_active: boolean;
}

export interface Look {
  id: string;
  name: string | null;
  image_url: string | null;
  is_active: boolean;
}

export interface LookPiece {
  id: string;
  look_id: string;
  piece_id: string;
  slot: number;
}

export interface Tag {
  id: string;
  name: string;
  is_active: boolean;
}

export interface LookTag {
  look_id: string;
  tag_id: string;
}

export interface Session {
  id: string;
  started_at: string;
  ended_at: string | null;
  persona_id: string | null;
}

export interface Event {
  id: string;
  session_id: string;
  event_type:
    | "select_persona"
    | "select_category"
    | "view_piece"
    | "view_look"
    | "give_feedback";
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Feedback {
  id: string;
  session_id: string;
  look_id: string;
  liked: boolean;
  created_at: string;
}

// Extended types for queries with joins
export interface LookWithPieces extends Look {
  look_pieces: (LookPiece & { piece: Piece })[];
}

export interface PieceWithRelations extends Piece {
  persona: Persona;
  category: Category;
}
