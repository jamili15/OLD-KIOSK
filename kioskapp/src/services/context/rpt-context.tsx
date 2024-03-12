// TaxBillingContext.js
import React, { ReactNode, createContext, useContext, useState } from "react";

interface TaxBillingContextProps {
  children: React.ReactNode;
}

interface TaxBillingContext {
  taxBillingInfo: any;
  selectedOption: number | string | null;
  selectedOptionYear: number | string | null;
  payerName: string;
  payerAddress: string;
  code: string;
  section: string;
  ticketNo: string;
  setTaxBillingInfo: (data: any) => void;
  setSelectedOption: (option: number | string | null) => void;
  setSelectedOptionYear: (optionYear: number | string | null) => void;
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
  const [taxBillingInfo, setTaxBillingInfo] = useState();
  const [selectedOption, setSelectedOption] = useState<number | string | null>(
    null
  );
  const [selectedOptionYear, setSelectedOptionYear] = useState<
    number | string | null
  >(null);

  const [payerName, setPayerName] = useState("");
  const [payerAddress, setPayerAddress] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [ticketNo, setTicketNo] = useState("");

  const handleSetSelectedOption = (option: number | string | null) => {
    if (option === 1 || option === 2 || option === 3) {
      setSelectedOption(`${option}`);
    } else {
      setSelectedOption(option);
    }
  };

  const handleSetSelectedOptionYear = (optionYear: number | string | null) => {
    if (optionYear === 2024 || optionYear === 2025 || optionYear === 2026) {
      setSelectedOptionYear(`${optionYear}`);
    } else {
      setSelectedOptionYear(optionYear);
    }
  };

  return (
    <TaxBillingContext.Provider
      value={{
        taxBillingInfo,
        selectedOption,
        selectedOptionYear,
        payerName,
        code,
        section,
        ticketNo,
        payerAddress,
        setTaxBillingInfo,
        setSelectedOption: handleSetSelectedOption,
        setSelectedOptionYear: handleSetSelectedOptionYear,
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
