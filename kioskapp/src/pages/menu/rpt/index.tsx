import ActionBar from "@/components/layout/ActionBar";
import RptItems from "@/components/transactions/rpt/details/Item";
import Button from "@/components/ui/Button";
import Grid from "@/components/ui/Grid";
import Title from "@/components/ui/Title";
import { useStepper } from "@/services/context/stepper-context";
import { Rpt, getRpt } from "@/stores/rpt-items";
import Layout from "./layout";
import useTimer from "@/hooks/useTimer";

function RptPage({ rpt }: { rpt: Rpt[] }) {
  const { goToPrevStep } = useStepper();
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <Layout>
      <Title text={"Select Transaction"} textSize="text-4xl" />
      <Grid columns="gap-10">
        {rpt.map((rptitem) => {
          return (
            <RptItems
              key={rptitem.id}
              rpt={rptitem}
              disabled={rptitem.disabled}
            />
          );
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

export default RptPage;

/*==========================================
* SERVER SIDE CODE
==========================================*/

export async function getStaticProps() {
  const rpt = getRpt();

  return {
    props: {
      rpt,
    },
  };
}
