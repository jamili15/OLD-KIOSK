import Button from "@/components/ui/Button";
import { Rpt } from "@/stores/rpt-items";
import router from "next/router";

type RptItemsProps = {
  disabled: boolean;
};

function RptItems({ rpt, disabled }: { rpt: Rpt } & RptItemsProps) {
  function viewRptHandler() {
    router.push(`/menu/rpt/${rpt.id}`);
  }

  return (
    <>
      {!disabled && (
        <div className="flex justify-center items-center w-full h-[150px] text-white border-2 bg-[#335f96] border-light-blue rounded-2xl py-3 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)]">
          <Button
            buttonText={rpt.title}
            onClick={viewRptHandler}
            classname="w-full h-full capitalize border-none font-bold"
          />
        </div>
      )}
    </>
  );
}

export default RptItems;
