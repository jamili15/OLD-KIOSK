import Service from "@/libs/remote-service";

export const getBilling = async ({ refno }: { refno: string }) => {
  const svc = Service.lookup("gdx/OboOnlineBillingService", "obo");
  const oboBill = await svc.invoke("getBilling", {
    refno,
  });
  if (oboBill.status === "ERROR") {
    return { code: "01", error: oboBill.msg };
  }
  return oboBill;
};

export const generateCode = async ({
  refno,
  txntype,
}: {
  refno: string;
  txntype: string;
}) => {
  const svc = Service.lookup("CashReceiptBarcodeService", "etracs");
  const code = await svc.invoke("generateCode", {
    refno,
    txntype,
  });
  console.log(code);
  return code;
};

export const fetchNextSeries = async ({ sectionid }: { sectionid: string }) => {
  const svc = Service.lookup("api/QueueService", "etracs");
  const ticket = await svc.invoke("fetchNextTicket", { sectionid });
  return ticket;
};
