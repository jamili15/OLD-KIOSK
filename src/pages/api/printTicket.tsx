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
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const recieveTicketInfo = req.body;
    const encoder = new EscPosEncoder();
    const commands = encoder
      .initialize()
      .align("center")
      .width(1)
      .height(1)
      .bold()
      .text("REPUBLIC OF THE PHILIPPINES")
      .newline()
      .text(lguName)
      .newline()
      .width(2)
      .height(2)
      .text("QUEUE NO")
      .newline()
      .text(recieveTicketInfo.seriesNo)
      .newline()
      .width(1)
      .height(1)
      .bold()
      .text("PRESENT THIS RECEIPT TO THE COLLECTOR")
      .newline()
      .table(
        [
          { width: 10, align: "left" },
          { width: 34, align: "right" },
        ],
        [
          ["Date", `${month}/${day}/${year}`],
          ["Payer", recieveTicketInfo.payerName],
          ["Address", recieveTicketInfo.payerAddr],
          ["Particulars", recieveTicketInfo.particulars],
          ["Total", `${recieveTicketInfo.totalAmt}`],
          ["Bill No", recieveTicketInfo.controlNo],
        ]
      )
      .align("center")
      .qrcode(recieveTicketInfo.qrImage, 1, 4, "h")
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut("full") // Cut the paper
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
