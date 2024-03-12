import Title from "@/components/ui/Title";
import { ticketInfo } from "@/stores/lgu-info";
import Image from "next/image";
import React, { forwardRef, ForwardRefRenderFunction, Ref } from "react";

interface PaymentPrintTicketProps {
  QRCode?: React.ReactNode;
  appDate?: string | undefined;
  addr?: string | undefined;
  total?: number | React.ReactNode;
  QRData?: string | undefined;
  payerName: string | undefined;
  seriesno?: string;
}
const headers = [
  "trxn date",
  "payer",
  "address",
  "particulars",
  "total",
  "control no",
];

const PaymentPrintTicket: ForwardRefRenderFunction<
  HTMLDivElement,
  PaymentPrintTicketProps
> = (
  { QRCode, appDate, addr, total, QRData, payerName, seriesno },
  ref: Ref<HTMLDivElement>
) => (
  <div ref={ref}>
    <div className="w-full flex flex-col gap-y-3 font-['Noto Sans']">
      <div className="w-full flex justify-center items-center gap-3 pb-8">
        {ticketInfo.map((item, index) => (
          <React.Fragment key={index}>
            <div className="fixed top-2 left-2">
              <Image
                src={item.logo.src}
                alt={""}
                width={item.logo.width}
                height={0}
                loading="eager"
              />
            </div>
            <div className="flex flex-col items-center ml-10 pt-4">
              <Title
                text={item.header.title}
                classname="uppercase text-[17px]"
              />
              <Title
                text={item.subheader.title}
                classname="uppercase text-[17px] leading-4"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-x-12 justify-center">
        <div className="">{QRCode}</div>
        <div className="w-[2px] bg-black"></div>
        <div className="flex flex-col justify-center items-center uppercase">
          <Title text={"Queue No"} textSize="text-[30px]" />
          <Title text={seriesno} textSize="text-[40px]" />
        </div>
      </div>
      <div className="flex justify-center items-center mb-[-10px]">
        <Title
          text="present this receipt to the collector"
          classname="uppercase"
          textSize="text-[18px]"
        />
      </div>
      <table>
        <tbody>
          {headers.map((label, index) => (
            <tr key={index}>
              <td
                className="capitalize"
                style={{ width: "150px", height: "20px", fontSize: "20px" }}
              >
                {label}
              </td>
              <td style={{ width: "", height: "20px", fontSize: "20px" }}>
                {label === "trxn date" && appDate}
                {label === "payer" && payerName}
                {label === "address" && addr}
                {label === "particulars" && "Real Tax Billing And Payment"}
                {label === "total" && total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-[400px]">{QRData}</div>
    </div>
  </div>
);

export default forwardRef(PaymentPrintTicket);
