import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";
import { lookupService } from "@/libs/client-service";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { useState } from "react";
import { loadBill } from "@/utils/rpt";

const RptInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  let options = [1, 2, 3, 4];
  let yearOptions = [2024, 2025, 2026, 2027];
  const { taxBill, setTaxBill, setBillToQtr, setBillToYear } =
    useTaxBillingContext();
  const svc = lookupService("RptBillingService");

  const handlePayOptionChange = async (billtoqtr: number | string) => {
    setBillToQtr(billtoqtr);

    const data = await loadBill(svc, {
      refno: taxBill?.info?.tdno,
      billtoyear: taxBill?.info?.billtoyear,
      billtoqtr: billtoqtr,
    });
    setTaxBill(data);
  };

  const handlePayYearChange = async (billtoyear: number | string) => {
    setBillToYear(billtoyear);

    const data = await loadBill(svc, {
      refno: taxBill?.info?.tdno,
      billtoqtr: taxBill?.info?.billtoqtr,
      billtoyear: billtoyear,
    });
    setTaxBill(data);
  };

  const inputConfigs = [
    { caption: taxBill?.info?.billno || "N/A", label: "Bill No." },
    { caption: taxBill?.info?.billdate || "N/A", label: "Bill Date" },
    { caption: taxBill?.info?.tdno || "N/A", label: "TD No." },
    { caption: taxBill?.info?.fullpin || "N/A", label: "PIN" },
    { caption: taxBill?.info?.owner?.name || "N/A", label: "Property Owner" },
    { caption: taxBill?.info?.taxpayer?.address || "N/A", label: "Address" },
    { caption: taxBill?.info?.billperiod || "N/A", label: "Billing Period" },
    {
      caption: <Currency amount={taxBill?.info?.amount || 0} currency="Php" />,
      label: "Amount Due",
    },
  ];

  return (
    <div className="text-2xl flex flex-col gap-12 w-full">
      <Title text={"Billing Information"} classname="text-green-500" />
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col gap-14">
          {inputConfigs.map((config, index) => (
            <Input
              key={index}
              className="border-b-2 border-gray-500"
              labelLayout="!left-0 text-3xl"
              label={config.label}
              caption={config.caption}
              captionLayout="text-2xl"
              type="disabled"
            />
          ))}
        </div>
        {taxBill && (
          <>
            <div>
              <Button
                buttonText={"Pay Option"}
                classname="p-5 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)] border border-[#335f96]"
                onClick={openModal}
              />
            </div>
          </>
        )}
      </div>
      {taxBill && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          buttonLayout="hidden"
          className="relative"
        >
          <Title text={"Pay Options"} classname="text-[22px] " />
          <Dropdown
            caption="Year to Bill"
            options={yearOptions}
            onChange={handlePayYearChange}
          />
          <Dropdown
            options={options}
            caption="Quarter to Bill"
            onChange={handlePayOptionChange}
          />
          <Button
            buttonText={"OK"}
            classname=" absolute bottom-16"
            onClick={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default RptInfo;
