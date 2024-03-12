//pages/api/rpt/billing.tsx
import Service from "@/libs/remote-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return GET(req, res);
  }
  return res.status(500).json({ code: "01", error: "Method not available." });
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { refno } = req.query;
  const { showdetails } = req.query;
  const { billtoyear } = req.query;
  const { billtoqtr } = req.query;
  const svc = Service.lookup("gdx/OnlineLandTaxBillingService", "etracs");

  try {
    const response = await svc.invoke("getBilling", {
      refno,
      showdetails,
      billtoyear,
      billtoqtr,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching billing data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
