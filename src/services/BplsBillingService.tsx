import Service from "@/libs/remote-service";

export const getBilling = async ({
  refno,
  qtr = 4,
  showdetails = true,
}: {
  refno: string;
  qtr?: number;
  showdetails?: boolean;
}) => {
  const svc = Service.lookup("gdx/OnlineBusinessBillingService", "etracs");
  const bill = await svc.invoke("getBilling", { refno, qtr, showdetails });
  if (bill.status === "ERROR") {
    return { code: "01", error: bill.msg };
  }
  return bill;
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
  return code;
};

export const fetchNextSeries = async ({ sectionid }: { sectionid: string }) => {
  const svc = Service.lookup("api/QueueService", "etracs");
  const ticket = await svc.invoke("fetchNextTicket", { sectionid });
  return ticket;
};
