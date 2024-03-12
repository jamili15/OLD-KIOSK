export type Rpt = { id: string; title: string; disabled: boolean };

export const rptitem: Rpt[] = [
  { id: "billing", title: "Realty Tax Online Billing", disabled: false },
  { id: "", title: "", disabled: true },
  { id: "r", title: "", disabled: true },
];

export function getRpt() {
  return rptitem;
}

export function getRptId(id: string | undefined) {
  return rptitem.find((rptitem) => rptitem.id === id);
}
