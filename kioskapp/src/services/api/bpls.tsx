import { makeRequest } from "@/libs/fetch";

export const getBilling = (refno = {}) => {
  return makeRequest("/api/bpls/billing", {
    method: "GET",
    data: refno,
  });
};

export const generateCode = (refno = {}) => {
  return makeRequest("/api/bpls/generateCode", {
    method: "GET",
    data: refno,
  });
};
