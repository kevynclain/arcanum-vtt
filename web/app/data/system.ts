import { statusClasses } from "./status";

type Atributos = {
  FOR: number;
  AGI: number;
  INT: number;
  PRE: number;
  VIG: number;
};

export function calcularStatus(
  classe: string,
  atributos: Atributos,
  nex: string
) {
  const base =
    statusClasses[
      classe as keyof typeof statusClasses
    ];

  if (!base) {
    return {
      pv: 0,
      pe: 0,
      san: 0,
    };
  }

  const valorNex = Number(
    nex.replace("%", "")
  );

  const nivel = Math.max(
    1,
    Math.floor(valorNex / 5)
  );

  const pv =
    base.pvBase +
    atributos.VIG * base.pvPorVigor +
    (nivel - 1) * base.pvNivel;

  const pe =
    base.peBase +
    atributos.PRE * base.pePorPresenca +
    (nivel - 1) * base.peNivel;

  const san =
    base.sanBase +
    atributos.PRE * base.sanPorPresenca +
    (nivel - 1) * base.sanNivel;

  return {
    pv,
    pe,
    san,
  };
}