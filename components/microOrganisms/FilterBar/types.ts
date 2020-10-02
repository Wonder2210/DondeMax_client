import { FormEvent } from "react";

type PropType = {
  show: boolean;
  value: string;
  onChange: ((event: FormEvent<any>) => void) & ((value: string | number) => void);
  toggle: () => void;
  list: Array<{ id: number; type: string }>;
};
export type props = {
  preservations: PropType;
  types: PropType;
};
