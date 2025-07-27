import { ref, watch } from "vue";

const isProd = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer: any;
  }
}

export function useGoogleEvents() {
  async function gtaEvent(...args: any[]) {
    window.dataLayer = window.dataLayer || [];
    if (isProd) window.dataLayer.push(args);
  }

  async function inputBehaviours(state: any, page: string) {
    const firstFilled = ref("");
    const lastFilled = ref("");
    const emptyReported = ref(); // While filling in which input, empty ones are detected?
    Object.keys(state).forEach((element: string) => {
      watch(
        () => state[element],
        (newValue, oldValue) => {
          let event;
          const current = Object.keys(state).indexOf(element);
          if (!firstFilled.value.length) {
            firstFilled.value = element;
            event = `0lk olarak ${element} dolduruldu.`;
          } else if (newValue && (!oldValue || !oldValue.length))
            event = `${element} inputunu dolu geçti.`;
          else if (lastFilled.value !== element && oldValue.length) {
            event = `${element} inputunu tekrar doldurdu.`;
          } else if (current && current !== emptyReported.value) {
            emptyReported.value = current;
            const emptyInputs = [];
            for (let i = 0; i < current; i++) {
              const input = state[Object.keys(state)[i]];
              if (!input) emptyInputs.push(Object.keys(state)[i]);
            }
            event = emptyInputs.length && `${emptyInputs} inputunu bo_ geçti.`;
          }
          lastFilled.value = element;
          if (event) {
            gtaEvent({
              event: "GAEvent",
              eventCategory: "Micro Funnel",
              eventAction: page,
              eventLabel: event,
            });
            gtaEvent({
              event: "microFunnel",
              formCategory: page,
              errorType: event,
            });
          }
        }
      );
    });
  }

  return {
    gtaEvent,
    inputBehaviours,
  };
}
