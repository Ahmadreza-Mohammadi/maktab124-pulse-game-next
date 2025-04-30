import { ACCESS_TOKEN } from "./API";

export const isLogin = () => {
    if (ACCESS_TOKEN) {
      return true;
    } else {
      return false;
    }
  };