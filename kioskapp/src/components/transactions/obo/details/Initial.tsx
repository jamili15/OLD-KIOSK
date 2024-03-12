import Keyboard from "@/components/keyboard/Keyboard";
import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import Button from "@/components/ui/Button";
import Textbox from "@/components/ui/Textbox";
import Title from "@/components/ui/Title";
import { createFetch } from "@/libs/fetch";
import { getBilling } from "@/services/api/obo";
import { useOboBillingContext } from "@/services/context/obo-context";
import { useStepper } from "@/services/context/stepper-context";
import { validateObo } from "@/utils/validation";
import { useEffect, useRef, useState } from "react";
import Layout from "./Layout";

const OboInitial = () => {
  const { currentStep, goToNextStep, goToPrevStep } = useStepper();
  const { value, execute } = createFetch(getBilling);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { oboBillingInfo, setOboBillingInfo } = useOboBillingContext();
  const appno = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setOboBillingInfo(value.info);
    }
  }, [value, oboBillingInfo, setOboBillingInfo]);

  const openAlert = (message: any) => {
    setErrorMessage(message);
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const nextPage = async () => {
    const refno = appno?.current?.value?.trim();
    await validateObo(
      currentStep,
      refno,
      execute,
      setOboBillingInfo,
      goToNextStep,
      openAlert
    );
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
          height: 0,
        }}
      />
    </Layout>
  );
};

export default OboInitial;
