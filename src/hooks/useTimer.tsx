import { useStepper } from "@/services/context/stepper-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useTimer = (timeLimit: unknown) => {
  const router = useRouter();
  const { resetStep } = useStepper();
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resetStep();
        router.push("/");
      }, timeLimit as number);
    };

    const handleMouseMove = () => {
      resetTimer();
    };

    const handleKeyDown = () => {
      resetTimer();
    };

    // Initial setup of the timer
    resetTimer();

    // Event listeners to reset the timer on user activity
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, timeLimit, resetStep]);
};

export default useTimer;
