import Keyboard from "@/components/keyboard/Keyboard";
import PaymentInformation from "@/components/transactions/bpls/payment/Info";
import useTimer from "@/hooks/useTimer";
import Layout from "./layout";

const PaymentPage = () => {
  const timeLimit = 120000;
  useTimer(timeLimit);

  return (
    <Layout>
      <PaymentInformation />
      <Keyboard />
    </Layout>
  );
};

export default PaymentPage;
