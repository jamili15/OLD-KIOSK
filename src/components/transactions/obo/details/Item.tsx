import Button from "@/components/ui/Button";
import { Obo } from "@/stores/obo-items";
import router from "next/router";

type OboItemsProps = {
  disabled: boolean;
};

function OboItems({ obo, disabled }: { obo: Obo } & OboItemsProps) {
  function viewOboHandler() {
    router.push(`/menu/obo/${obo.id}`);
  }

  return (
    <>
      {!disabled && (
        <div className="flex justify-center items-center w-full h-[150px] text-white border-2 bg-[#335f96] border-light-blue rounded-2xl py-3 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)]">
          <Button
            buttonText={obo.title}
            onClick={viewOboHandler}
            classname="w-full h-full border-none font-bold capitalize"
          />
        </div>
      )}
    </>
  );
}

export default OboItems;
