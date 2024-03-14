import { lookupService } from "@/libs/client-service";
import React, { useState } from "react";
import Title from "../ui/Title";
import QueueSectionList from "./SectionList";
import QueueTicket from "./Ticket";

interface QueueGroupListProps {
  groups: QueueGroup[];
}

interface QueueGroup {
  objid: string;
  title: string;
  sections: QueueSection[];
}

interface QueueSection {
  objid: string;
  title: string;
}

const QueueGroupList: React.FC<QueueGroupListProps> = ({ groups }) => {
  const [isQueueTicketOpen, setIsQueueTicketOpen] = useState(false);
  const openQueueTicket = () => setIsQueueTicketOpen(true);
  const closeQueueTicket = () => setIsQueueTicketOpen(false);
  const svc = lookupService("BplsBillingService");
  const [ticket, setTicket] = useState();
  const [txndate, setTxndate] = useState();

  const nextTicket = async (sectionid: string) => {
    const data = await svc?.invoke("fetchNextSeries", {
      sectionid: sectionid,
    });
    setTicket(data.ticketno);
    setTxndate(data.txndatestr);
    openQueueTicket();
  };

  return (
    <div className="flex flex-col gap-y-14">
      {groups.map((group: QueueGroup) => (
        <div key={group.objid} className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <Title
              text={group.title}
              textSize="text-3xl"
              classname="text-left"
            />
          </div>

          <QueueSectionList
            sections={group.sections}
            onClick={(sectionId) => {
              nextTicket(sectionId);
            }}
          />
        </div>
      ))}

      {ticket && (
        <QueueTicket
          isOpen={isQueueTicketOpen}
          onClose={closeQueueTicket}
          txndatestr={txndate}
          ticketno={ticket}
        />
      )}
    </div>
  );
};

export default QueueGroupList;
