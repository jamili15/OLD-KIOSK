// BillingContext.js
import React, { ReactNode, createContext, useContext, useState } from "react";

interface BillingContextProps {
  children: ReactNode;
}

interface BillingContext {
  bill: any;
  qtr: number | string | null;
  payerName: string;
  payerAddress: string;
  code: string;
  section: string;
  ticketNo: string;
  setBill: (data: any) => void;
  setQtr: (option: number | string | null) => void;
  setPayerName: (name: string) => void;
  setPayerAddress: (address: string) => void;
  setCode: (code: string) => void;
  setSection: (section: string) => void;
  setTicketNo: (ticketNo: string) => void;
}

const BillingContext = createContext<BillingContext | undefined>(undefined);

export const BillingProvider: React.FC<BillingContextProps> = ({
  children,
}) => {
  const [bill, setBill] = useState();
  const [qtr, setQtr] = useState<number | string | null>(null);
  const [payerName, setPayerName] = useState("");
  const [payerAddress, setPayerAddress] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [ticketNo, setTicketNo] = useState("");

  const handleSetSelectedOption = (option: number | string | null) => {
    if (option === 1 || option === 2 || option === 3) {
      setQtr(`${option}`);
    } else {
      setQtr(option);
    }
  };

  return (
    <BillingContext.Provider
      value={{
        bill,
        qtr,
        payerName,
        code,
        section,
        payerAddress,
        ticketNo,
        setBill,
        setQtr: handleSetSelectedOption,
        setPayerName,
        setPayerAddress,
        setCode,
        setSection,
        setTicketNo,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = (): BillingContext => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBillingContext must be used within a BillingProvider");
  }
  return context;
};
