import { makeRequest } from "@/libs/fetch";

export const getBilling = (refno = {}) => {
  return makeRequest("/api/obo/billing", {
    method: "GET",
    data: refno,
  });
};

export const generateCode = (refno = {}) => {
  return makeRequest("/api/obo/generateCode", {
    method: "GET",
    data: refno,
  });
};
