import ActionBar from "@/components/layout/ActionBar";
import OboItems from "@/components/transactions/obo/details/Item";
import Button from "@/components/ui/Button";
import Grid from "@/components/ui/Grid";
import Title from "@/components/ui/Title";
import useTimer from "@/hooks/useTimer";
import { useStepper } from "@/services/context/stepper-context";
import { Obo, getObo } from "@/stores/obo-items";
import Layout from "./layout";

function OboPage({ obo }: { obo: Obo[] }) {
  const { goToPrevStep } = useStepper();

  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <Layout>
      <Title text={"Select Transaction"} textSize="text-4xl" />
      <Grid columns="gap-10">
        {obo.map((oboitem, index) => {
          return (
            <OboItems
              key={`${oboitem.id}_${index}`}
              obo={oboitem}
              disabled={oboitem.disabled}
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

export default OboPage;

/*==========================================
* SERVER SIDE CODE
==========================================*/

export async function getStaticProps() {
  const obo = getObo();

  return {
    props: {
      obo,
    },
  };
}
