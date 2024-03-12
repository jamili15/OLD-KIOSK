import Button from "@/components/ui/Button";
import router from "next/router";

function BplsItems({ bpls }: { bpls: any }) {
  function viewBplsHandler() {
    router.push(`/menu/bpls/${bpls.id}`);
  }

  return (
    <div className="flex justify-center items-center w-full h-[150px] text-white border-2 bg-[#335f96] border-light-blue rounded-2xl py-3 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)]">
      <Button
        buttonText={bpls.title}
        onClick={viewBplsHandler}
        classname="text-[28px] border-none font-bold capitalize"
      />
    </div>
  );
}

export default BplsItems;
