import Alert from "@/components/layout/Alert";
import Card from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import { useOboBillingContext } from "@/services/context/obo-context";
import paymentTypeData from "@/stores/paymenttype-items";
import React, { useState } from "react";
import PaymentTicket from "../ticket/PaymentTicket";

const useModal = () => {
  const [openTicket, setOpenTicket] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<any>(null);

  const handleOpenTicket = (content: any) => {
    setModalContent(content);
    setOpenTicket(true);
  };

  const handleCloseTicket = () => {
    setModalContent(null);
    setOpenTicket(false);
  };

  return { openTicket, handleOpenTicket, handleCloseTicket, modalContent };
};

const PaymentType = () => {
  const { code, ticketNo } = useOboBillingContext();
  const [openAlert, setOpenAlert] = useState(false);
  const { openTicket, handleOpenTicket, handleCloseTicket, modalContent } =
    useModal();

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className="flex flex-col gap-y-20">
      <Title
        text={"How do you like to pay?"}
        textSize="text-5xl capitalize text-center"
      />
      <div className="flex justify-center text-center items-center gap-x-20">
        {paymentTypeData.map(
          (info, index) =>
            !info.disabled && (
              <Card
                key={index}
                image={{
                  img: info.image,
                  height: 250,
                  width: 250,
                }}
                title={{
                  label: info.title,
                  classname: "uppercase font-bold",
                }}
                onClick={
                  info.title === "GCASH"
                    ? handleOpenAlert
                    : () => handleOpenTicket(info.modalcontent)
                }
              />
            )
        )}

        {modalContent && (
          <PaymentTicket
            isOpen={openTicket}
            onClose={handleCloseTicket}
            obotxntype={code}
            seriesno={ticketNo}
          />
        )}
        <Alert
          isOpen={openAlert}
          onClose={handleCloseAlert}
          errorMessage="GCASH Coming Soon."
          img={{
            src: "/icons/galert.png",
            width: 150,
            height: 200,
          }}
        />
      </div>
    </div>
  );
};

export default PaymentType;
