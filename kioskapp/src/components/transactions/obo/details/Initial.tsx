import Keyboard from "@/components/keyboard/Keyboard";
import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { useOboBillingContext } from "@/services/context/obo-context";
import { useStepper } from "@/services/context/stepper-context";
import { useRef, useState } from "react";
import Layout from "./Layout";
import { lookupService } from "@/libs/client-service";
import { loadBill } from "@/utils/obo";
import { sleep } from "@/utils/helper";
import { Loading } from "@/components/layout/Loading";

const OboInitial = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOboBill } = useOboBillingContext();
  const appno = useRef<HTMLInputElement>(null);
  const svc = lookupService("OboBillingService");

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const validInfo = async () => {
    const refno = appno?.current?.value?.trim();
    if (!refno) {
      openAlert("Enter OSCP Number");
      return false;
    } else {
      setIsProcessing(true);
      const data = await loadBill(svc, {
        refno,
      });
      if (!data) {
        openAlert("OSCP number does not exist");
        setIsProcessing(false);
        return false;
      } else {
        await sleep(2);
        setOboBill(data);
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
        text={"Please Enter a Valid (Application No. or Tracking No.)"}
        textSize="text-4xl m-4 capitalize"
      />
      <Textbox
        placeholder={`Application or Tracking No.*`}
        labelStyle="text-4xl"
        className="border-2 !text-4xl border-gray-400 w-full"
        ref={appno}
      />
      {isProcessing && <Loading />}
      <Keyboard />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/obo")}
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

export default OboInitial;
