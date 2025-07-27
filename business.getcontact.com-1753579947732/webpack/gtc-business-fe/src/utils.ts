import { useCookies } from "@vueuse/integrations/useCookies";
import { DateTime } from "luxon";

export function getFlagOfLocale(locale: string) {
  const flagMap: Record<string, string> = {
    en: "gb",
    hy: "am",
    ka: "ge",
    hi: "in",
    kk: "kz",
    tg: "tj",
    ar: "sa",
    ky: "kg",
    ms: "my",
    ne: "np",
    tl: "ph",
    uk: "ua",
    vi: "vn",
  };

  return flagMap[locale?.toLowerCase()] || locale?.toLowerCase();
}

export function formatDateWithLocale(date: string) {
  const { get } = useCookies(["locale"]);

  return DateTime.fromSQL(date).toFormat("FF", { locale: get("locale") });
}

export function copyArr(sourceArray: object) {
  return JSON.parse(JSON.stringify(sourceArray));
}

export function uniqueId() {
  return (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  );
}
