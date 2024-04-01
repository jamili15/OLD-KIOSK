import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import Dropdown from "@/components/ui/Dropdown";
import Grid from "@/components/ui/Grid";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";
import { lookupService } from "@/libs/client-service";
import { useBillingContext } from "@/services/context/billing-context";
import { loadBill } from "@/utils/bpls";
import { useState } from "react";

interface ItemType {
  lobname: string;
  account: string;
  amount: number;
  discount: number;
  surcharge: number;
  interest: number;
  total: number;
}

const BplsInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const headers = ["Particulars", "Amount", "Surcharge", "Interest", "Total"];
  let options = [1, 2, 3, 4];
  const { bill, setBill, qtr, setQtr } = useBillingContext();
  const svc = lookupService("BplsBillingService");

  const handlePayOptionChange = async (qtr: number | string) => {
    setQtr(qtr);
    setIsModalOpen(false);
    const data = await loadBill(svc, { refno: bill.info.bin, qtr: qtr });
    setBill(data);
  };

  const renderbill = () => (
    <div className="flex justify-start w-full !text-[20px]">
      <Grid columns="grid-rows-7 gap-2 font-bold indent-12 w-full">
        {[
          "Application No.",
          "Application Type",
          "Dated Filed",
          "BIN",
          "Trade Name",
          "Owner Name",
          "Business Address",
          "Bill Quarter",
        ].map((label, index) => (
          <p key={index} className="text-start">
            {label}
          </p>
        ))}
      </Grid>
      {bill && bill.info && (
        <Grid columns="grid-rows-7 gap-2 font-semibold w-full">
          {[
            bill.info.appno,
            bill.info.apptype,
            bill.info.appdate,
            bill.info.bin,
            bill.info.tradename,
            bill.info.ownername,
            bill.info.address,
            `${
              qtr === "1"
                ? "1st"
                : qtr === "2"
                ? "2nd"
                : qtr === "3"
                ? "3rd"
                : "4th"
            } Quarter`,
          ].map((value, index) => (
            <p key={index} className="text-start">{`${value}`}</p>
          ))}
        </Grid>
      )}
    </div>
  );

  const renderItemsGrid = () => (
    <div className="max-h-[500px] !h-[450px] w-full overflow-auto">
      <table className="table-auto w-full text-left">
        <thead className="sticky top-0 bg-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`text-2xl pb-8  pr-2 w-0 ${
                  index !== 0 ? "text-right" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-2xl">
          {bill &&
            bill.info &&
            bill.info.items &&
            bill.info.items.map((item: ItemType, index: number) => {
              let particulars = `${item.lobname} - ${item.account}`;
              if (!item.lobname || item.lobname === "") {
                particulars = item.account;
              }
              return (
                <tr key={index} className="text-right">
                  <td className="text-left w-[420px]">{particulars}</td>
                  <td>
                    <Currency amount={item.amount.toString()} />
                  </td>
                  <td>
                    <Currency amount={item.surcharge.toString()} />
                  </td>
                  <td>
                    <Currency amount={item.interest.toString()} />
                  </td>
                  <td className="w-[100px]">
                    <Currency amount={item.total.toString()} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-8">
      <Title
        text={"Billing Information"}
        classname="text-green-500"
        textSize="text-4xl"
      />
      <div>{renderbill()}</div>
      <div>
        <Button
          buttonText={"Pay Option"}
          classname="p-5 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)] border border-[#335f96]"
          onClick={openModal}
        />
      </div>
      <div>{renderItemsGrid()}</div>
      <div className="bg-black h-[2px] w-full "></div>
      <div className="flex justify-end">
        <div className="flex gap-x-8">
          <p className="text-3xl font-bold">Bill Amount</p>
          {bill && bill.amount !== undefined && (
            <Currency
              amount={bill.amount}
              currency="Php"
              classname="text-3xl"
            />
          )}
        </div>
      </div>
      {bill && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          textButton={"confirm"}
          buttonLayout="hidden"
        >
          <Title text={"Pay Options"} classname="text-[22px] " />
          <Dropdown
            options={options}
            onChange={handlePayOptionChange}
            caption="Quarter to Bill"
          />
        </Modal>
      )}
    </div>
  );
};

export default BplsInfo;
