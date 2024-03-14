import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import Subtitle from "@/components/ui/Subtitle";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { useStepper } from "@/services/context/stepper-context";
import { lookupService } from "@/libs/client-service";
import { useRef, useState } from "react";

const PaymentInformation = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const payerNameInput = useRef<HTMLInputElement>(null);
  const payerAddressInput = useRef<HTMLInputElement>(null);
  const { taxBill, setPayerName, setPayerAddress, section, setTicketNo } =
    useTaxBillingContext();
  const svc = lookupService("RptBillingService");

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const handleNext = async () => {
    const name = payerNameInput?.current?.value?.trim() || "";
    const address = payerAddressInput?.current?.value?.trim() || "";
    if (name !== "" && name !== null && name !== undefined) {
      if (address !== "" && address !== null && address !== undefined) {
        setPayerName(name);
        setPayerAddress(address);
        const data = await svc?.invoke("fetchNextSeries", {
          sectionid: section,
        });
        setTicketNo(data?.ticketno);
        goToNextStep();
      } else {
        openAlert("Enter payer address");
      }
    } else {
      openAlert("Enter payer name");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center items-center">
        <Title text={"Confirm Transaction"} classname="text-[50px]" />
        <Subtitle
          text={
            "Please Confirm and Fill up name and address of the payer for your electronic official receipt and click Next to proceed for payment"
          }
          classname="text-[25px] leading-normal p-5"
        />
      </div>
      <div className="flex flex-col gap-8 text-[28px]">
        <Textbox
          label="Payer Name"
          labelStyle="!p-1"
          className="w-full !p-4 text-[40px] text-start border-b-2 border-black rounded-none !h-[70px]"
          ref={payerNameInput}
        />
        <Textbox
          label="Payer Address"
          labelStyle="!p-1"
          className="w-full !p-4 text-[40px] text-start border-b-2 border-black rounded-none !h-[70px]"
          ref={payerAddressInput}
        />
      </div>
      <div className="m-2 text-center flex justify-center items-center flex-col gap-4 pt-10">
        <Subtitle text={"Payment Details"} />
        <div className="border border-black font-bold w-[70%] p-8">
          {taxBill && taxBill?.amount !== undefined && (
            <Currency
              amount={taxBill?.amount}
              currency="Php"
              classname="text-3xl"
            />
          )}
        </div>
        <ActionBar>
          <Button
            onClick={() => goToPrevStep("/menu/rpt")}
            buttonText="Back"
            animation="shrink"
            classname="bg-[#567ac8] text-white"
          />
          <Button
            onClick={() => handleNext()}
            buttonText="Next"
            classname="bg-light-blue text-white"
            animation="shrink"
          />
        </ActionBar>
        <Alert
          isOpen={isAlertOpen}
          onClose={closeAlert}
          errorMessage={errorMessage}
          img={{
            src: "/icons/alert.png",
            width: 200,
            height: 200,
          }}
        />
      </div>
    </>
  );
};

export default PaymentInformation;
