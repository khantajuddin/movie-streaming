import { API_TOKEN } from "./constants";

export const apiHeaderOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_TOKEN,
  },
};
