// TaxBillingContext.js
import React, { ReactNode, createContext, useContext, useState } from "react";

interface TaxBillingContextProps {
  children: React.ReactNode;
}

interface TaxBillingContext {
  taxBill: any;
  billToQtr: number | string | null;
  billToYear: number | string | null;
  payerName: string;
  payerAddress: string;
  code: string;
  section: string;
  ticketNo: string;
  setTaxBill: (data: any) => void;
  setBillToQtr: (option: number | string | null) => void;
  setBillToYear: (optionYear: number | string | null) => void;
  setPayerName: (name: string) => void;
  setPayerAddress: (address: string) => void;
  setCode: (code: string) => void;
  setSection: (section: string) => void;
  setTicketNo: (ticketNo: string) => void;
}

const TaxBillingContext = createContext<TaxBillingContext | undefined>(
  undefined
);

export const RptBillingProvider: React.FC<TaxBillingContextProps> = ({
  children,
}) => {
  const [taxBill, setTaxBill] = useState();
  const [billToQtr, setBillToQtr] = useState<number | string | null>(null);
  const [billToYear, setBillToYear] = useState<number | string | null>(null);
  const [payerName, setPayerName] = useState("");
  const [payerAddress, setPayerAddress] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [ticketNo, setTicketNo] = useState("");

  const handleSetSelectedOption = (option: number | string | null) => {
    if (option === 1 || option === 2 || option === 3) {
      setBillToQtr(`${option}`);
    } else {
      setBillToQtr(option);
    }
  };

  const handleSetSelectedOptionYear = (optionYear: number | string | null) => {
    if (optionYear === 2024 || optionYear === 2025 || optionYear === 2026) {
      setBillToYear(`${optionYear}`);
    } else {
      setBillToYear(optionYear);
    }
  };

  return (
    <TaxBillingContext.Provider
      value={{
        taxBill,
        billToQtr,
        billToYear,
        payerName,
        code,
        section,
        ticketNo,
        payerAddress,
        setTaxBill,
        setBillToQtr: handleSetSelectedOption,
        setBillToYear: handleSetSelectedOptionYear,
        setPayerName,
        setPayerAddress,
        setCode,
        setSection,
        setTicketNo,
      }}
    >
      {children}
    </TaxBillingContext.Provider>
  );
};

export const useTaxBillingContext = (): TaxBillingContext => {
  const context = useContext(TaxBillingContext);
  if (!context) {
    throw new Error(
      "useTaxBillingContext must be used within a TaxBillingProvider"
    );
  }
  return context;
};
