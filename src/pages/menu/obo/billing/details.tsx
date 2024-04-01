import ActionBar from "@/components/layout/ActionBar";
import OboInfo from "@/components/transactions/obo/details/Info";
import Button from "@/components/ui/Button";
import { useOboBillingContext } from "@/services/context/obo-context";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";
import { lookupService } from "@/libs/client-service";

const OboBillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { oboBill, setCode, setSection } = useOboBillingContext();
  const svc = lookupService("OboBillingService");

  const nextPage = async () => {
    const data = await svc?.invoke("generateCode", {
      refno: oboBill.appno,
      txntype: oboBill.txntype,
    });
    setCode(data.code);
    setSection(data.queuesection);
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
