/* eslint-disable react-hooks/rules-of-hooks */
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { createFetch } from "@/libs/fetch";
import { billingTicket } from "@/services/api/printticket";
import { useBillingContext } from "@/services/context/billing-context";
import { ticketInfo } from "@/stores/lgu-info";
import Image from "next/image";
import React, { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import PaymentTicketPrint from "./PaymentTicketPrint";

interface PaymentTicketProps {
  isOpen: boolean;
  onClose?: () => void;
  showClose?: string;
  txntype?: string;
  seriesno?: string;
}

const PaymentTicket: React.FC<PaymentTicketProps> = ({
  isOpen,
  onClose,
  showClose,
  txntype,
  seriesno,
}) => {
  const [isPrinting, setIsPrinting] = React.useState(false);
  const { value, execute } = createFetch(billingTicket);
  const componentRef = useRef<any>();
  const { billingInfo, payerName, payerAddress } = useBillingContext();
  const combinedData = `${txntype}\n&paidby=${payerName}&paidbyaddress=${payerAddress}`;
  const headers = [
    "trxn date",
    "payer",
    "address",
    "particulars",
    "control no.",
    "total",
  ];

  // const handlePrint = () => {
  //   const sendTicketInfo = {
  //     appDate: billingInfo.appdate,
  //     payerName: payerName,
  //     payerAddr: payerAddress,
  //     particulars: "Business Billing and Payment",
  //     controlNo: combinedData,
  //     totalAmt: billingInfo.amount,
  //     seriesNo: seriesno,
  //     qrImage: combinedData,
  //   };
  //   execute(sendTicketInfo);
  // };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      onClose && onClose();
    },
  });

  return (
    <>
      <div className="hidden">
        <PaymentTicketPrint
          ref={componentRef}
          QRCode={<QRCode value={combinedData} size={100} level="Q" />}
          addr={payerAddress}
          total={billingInfo.amount.toLocaleString()}
          QRData={combinedData}
          appDate={billingInfo.appdate}
          payerName={payerName}
          seriesno={seriesno}
        />
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#00000080] flex flex-col justify-center items-center z-[1]`}
      >
        <div className="w-[60%] relative flex flex-col items-center bg-white p-4 rounded-2xl z-10">
          <div className={`flex justify-end w-full ${showClose}`}>
            <Button onClick={onClose} classname="text-[#333] border-none !px-0">
              <MdOutlineClose size={50} />
            </Button>
          </div>
          {isPrinting ? (
            <div className="flex flex-col items-center justify-center pb-20 gap-10">
              <div className="w-12 h-12 relative animate-spin ">
                {[0, 90, 180, 260].map((rotation) => (
                  <div
                    key={rotation}
                    className={`w-4 h-4 bg-blue-500 rounded-full absolute ${
                      rotation < 180 ? "top-0" : "bottom-0"
                    } ${
                      rotation % 180 === 0 ? "left-0" : "right-0"
                    } animate-pulse`}
                  ></div>
                ))}
              </div>
              <Title
                text={"Printing Ticket"}
                classname="!text-[25px] !leading-[0px]"
              />
              <Subtitle
                text={" Please wait while your ticket is being printed."}
                classname="text-[20px] !leading-[0px]"
              />
            </div>
          ) : (
            <div className="m-8">
              <div className="w-full flex flex-col gap-y-10">
                {ticketInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-wrap items-center justify-between"
                  >
                    <div className="flex container mx-auto">
                      <Image
                        src={item.logo.src}
                        alt={""}
                        width={item.logo.width}
                        height={0}
                        loading="eager"
                      />
                      <div className="flex flex-col justify-center mx-4">
                        <Title
                          text={item.header.title}
                          classname="uppercase text-[24px] leading-6"
                        />
                        <Title
                          text={item.subheader.title}
                          classname="uppercase text-[24px] leading-6"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-x-10 justify-center">
                  <div className="relative">
                    <QRCode value={combinedData} size={90} />
                  </div>
                  <div className="w-[2px] bg-black"></div>
                  <div className="uppercase">
                    <Title text={"Queue No"} />
                    <Title text={seriesno} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Title
                    text="present this receipt to the collector"
                    classname="uppercase"
                    textSize="text-xl"
                  />
                  <div className="flex justify-center">
                    <table>
                      <tbody>
                        {headers.map((label, index) => (
                          <tr key={index}>
                            <td className="text-start text-[15px] leading-6 capitalize w-24">
                              {label}
                            </td>
                            <td className="text-start text-[15px] leading-6 font-semibold font-mono">
                              {
                                [
                                  billingInfo.appdate
                                    ? `${billingInfo.appdate}`
                                    : "",
                                  `${payerName}`,
                                  payerAddress ? `${payerAddress}` : "",
                                  "Business and Licensing",
                                  combinedData ? `${combinedData}` : "",
                                  billingInfo.amount
                                    ? `${billingInfo.amount.toLocaleString()}`
                                    : "",
                                ][index]
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <Button buttonText="Print" onClick={handlePrint} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentTicket;
