import {SelectOption} from "@/commons/componentes/FormFieldSelect/FormFieldSelect"

export enum Cargo {
  ESTUDANTE = 'estudante',
  ADMINISTRADOR = 'administrador'
}


export const CargoConfig: Record<Cargo, { label: string; variant: any }> = {
  [Cargo.ADMINISTRADOR]: { label: "Admin", variant: "default" },
  [Cargo.ESTUDANTE]: { label: "Estudante", variant: "secondary" },
};

export const getOpcoesCargo = (): SelectOption[] => {
  return (Object.keys(CargoConfig) as Cargo[]).map((key) => ({
    label: CargoConfig[key].label,
    value: key,
  }));
};