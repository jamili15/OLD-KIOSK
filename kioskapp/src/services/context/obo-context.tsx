// OboBillingContext.js
import React, { ReactNode, createContext, useContext, useState } from "react";

interface OboBillingContextProps {
  children: React.ReactNode;
}

interface OboBillingContext {
  oboBillingInfo: any;
  payerName: string;
  payerAddress: string;
  code: string;
  section: string;
  ticketNo: string;
  setOboBillingInfo: (data: any) => void;
  setPayerName: (name: string) => void;
  setPayerAddress: (address: string) => void;
  setCode: (code: string) => void;
  setSection: (section: string) => void;
  setTicketNo: (ticketNo: string) => void;
}

const OboBillingContext = createContext<OboBillingContext | undefined>(
  undefined
);

export const OboBillingProvider: React.FC<OboBillingContextProps> = ({
  children,
}) => {
  const [oboBillingInfo, setOboBillingInfo] = useState();

  const [payerName, setPayerName] = useState("");
  const [payerAddress, setPayerAddress] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [ticketNo, setTicketNo] = useState("");

  return (
    <OboBillingContext.Provider
      value={{
        oboBillingInfo,
        payerName,
        code,
        section,
        ticketNo,
        payerAddress,
        setOboBillingInfo,
        setPayerName,
        setPayerAddress,
        setCode,
        setSection,
        setTicketNo,
      }}
    >
      {children}
    </OboBillingContext.Provider>
  );
};

export const useOboBillingContext = (): OboBillingContext => {
  const context = useContext(OboBillingContext);
  if (!context) {
    throw new Error(
      "useOboBillingContext must be used within a OboBillingProvider"
    );
  }
  return context;
};
