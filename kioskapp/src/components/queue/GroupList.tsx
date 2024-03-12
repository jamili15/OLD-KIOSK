import { createFetch } from "@/libs/fetch";
import { fetchNextSeries } from "@/services/api/queue";
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

  const { value: showticket, execute } = createFetch(fetchNextSeries);

  function nextTicket(sectionid: string) {
    execute({ sectionid });
    openQueueTicket();
  }

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

      {showticket && (
        <QueueTicket
          isOpen={isQueueTicketOpen}
          onClose={closeQueueTicket}
          txndatestr={showticket.txndatestr}
          ticketno={showticket.ticketno}
        />
      )}
    </div>
  );
};

export default QueueGroupList;
