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

  try {
    const recieveTicketInfo = req.body;
    const lguName = process.env.LGU_NAME || "";
    const escpos = require("escpos");
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);

    const data =
      "51001:B0380220240200008?showdetails=true&qtr=4&paidby=asd&paidbyaddress=dada";
    const hexData = Buffer.from(data, "utf8").toString("hex");

    // ESC/POS command to store data in symbol storage area
    const storeCommand = `\x1D\x28\x6B${String.fromCharCode(
      hexData.length / 2 + 3
    )}\x00\x31\x50\x30${hexData}`;

    // ESC/POS command to print QR code
    const printCommand = "\x1D\x28\x6B\x03\x00\x31\x51\x30";

    device.open(() => {
      // Send command to store data
      printer.command(storeCommand);

      // Send command to print QR code
      printer.command(printCommand);

      // Close the connection to the printer
      device.close();
    });

    //     const countCharacter = (str: string, alignment: string, label: string) => {
    //       let grid = 48;
    //       let padding = 0;

    //       if (alignment === "left") {
    //         " ".repeat(0);
    //       } else if (alignment === "center") {
    //         padding = Math.floor((grid - str.length) / 2);
    //         return `${space(padding)}${str}`;
    //       } else if (alignment === "right") {
    //         padding = grid - str.length - label.length;
    //         return `${space(padding)}${str}`;
    //       }
    //     };

    //     const escposText = `
    // \x1B\x45\x01\x1D\x21\x00${countCharacter(
    //       "REPUBLIC OF THE PHILIPPINES",
    //       "center",
    //       ""
    //     )}
    // \x1D\x21\x00${countCharacter(lguName, "center", "")}
    // \x0A
    // \x1D\x28\x6B${String.fromCharCode(
    //       hexDataLength + 3
    //     )}\x00\x31\x41${hexData}\x1D\x28\x6B\x03\x00\x31\x51\x33
    // ${space(34)}${"QUEUE NO"}
    // ${space(36)}${recieveTicketInfo.seriesNo}\x1B\x45\x00
    // \x0A
    // \x1D\x21\x00${countCharacter(
    //       "PRESENT THIS RECEIPT TO THE COLLECTOR",
    //       "center",
    //       ""
    //     )}
    // Trxn Date:${space(6)}${recieveTicketInfo.appDate}
    // Payer:${space(10)}${recieveTicketInfo.payerName}
    // Address:${space(8)}${recieveTicketInfo.payerAddr}
    // Particulars:${space(4)}${recieveTicketInfo.particulars}
    // \x1B\x45\x01Total:${countCharacter(
    //       recieveTicketInfo.totalAmt.toLocaleString(),
    //       "right",
    //       "total:"
    //     )}
    // \x0A
    // \x1B\x45\x00Control No:
    // ${recieveTicketInfo.controlNo}
    // \x0A
    // \x0A
    // \x1D\x56\x00
    //       `;
    //     console.log("Ticket", escposText);
    //     const printResponse = await axios.post(
    //       `http://${process.env.KIOSK_PRINT_SEVER_IP}:11111/api/print`,
    //       escposText
    //     );
    res
      .status(200)
      .json({ message: "Ticket information received successfully." });
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
