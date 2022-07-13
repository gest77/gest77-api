export const CreneauNames = ["Famille", "Ecole", "Adultes"] as const;
export type Creneau = typeof CreneauNames[number];

export type Member = {
    id: string;
};
export type MemberSummary = { firstname: string; lastname: string; birth: string; creneau: Creneau };
