export type Gender = "feminino" | "masculino";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: Partial<Record<Gender, string>>;
  genders: Gender[];
  order: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "b2c3d4e5-0001-4000-8000-000000000001",
    name: "Camiseta",
    slug: "camiseta",
    image: {
      feminino: "/images/categorias/fem/camiseta.png",
      masculino: "/images/categorias/masc/camiseta.png",
    },
    genders: ["feminino", "masculino"],
    order: 1,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000002",
    name: "Top / Blusa",
    slug: "top-blusa",
    image: {
      feminino: "/images/categorias/fem/top-blusa.png",
      masculino: "/images/categorias/masc/top-blusa.png",
    },
    genders: ["feminino", "masculino"],
    order: 2,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000003",
    name: "Calça / Jeans",
    slug: "calca-jeans",
    image: {
      feminino: "/images/categorias/fem/calca-jeans.png",
      masculino: "/images/categorias/masc/calca-jeans.png",
    },
    genders: ["feminino", "masculino"],
    order: 3,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000004",
    name: "Bermuda",
    slug: "bermuda",
    image: {
      feminino: "/images/categorias/fem/bermuda.png",
      masculino: "/images/categorias/masc/bermuda.png",
    },
    genders: ["feminino", "masculino"],
    order: 4,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000005",
    name: "Saia",
    slug: "saia",
    image: {
      feminino: "/images/categorias/fem/saia.png",
    },
    genders: ["feminino"],
    order: 5,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000006",
    name: "Vestido",
    slug: "vestido",
    image: {
      feminino: "/images/categorias/fem/vestido.png",
    },
    genders: ["feminino"],
    order: 6,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000007",
    name: "Macacão",
    slug: "macacao",
    image: {
      feminino: "/images/categorias/fem/macacao.png",
    },
    genders: ["feminino"],
    order: 7,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000008",
    name: "Jaqueta / Blazer",
    slug: "jaqueta-blazer",
    image: {
      feminino: "/images/categorias/fem/jaqueta-blazer.png",
      masculino: "/images/categorias/masc/jaqueta-blazer.png",
    },
    genders: ["feminino", "masculino"],
    order: 8,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000009",
    name: "Moletom",
    slug: "moletom",
    image: {
      feminino: "/images/categorias/fem/moletom.png",
      masculino: "/images/categorias/masc/moletom.png",
    },
    genders: ["feminino", "masculino"],
    order: 9,
  },
  {
    id: "b2c3d4e5-0001-4000-8000-000000000010",
    name: "Acessório",
    slug: "acessorio",
    image: {
      feminino: "/images/categorias/fem/acessorio.png",
      masculino: "/images/categorias/masc/acessorio.png",
    },
    genders: ["feminino", "masculino"],
    order: 10,
  },
];
