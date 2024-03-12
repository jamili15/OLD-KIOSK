import Keyboard from "@/components/keyboard/Keyboard";
import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { createFetch } from "@/libs/fetch";
import { getBilling } from "@/services/api/rpt";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { useStepper } from "@/services/context/stepper-context";
import { validateRpt } from "@/utils/validation";
import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";

const RptInitial = () => {
  const { currentStep, goToNextStep, goToPrevStep } = useStepper();
  const { value, execute } = createFetch(getBilling);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    taxBillingInfo,
    setTaxBillingInfo,
    setSelectedOption,
    setSelectedOptionYear,
  } = useTaxBillingContext();
  const tdno = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setTaxBillingInfo(value.info);
    }
  }, [value, taxBillingInfo, setTaxBillingInfo]);

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const nextPage = async () => {
    const refno = tdno?.current?.value?.trim();
    await validateRpt(
      currentStep,
      refno,
      execute,
      setTaxBillingInfo,
      goToNextStep,
      openAlert
    );
    setSelectedOption(4);
    setSelectedOptionYear(2024);
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
          height: 0,
        }}
      />
    </Layout>
  );
};

export default RptInitial;
