export const loadBill = async (
  svc: any,
  params: {
    refno: string | undefined;
  }
) => {
  return await svc.invoke("getBilling", params);
};
