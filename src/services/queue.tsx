import { makeRequest } from "@/libs/fetch";

export const getGroupsWithSections = () => {
  return makeRequest("/api/queue/queuegroup");
};

export const fetchNextSeries = (section = {}) => {
  return makeRequest("/api/queue/section", {
    method: "GET",
    data: section,
  });
};
