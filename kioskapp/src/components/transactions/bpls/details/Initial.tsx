import Keyboard from "@/components/keyboard/Keyboard";
import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { createFetch } from "@/libs/fetch";
import { getBilling } from "@/services/api/bpls";
import { useBillingContext } from "@/services/context/billing-context";
import { useStepper } from "@/services/context/stepper-context";
import { validateBin } from "@/utils/validation";
import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";

const BplsInitial = () => {
  const { currentStep, goToNextStep, goToPrevStep } = useStepper();
  const { value, execute } = createFetch(getBilling);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { billingInfo, setBillingInfo, setSelectedOption } =
    useBillingContext();
  const bin = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setBillingInfo(value.info);
    }
  }, [value, billingInfo, setBillingInfo]);

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const nextPage = async () => {
    const refno = bin?.current?.value?.trim();
    await validateBin(
      currentStep,
      refno,
      execute,
      setBillingInfo,
      goToNextStep,
      openAlert
    );
    setSelectedOption(4);
  };

  return (
    <Layout>
      <Title
        text={
          "Enter a Valid Business Identification Number (BIN) or Application No."
        }
        textSize="text-4xl m-4"
      />
      <Textbox
        placeholder={"Enter BIN"}
        className="border-2 border-gray-400 w-full"
        ref={bin}
      />
      <Keyboard />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/bpls")}
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
          height: 0,
        }}
      />
    </Layout>
  );
};

export default BplsInitial;
