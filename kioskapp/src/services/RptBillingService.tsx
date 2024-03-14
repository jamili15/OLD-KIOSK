import Service from "@/libs/remote-service";

export const getBilling = async ({
  refno,
  billtoqtr = 4,
  billtoyear = 2024,
  showdetails = true,
}: {
  refno: string;
  billtoqtr?: number;
  billtoyear?: number;
  showdetails?: boolean;
}) => {
  const svc = Service.lookup("gdx/OnlineLandTaxBillingService", "etracs");
  const taxBill = await svc.invoke("getBilling", {
    refno,
    billtoqtr,
    billtoyear,
    showdetails,
  });
  if (taxBill.status === "ERROR") {
    return { code: "01", error: taxBill.msg };
  }
  return taxBill;
};

export const generateCode = async ({
  refno,
  txntype,
  billtoqtr,
  billtoyear,
}: {
  refno: string;
  txntype: string;
  billtoqtr: number;
  billtoyear: number;
}) => {
  const svc = Service.lookup("CashReceiptBarcodeService", "etracs");
  const code = await svc.invoke("generateCode", {
    refno,
    txntype,
    billtoqtr,
    billtoyear,
  });
  console.log(code);
  return code;
};

export const fetchNextSeries = async ({ sectionid }: { sectionid: string }) => {
  const svc = Service.lookup("api/QueueService", "etracs");
  const ticket = await svc.invoke("fetchNextTicket", { sectionid });
  return ticket;
};
