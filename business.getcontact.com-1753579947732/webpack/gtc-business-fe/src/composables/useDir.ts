import { computed } from "vue";

import { useLocale } from "./useLocale";

export function useDir() {
  const { locale } = useLocale();

  const dir = computed(() => {
    const rtlLocales = ["ar"];
    return rtlLocales.includes(locale.value) ? "rtl" : "ltr";
  });

  return { dir };
}
