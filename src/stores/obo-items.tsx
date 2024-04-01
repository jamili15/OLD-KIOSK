export type Obo = { id: string; title: string; disabled: boolean };

export const oboitem: Obo[] = [
  { id: "billing", title: "OSCP Online Billing and Payment", disabled: false },
  { id: "", title: "", disabled: true },
  { id: "", title: "", disabled: true },
];

export function getObo() {
  return oboitem;
}

export function getOboId(id: string | undefined) {
  return oboitem.find((oboitem) => oboitem.id === id);
}
