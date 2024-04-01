import { createFetchAsync, makeRequest } from "./client-fetch";

export const getService = (data: {}) => {
  return makeRequest("/api/service", {
    method: "GET",
    data,
  });
};

export const getPostService = (data: {}) => {
  return makeRequest("/api/service", {
    method: "POST",
    data: data,
  });
};

export type ServiceOptionType = {
  method?: "GET" | "POST";
  _connection?: string;
  _remoteid?: string;
};

export const lookupService = (
  serviceName: string,
  option: ServiceOptionType = {}
) => {
  if (!option.method) option.method = "POST";
  if (!option._connection) option._connection = "etracs";

  if (option.method === "GET") {
    return createFetchAsync(getService, serviceName, option);
  } else if (option.method === "POST") {
    return createFetchAsync(getPostService, serviceName, option);
  }
};
