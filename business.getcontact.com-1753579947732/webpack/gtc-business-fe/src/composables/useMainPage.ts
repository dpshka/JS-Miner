import { callWithToken, Service } from "@/api";

export function useMainPage() {
  async function getMainPage() {
    const data = await callWithToken(Service.getMainPage);
    return data.result;
  }

  return {
    getMainPage,
  };
}
