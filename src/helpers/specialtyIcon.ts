import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  Hand,
  Heart,
  Stethoscope,
} from "lucide-react";

// código para gerar ícones baseados no tipo de especialidade. O ideal seria cadastrar esses ícones no banco ou criar um ENUM
export const getSpecialtyIcon = (specialty: string) => {
  const specialtyLower = specialty.toLowerCase();

  if (specialtyLower.includes("cardiolog")) return Heart;
  if (
    specialtyLower.includes("ginecolog") ||
    specialtyLower.includes("obstetri")
  )
    return Baby;
  if (specialtyLower.includes("pediatr")) return Activity;
  if (specialtyLower.includes("dermatolog")) return Hand;
  if (
    specialtyLower.includes("ortoped") ||
    specialtyLower.includes("traumatolog")
  )
    return Bone;
  if (specialtyLower.includes("oftalmolog")) return Eye;
  if (specialtyLower.includes("neurolog")) return Brain;

  return Stethoscope; // ícone padrão
};
