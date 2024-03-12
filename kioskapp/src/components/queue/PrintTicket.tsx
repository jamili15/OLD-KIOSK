import { forwardRef, ForwardRefRenderFunction, Ref } from "react";
import Numbers from "../ui/Number";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

interface QueuePrintTicketProps {
  ticketno?: string | undefined;
  txndatestr: string | undefined;
}

const QueuePrintTicket: ForwardRefRenderFunction<
  HTMLDivElement,
  QueuePrintTicketProps
> = ({ ticketno, txndatestr }, ref: Ref<HTMLDivElement>) => (
  <div ref={ref} className={`!text-center`}>
    <div className="flex flex-col !text-center">
      <Title
        text={"Queue Ticket Number"}
        textSize="!text-[20px] leading-none"
      />
      <Subtitle
        text={"CEBU CITY"}
        textSize="font-semibold text-[20px] leading-[30px]"
      />
    </div>
    <div>
      <Numbers
        text={ticketno}
        textSize="font-bold text-[50px] !text-center py-6"
      />
    </div>
    <div className="grid text-center">
      <Subtitle
        text={"This number is Valid only on"}
        textSize="text-[15px] leading-[22px]"
      />
      <Subtitle text={txndatestr || ""} textSize="text-[15px] leading-none" />
    </div>
  </div>
);

export default forwardRef(QueuePrintTicket);
