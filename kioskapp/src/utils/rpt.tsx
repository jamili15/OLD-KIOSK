export const loadBill = async (
  svc: any,
  params: {
    refno: string | undefined;
    billtoqtr: number | string | void;
    billtoyear: number | string | void;
  }
) => {
  return await svc.invoke("getBilling", params);
};
