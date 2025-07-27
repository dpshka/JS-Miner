export function useHelpers() {
  const isAndroid = /Android/i.test(navigator.userAgent);

  const toHHMMSS = (duration: number) => {
    let minutes = null;
    let seconds = null;

    minutes = Math.floor(duration / 60);
    seconds = Math.floor(duration % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  const maskedAccountNumber = (accountNumber: string | number) => {
    const accountNum = String(accountNumber);

    if (accountNum.length < 4) {
      throw new Error("Invalid account number");
    }

    const lastChars = accountNum.replace(/\s+/g, "").slice(-4);
    return `**** ${lastChars}`;
  };

  return {
    isAndroid,
    toHHMMSS,
    maskedAccountNumber,
  };
}
