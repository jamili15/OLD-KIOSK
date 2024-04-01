import Title from "@/components/ui/Title";
import { ticketInfo } from "@/stores/lgu-info";
import Image from "next/image";
import React, { forwardRef, ForwardRefRenderFunction, Ref } from "react";

interface PaymentPrintTicketProps {
  QRCode?: React.ReactNode;
  appDate?: string | undefined;
  addr?: string | undefined;
  total?: number | React.ReactNode;
  tdNo?: string | undefined;
  payerName: string | undefined;
  seriesno?: string;
}
const headers = [
  "trxn date",
  "payer",
  "address",
  "particulars",
  "total",
  "tax no",
];

const PaymentPrintTicket: ForwardRefRenderFunction<
  HTMLDivElement,
  PaymentPrintTicketProps
> = (
  { QRCode, appDate, addr, total, tdNo, payerName, seriesno },
  ref: Ref<HTMLDivElement>
) => (
  <div ref={ref}>
    <div className="flex flex-col gap-y-4">
      {ticketInfo.map((item, index) => (
        <div key={index} className="flex gap-x-4 pl-3">
          <Image
            src={item.logo.src}
            alt={""}
            width={60}
            height={60}
            loading="eager"
            style={{ width: 60, height: 60 }}
            priority
            unoptimized
          />
          <div className="flex flex-col justify-center items-center">
            <Title
              text={item.header.title}
              classname="uppercase text-[12px] leading-4"
            />
            <Title
              text={item.subheader.title}
              classname="uppercase text-[12px] leading-4"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center gap-x-4">
        <div className="">{QRCode}</div>
        <div className="w-[2px] bg-black"></div>
        <div className="flex flex-col justify-center items-center">
          <Title
            text={"Queue No"}
            classname="uppercase text-[18px] leading-5"
          />
          <Title text={seriesno} classname="uppercase text-[18px] leading-5" />
        </div>
      </div>
      <div className="flex flex-col">
        <Title
          text="present this receipt to the collector"
          classname="uppercase"
          textSize="text-[12px] pl-4"
        />
        <table>
          <tbody>
            {headers.map((label, index) => (
              <tr key={index} className="text-start text-[12px]">
                <td className="capitalize w-[90px] pl-4">{label}</td>
                <td>
                  {label === "trxn date" && appDate}
                  {label === "payer" && payerName}
                  {label === "address" && addr}
                  {label === "particulars" && "Real Tax Billing And Payment"}
                  {label === "total" && total}
                  {label === "tax no" && tdNo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default forwardRef(PaymentPrintTicket);
