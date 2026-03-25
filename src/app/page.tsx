import { redirect } from "next/navigation";
import { PERSONAS } from "@/lib/constants/personas";
import { CATEGORIES } from "@/lib/constants/categories";

export default function Home() {
  const defaultPersona = PERSONAS.find((p) => p.gender === "feminino") ?? PERSONAS[0];
  const firstCategory = CATEGORIES[0];
  redirect(`/pecas?persona=${defaultPersona.id}&categoria=${firstCategory.id}`);
}
