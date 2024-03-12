import ActionBar from "@/components/layout/ActionBar";
import OboInfo from "@/components/transactions/obo/details/Info";
import Button from "@/components/ui/Button";
import { createFetch } from "@/libs/fetch";
import { generateCode } from "@/services/api/obo";
import { useOboBillingContext } from "@/services/context/obo-context";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";

const OboBillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { oboBillingInfo, setCode, setSection } = useOboBillingContext();
  const { execute } = createFetch(generateCode);

  const nextPage = async () => {
    const response = await execute({
      refno: oboBillingInfo.appno,
      txntype: oboBillingInfo.txntype,
    });
    setCode(response?.code);
    setSection(response?.queuesection);
    goToNextStep();
  };

  return (
    <Layout>
      <OboInfo />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/obo")}
          buttonText="Back"
          animation="shrink"
          classname="bg-[#567ac8] text-white"
        />
        <Button
          onClick={nextPage}
          buttonText="Next"
          classname="bg-light-blue text-white"
          animation="shrink"
        />
      </ActionBar>
    </Layout>
  );
};

export default OboBillingPage;
