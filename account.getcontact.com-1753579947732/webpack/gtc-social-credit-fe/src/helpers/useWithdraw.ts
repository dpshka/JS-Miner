import router from "@/router";
import { useAccountStore } from "@/stores/account.store";
import { useBalanceStore } from "@/stores/balance.store";

const withdraw = async () => {
  const balanceStore = useBalanceStore();
  const kycUrl = await balanceStore.getKycUrl();

  if (kycUrl) {
    router.push({
      name: "earnedKycVerification",
      params: { url: kycUrl },
    });
  } else {
    const accountStore = useAccountStore();
    const response = await accountStore.getKycVerificationResult();

    if (response?.status === 200) {
      router.push({ name: "transferMethods" });
    } else {
      return "";
    }
  }
};

export default withdraw;
