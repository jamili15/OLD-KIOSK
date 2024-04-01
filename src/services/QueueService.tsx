import axios from "axios";

export const printTicket = ({
  ticketno,
  txndatestr,
}: {
  ticketno: string | undefined;
  txndatestr: string | undefined;
}) => {
  const space = (count: number): string => {
    return " ".repeat(count);
  };

  const countCharacter = (str: string, alignment: string, label: string) => {
    let grid = 48;
    let padding = 0;

    if (alignment === "left") {
      " ".repeat(0);
    } else if (alignment === "center") {
      padding = Math.floor((grid - str.length) / 2);
      return `${space(padding)}${str}`;
    } else if (alignment === "right") {
      padding = grid - str.length - label.length;
      return `${space(padding)}${str}`;
    }
  };

  const title = "Queue Ticket Number";
  const valid = "This is number is valid only on";
  const lguName = process.env.LGU_NAME;

  const escposText = `\x1D\x21\x11${space(3)}${title}
\x1D\x21\x01${countCharacter(lguName || "", "center", "")}
\x0A
\x1D\x21\x44${space(3)}${ticketno}
\x0A
\x1D\x21\x01${countCharacter(valid, "center", "")}
\x1D\x21\x01${countCharacter(txndatestr || "", "center", "")}
\x0A
\x0A
\x1D\x56\x00
  `;

  const printResponse = axios.post(
    `http://${process.env.KIOSK_PRINT_SEVER_IP}:11111/api/print`,
    escposText
  );
};
