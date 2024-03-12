import ActionBar from "@/components/layout/ActionBar";
import BplsInfo from "@/components/transactions/bpls/details/Info";
import Button from "@/components/ui/Button";
import { createFetch } from "@/libs/fetch";
import { generateCode } from "@/services/api/bpls";
import { useBillingContext } from "@/services/context/billing-context";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";

const BillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { billingInfo, setCode, setSection, selectedOption } =
    useBillingContext();
  const { execute } = createFetch(generateCode);

  const nextPage = async () => {
    const response = await execute({
      refno: billingInfo.bin,
      txntype: billingInfo.txntype,
      qtr: selectedOption,
    });
    setCode(response?.code);
    setSection(response?.queuesection);
    goToNextStep();
  };

  return (
    <Layout>
      <BplsInfo />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/bpls")}
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

export default BillingPage;
