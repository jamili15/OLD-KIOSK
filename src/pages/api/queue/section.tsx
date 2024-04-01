import type { ResponseError } from "@/libs/fetch";
import Service from "@/libs/remote-service";
import type { NextApiRequest, NextApiResponse } from "next";

type QueueSection = {
  objid: string;
  ticketno: string;
};

type ResponseData = {
  QueueSection?: QueueSection[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  if (req.method === "GET") {
    return GET(req, res);
  }
  return res.status(500).json({ code: "01", error: "Method not available." });
}

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  const { sectionid } = req.query;
  const svc = Service.lookup("api/QueueService", "etracs");
  const ticket = await svc.invoke("fetchNextTicket", { sectionid });
  return res.status(200).json(ticket);
}

async function sleep(sec: number) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve(sec);
    }, sec * 1000);
  });
}
