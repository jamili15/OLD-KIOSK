import ActionBar from "@/components/layout/ActionBar";
import RptInfo from "@/components/transactions/rpt/details/Info";
import Button from "@/components/ui/Button";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { createFetch } from "@/libs/fetch";
import { generateCode } from "@/services/api/rpt";

const TaxBillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { taxBillingInfo, setCode, setSection } = useTaxBillingContext();
  const { execute } = createFetch(generateCode);

  const nextPage = async () => {
    const response = await execute({
      refno: taxBillingInfo.tdno,
      txntype: "rpt",
      billtoyear: taxBillingInfo.billtoyear,
      billtoqtr: taxBillingInfo.billtoqtr,
    });
    setCode(response?.code);
    setSection(response?.queuesection);
    goToNextStep();
  };

  return (
    <Layout>
      <RptInfo />
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu/rpt")}
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

export default TaxBillingPage;
