import Grid from "@/components/ui/Grid";
import Icon from "@/components/ui/Icon";
import useTimer from "@/hooks/useTimer";
import { modules } from "@/stores/menu-items";
import router from "next/router";
import Layout from "./layout";

const MenuPage = () => {
  const timeLimit = 15000;
  useTimer(timeLimit);

  return (
    <Layout>
      {modules && (
        <Grid columns="grid-cols-3 gap-y-20 gap-x-40">
          {modules.map((item, index) => (
            <div key={index}>
              <Icon
                title={item.title}
                onClick={() => router.push(item.target)}
                image={item.image}
                fontSize="text-[22px]"
                width={60}
                height={0}
                active={item.active}
              />
            </div>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default MenuPage;
