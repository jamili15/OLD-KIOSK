import Keyboard from "@/components/keyboard/Keyboard";
import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { lookupService } from "@/libs/client-service";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { useStepper } from "@/services/context/stepper-context";
import { sleep } from "@/utils/helper";
import { loadBill } from "@/utils/rpt";
import { useRef, useState } from "react";
import Layout from "./Layout";
import { Loading } from "@/components/layout/Loading";

const RptInitial = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { setTaxBill, setBillToQtr, setBillToYear } = useTaxBillingContext();
  const tdno = useRef<HTMLInputElement>(null);
  const svc = lookupService("RptBillingService");

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const validInfo = async () => {
    const refno = tdno?.current?.value?.trim();
    if (!refno) {
      openAlert("Enter Tax Number");
      return false;
    } else {
      setIsProcessing(true);
      const data = await loadBill(svc, {
        refno,
        billtoqtr: setBillToQtr(4),
        billtoyear: setBillToYear(2024),
      });
      if (!data) {
        openAlert("Tax number does not exist");
        setIsProcessing(false);
        return false;
      } else {
        await sleep(2);
        setTaxBill(data);
        goToNextStep();
        return true;
      }
    }
  };

  const nextPage = async () => {
    if (!validInfo()) return;
  };

  return (
    <Layout>
      <Title
        text={"please enter a valid tax declaration no."}
        textSize="text-4xl uppercase m-4 capitalize"
      />
      <Textbox
        placeholder={"Tax Declaration No.*"}
        className="border-2 border-gray-400 w-full"
        ref={tdno}
      />
      {isProcessing && <Loading />}
      <Keyboard />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/rpt")}
          buttonText="Back"
          animation="shrink"
          classname="bg-[#567ac8] text-white"
        />
        <Button
          onClick={() => nextPage()}
          buttonText="Next"
          animation="shrink"
          classname="bg-light-blue text-white"
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
    </Layout>
  );
};

export default RptInitial;
