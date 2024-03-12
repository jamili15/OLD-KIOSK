import { makeRequest } from "@/libs/fetch";

export const getBilling = (refno = {}) => {
  return makeRequest("/api/rpt/billing", {
    method: "GET",
    data: refno,
  });
};

export const generateCode = (refno = {}) => {
  return makeRequest("/api/rpt/generateCode", {
    method: "GET",
    data: refno,
  });
};
