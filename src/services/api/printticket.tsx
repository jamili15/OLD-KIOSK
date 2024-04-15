import { makeRequest } from "@/libs/fetch";

export const queueTicket = (sendTicketInfo = {}) => {
  return makeRequest("/api/queue/printTicket", {
    method: "POST",
    data: sendTicketInfo,
  });
};

export const printTicket = (sendTicketInfo = {}) => {
  return makeRequest("/api/printTicket", {
    method: "POST",
    data: sendTicketInfo,
  });
};
