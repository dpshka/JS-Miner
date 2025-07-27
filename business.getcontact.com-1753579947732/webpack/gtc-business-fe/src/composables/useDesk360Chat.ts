// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function useDesk360Chat() {
  function importChat(value: boolean) {
    const initDesk360Chat = () => {
      const desk360Token = value
        ? "59GYTPlDHqGilFCccwB7xp2EpyI4UQCV3MjCOFLxJuwHGrftcmJ6sFaTH65l8GbKTXvZRBcI3UORUHcK"
        : "SSm5kMBBsM2eS7Btzt07JgUZJrMC7Iaa41sldGKvw3z65mdBBbpFTiFURWYQ3jqjfoFtSHVc3E2X783Y";
      window.desk360Chat?.init({
        token: desk360Token,
        host: "https://getcontact.desk360.com/",
      });
    };
    const initialize = (chatContainer: any, chatId: any) => {
      let e;
      const a = btoa(new Date().toDateString()).toLowerCase();
      chatContainer.getElementById(chatId)
        ? initDesk360Chat()
        : (((e = chatContainer.createElement("script")).id = chatId),
          (e.async = !0),
          (e.src = "https://getcontact.desk360.com/widgets/chat/sdk.js?".concat(
            a
          )),
          (e.onload = initDesk360Chat),
          chatContainer.head.appendChild(e));
    };

    const initiateCall = () => {
      initialize(document, "desk360chat-js-sdk");
    };
    window.addEventListener
      ? window.addEventListener("load", initiateCall, !1)
      : window.attachEvent("load", initiateCall, !1);
  }

  return {
    importChat,
  };
}
