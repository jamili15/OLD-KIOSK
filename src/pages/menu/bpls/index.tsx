import ActionBar from "@/components/layout/ActionBar";
import BplsItems from "@/components/transactions/bpls/details/Item";
import Button from "@/components/ui/Button";
import Grid from "@/components/ui/Grid";
import Title from "@/components/ui/Title";
import { useStepper } from "@/services/context/stepper-context";
import { getBpls } from "@/stores/bpls-items";
import Layout from "./layout";
import useTimer from "@/hooks/useTimer";

function BplsPage() {
  const { goToPrevStep } = useStepper();
  const bpls = getBpls();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <Layout>
      <Title text={"Select Transaction"} textSize="text-4xl capitalize" />
      <Grid columns="gap-10">
        {bpls.map((bplsitem) => {
          return <BplsItems key={bplsitem.id} bpls={bplsitem} />;
        })}
      </Grid>
      <ActionBar>
        <Button
          onClick={() => goToPrevStep("/menu")}
          buttonText="Back"
          animation="shrink"
          classname="bg-[#567ac8] text-white"
        />
      </ActionBar>
    </Layout>
  );
}

export default BplsPage;

/*==========================================
* SERVER SIDE CODE
==========================================*/

export async function getStaticProps() {
  const bpls = getBpls();

  return {
    props: {
      bpls,
    },
  };
}
