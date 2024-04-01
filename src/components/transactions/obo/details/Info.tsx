import Currency from "@/components/ui/Currency";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";
import { lookupService } from "@/libs/client-service";

import { useOboBillingContext } from "@/services/context/obo-context";
import { loadBill } from "@/utils/obo";
import { useEffect } from "react";

interface ItemType {
  title: string;
  total: number;
  items: Array<{
    item: {
      title: string;
    };
    amount: number;
    refid: string;
    code: string;
  }>;
}

const OboInfo = () => {
  const { oboBill } = useOboBillingContext();

  const headers = ["Particulars", "Amount"];

  const inputConfigs = [
    { caption: oboBill?.trackingno, label: "Tracking No." },
    { caption: oboBill?.permittype, label: "Permit Type" },
    { caption: oboBill?.title, label: "Project Name" },
    { caption: oboBill?.applicant.name, label: "Applicant" },
    { caption: oboBill?.appno, label: "Application No." },
    { caption: "", label: "Application Type" },
  ];

  return (
    <div className="text-2xl flex flex-col gap-12 w-full">
      <Title text={"Billing Information"} classname="text-green-500" />
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col gap-10">
          {inputConfigs.map((config, index) => (
            <Input
              key={index}
              className="border-b-2 border-gray-500"
              labelLayout="!left-0 text-2xl"
              label={config.label}
              caption={config.caption}
              captionLayout="text-[22px]"
              type="disabled"
            />
          ))}
          <div>
            <Title text={"Billing Details"} />
          </div>
          <div className="max-h-[500px] !h-[350px] w-full overflow-auto">
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
                {oboBill &&
                  oboBill.items &&
                  oboBill.items.map(
                    (item: ItemType["items"][0], index: number) => {
                      return (
                        <tr key={index} className="text-right">
                          <td className="text-left">{item.item.title}</td>
                          <td>
                            <Currency amount={item.amount} />
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
          <div className="bg-black h-[2px] w-full "></div>
          <div className="flex justify-end">
            <div className="flex gap-x-8">
              <p className="text-3xl font-bold">Bill Amount</p>
              {oboBill && oboBill.amount !== undefined && (
                <Currency
                  amount={oboBill.amount}
                  currency="Php"
                  classname="text-3xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OboInfo;
