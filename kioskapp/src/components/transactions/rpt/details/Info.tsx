import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";
import { createFetch } from "@/libs/fetch";
import { getBilling } from "@/services/api/rpt";
import { useTaxBillingContext } from "@/services/context/rpt-context";
import { useEffect, useState } from "react";

const RptInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { value, execute } = createFetch(getBilling);
  let options = [1, 2, 3, 4];
  let yearOptions = [2024, 2025, 2026, 2027];
  const {
    taxBillingInfo,
    setTaxBillingInfo,
    selectedOption,
    selectedOptionYear,
    setSelectedOptionYear,
    setSelectedOption,
  } = useTaxBillingContext();

  useEffect(() => {
    if (value && value.info) {
      setTaxBillingInfo(value.info);
    }
  }, [
    selectedOption,
    selectedOptionYear,
    taxBillingInfo,
    value,
    setTaxBillingInfo,
  ]);

  const handlePayOptionChange = (billtoqtr: number | string) => {
    setSelectedOption(billtoqtr);
    try {
      execute({
        refno: taxBillingInfo?.tdno,
        showdetails: true,
        billtoyear: taxBillingInfo?.billtoyear,
        billtoqtr: billtoqtr,
      });
    } catch (error) {
      console.error("Error fetching billing data:", error);
    }
  };
  const handlePayYearChange = (billtoyear: number | string) => {
    setSelectedOptionYear(billtoyear);
    try {
      execute({
        refno: taxBillingInfo?.tdno,
        showdetails: true,
        billtoqtr: taxBillingInfo?.billtoqtr,
        billtoyear: billtoyear,
      });
    } catch (error) {
      console.error("Error fetching billing data:", error);
    }
  };

  const inputConfigs = [
    { caption: taxBillingInfo?.billno || "N/A", label: "Bill No." },
    { caption: taxBillingInfo?.billdate || "N/A", label: "Bill Date" },
    { caption: taxBillingInfo?.tdno || "N/A", label: "TD No." },
    { caption: taxBillingInfo?.fullpin || "N/A", label: "PIN" },
    { caption: taxBillingInfo?.owner?.name || "N/A", label: "Property Owner" },
    { caption: taxBillingInfo?.taxpayer?.address || "N/A", label: "Address" },
    { caption: taxBillingInfo?.billperiod || "N/A", label: "Billing Period" },
    {
      caption: <Currency amount={taxBillingInfo?.amount || 0} currency="Php" />,
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
        {taxBillingInfo && (
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
      {taxBillingInfo && (
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
