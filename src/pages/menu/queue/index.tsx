import ActionBar from "@/components/layout/ActionBar";
import Alert from "@/components/layout/Alert";
import QueueGroupList from "@/components/queue/GroupList";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import useTimer from "@/hooks/useTimer";
import Service from "@/libs/remote-service";
import { QueueGroup, QueueSection } from "@/services/context/queue-context";
import { useStepper } from "@/services/context/stepper-context";
import router from "next/router";
import Layout from "./layout";

function QueueGroupPage({
  groups,
  error,
}: {
  groups: QueueGroup[];
  error?: string;
}) {
  const { goToPrevStep } = useStepper();

  const timeLimit = 15000;
  useTimer(timeLimit);

  if (error) {
    return (
      <Alert
        isOpen
        errorMessage={error}
        onClose={() => router.push("/menu")}
        img={{
          src: "/icons/alert.png",
          width: 200,
          height: 0,
        }}
      />
    );
  } else {
    return (
      <Layout>
        <Title
          text={`Select a Category below to proceed with your choice.`}
          textSize="!text-4xl"
        />
        <QueueGroupList groups={groups} />
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
}

export default QueueGroupPage;

//====================================
//SERVER CODE
//====================================

export const getServerSideProps = async () => {
  try {
    const svc = Service.lookup("QueueGroupService", "etracs");
    const groupsWithSections = await svc.invoke("getGroupsWithSections", null);

    const groups: QueueGroup[] = groupsWithSections.map((item: any) => {
      const group: QueueGroup = {
        objid: item.objid,
        title: item.title,
        sections: getSections(item),
      };
      return group;
    });

    return {
      props: {
        groups,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "No internet Connection",
      },
    };
  }
};

function getSections(group: any) {
  return group.sections.map((item: any) => {
    const section: QueueSection = {
      objid: item.objid,
      groupid: item.groupid,
      title: item.title,
      currentseries: item.currentseries,
      group: {
        objid: group.objid,
        title: group.title,
      },
    };
    return section;
  });
}
