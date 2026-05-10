import { Motorista } from "./types";

export const motoristas: Motorista[] = [
  {
    id: "mot_001",
    nome: "José Aparecido da Silva",
    cnh: "12345678901",
    telefone: "(11) 98765-4321",
    status: "ativo",
  },
  {
    id: "mot_002",
    nome: "Carlos Roberto Santos",
    cnh: "12345678902",
    telefone: "(11) 98765-4322",
    status: "ativo",
  },
  {
    id: "mot_003",
    nome: "João Batista Oliveira",
    cnh: "12345678903",
    telefone: "(11) 98765-4323",
    status: "ativo",
  },
  {
    id: "mot_004",
    nome: "Antônio Marcos Pereira",
    cnh: "12345678904",
    telefone: "(11) 98765-4324",
    status: "ativo",
  },
  {
    id: "mot_005",
    nome: "Sebastião Lima",
    cnh: "12345678905",
    telefone: "(11) 98765-4325",
    status: "ativo",
  },
  {
    id: "mot_006",
    nome: "Francisco das Chagas",
    cnh: "12345678906",
    telefone: "(11) 98765-4326",
    status: "ativo",
  },
  {
    id: "mot_007",
    nome: "Adilson Ferreira",
    cnh: "12345678907",
    telefone: "(11) 98765-4327",
    status: "ativo",
  },
  {
    id: "mot_008",
    nome: "Reginaldo Souza",
    cnh: "12345678908",
    telefone: "(11) 98765-4328",
    status: "ativo",
  },
  {
    id: "mot_009",
    nome: "Marcos Antonio Silva",
    cnh: "12345678909",
    telefone: "(11) 98765-4329",
    status: "ativo",
  },
  {
    id: "mot_010",
    nome: "Paulo Henrique Gomes",
    cnh: "12345678910",
    telefone: "(11) 98765-4330",
    status: "ativo",
  },
  {
    id: "mot_011",
    nome: "Luiz Fernando Costa",
    cnh: "12345678911",
    telefone: "(11) 98765-4331",
    status: "ativo",
  },
  {
    id: "mot_012",
    nome: "Ricardo Almeida",
    cnh: "12345678912",
    telefone: "(11) 98765-4332",
    status: "ativo",
  },
  {
    id: "mot_013",
    nome: "Wagner Nunes",
    cnh: "12345678913",
    telefone: "(11) 98765-4333",
    status: "ativo",
  },
  {
    id: "mot_014",
    nome: "Gilson Barbosa",
    cnh: "12345678914",
    telefone: "(11) 98765-4334",
    status: "ativo",
  },
  {
    id: "mot_015",
    nome: "Anderson Silva",
    cnh: "12345678915",
    telefone: "(11) 98765-4335",
    status: "ativo",
  },
  {
    id: "mot_016",
    nome: "Clemente Rodrigues",
    cnh: "12345678916",
    telefone: "(11) 98765-4336",
    status: "ativo",
  },
  {
    id: "mot_017",
    nome: "Evaldo Mendes",
    cnh: "12345678917",
    telefone: "(11) 98765-4337",
    status: "ativo",
  },
  {
    id: "mot_018",
    nome: "Fábio Oliveira",
    cnh: "12345678918",
    telefone: "(11) 98765-4338",
    status: "ativo",
  },
  {
    id: "mot_019",
    nome: "Gustavo Martins",
    cnh: "12345678919",
    telefone: "(11) 98765-4339",
    status: "ativo",
  },
  {
    id: "mot_020",
    nome: "Humberto Diniz",
    cnh: "12345678920",
    telefone: "(11) 98765-4340",
    status: "ativo",
  },
];

export const getMotoristaById = (id: string): Motorista | undefined => {
  return motoristas.find((m) => m.id === id);
};

export const getRandomMotorista = (): Motorista => {
  return motoristas[Math.floor(Math.random() * motoristas.length)];
};
