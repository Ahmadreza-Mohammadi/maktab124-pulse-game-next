import { getAccessToken } from "./API";

export const checkAuth = () => {
  if (getAccessToken()) {
    return true;
  }
  return false;
};
