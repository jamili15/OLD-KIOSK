import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import router from "next/router";
import Layout from "./layout";

const index = () => {
  return (
    <Layout>
      <Title text={"Welcome! How may we help you?"} textSize="text-8xl" />

      <Button
        buttonText="Tap to Start"
        classname="!text-[55px] text-white mt-48 font-bold uppercase border-4 !border-[#335F96] !py-10 !bg-[#567ac8] shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)]"
        onClick={() => {
          router.push("/menu");
        }}
      />
    </Layout>
  );
};

export default index;
