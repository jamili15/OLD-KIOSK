import { makeRequest } from "@/libs/fetch";

export const queueTicket = (sendTicketInfo = {}) => {
  return makeRequest("/api/queue/printTicket", {
    method: "POST",
    data: sendTicketInfo,
  });
};

export const billingTicket = (sendTicketInfo = {}) => {
  return makeRequest("/api/bpls/printTicket", {
    method: "POST",
    data: sendTicketInfo,
  });
};
