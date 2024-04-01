import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await POST(req, res); // Call the POST handler
  } else {
    res.status(500).json({ code: "01", error: "Method not available." });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
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

  try {
    const title = "Queue Ticket Number";
    const valid = "This is number is valid only on";
    const recieveTicketInfo = req.body;
    const escposText = `\x1D\x21\x11${space(3)}${title}
\x1D\x21\x01${countCharacter(recieveTicketInfo.subtitle, "center", "")}
\x0A
\x1D\x21\x52${space(3)}${recieveTicketInfo.ticketno}
\x0A
\x1D\x21\x01${countCharacter(valid, "center", "")}
\x1D\x21\x01${countCharacter(recieveTicketInfo.date, "center", "")}
\x0A
\x0A
\x0A
\x1D\x56\x00
  `;
    console.log("PRINT IP", process.env.KIOSK_PRINT_SEVER_IP);
    const printResponse = await axios.post(
      `http://${process.env.KIOSK_PRINT_SEVER_IP}:11111/api/print`,
      escposText
    );
    res
      .status(200)
      .json({ message: "Ticket information received successfully." });
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
