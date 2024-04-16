import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await POST(req, res);
  } else {
    res.status(500).json({ code: "01", error: "Method not available." });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const EscPosEncoder = require("esc-pos-encoder");

  try {
    const lguName = process.env.LGU_NAME;
    const recieveTicketInfo = req.body;
    const encoder = new EscPosEncoder();
    const commands = encoder
      .initialize()
      .align("center")
      .width(2)
      .height(2)
      .bold()
      .text("Queue Ticket Number")
      .bold()
      .newline()
      .width(1)
      .height(2)
      .bold()
      .text(lguName)
      .newline()
      .width(5)
      .height(5)
      .bold()
      .text(`${recieveTicketInfo.ticketno}`)
      .newline()
      .width(1)
      .height(1)
      .text("This is number is valid only on")
      .newline()
      .text(`${recieveTicketInfo.date}`)
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut("full")
      .encode();

    const printResponse = await axios.post(
      `http://${process.env.KIOSK_PRINT_SEVER_IP}:11111/api/print`,
      commands
    );
    res
      .status(200)
      .json({ message: "Ticket information received successfully." });
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
