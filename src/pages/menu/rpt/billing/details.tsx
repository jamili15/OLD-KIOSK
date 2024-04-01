import ActionBar from "@/components/layout/ActionBar";
import RptInfo from "@/components/transactions/rpt/details/Info";
import Button from "@/components/ui/Button";
import { useStepper } from "@/services/context/stepper-context";
import Layout from "./layout";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { lookupService } from "@/libs/client-service";

const TaxBillingPage = () => {
  const { goToNextStep, goToPrevStep } = useStepper();
  const { taxBill, setCode, setSection } = useTaxBillingContext();
  const svc = lookupService("RptBillingService");
  const nextPage = async () => {
    const data = await svc?.invoke("generateCode", {
      refno: taxBill.info.tdno,
      txntype: "rpt",
    });
    setCode(data.code);
    setSection(data.queuesection);
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
