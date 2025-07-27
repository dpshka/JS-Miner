import { callWithToken, Service } from "@/api";

export function useAcceptPopupTerms() {
  async function postTerms() {
    const data = await callWithToken(Service.postAcceptPopupTerms);
    return data.result;
  }

  return {
    postTerms,
  };
}
