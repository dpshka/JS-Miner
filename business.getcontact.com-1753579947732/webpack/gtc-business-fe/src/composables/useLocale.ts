import { useCookies } from "@vueuse/integrations/useCookies";
import { DateTime } from "luxon";
import { watch } from "vue";
import { useI18n, VueI18n } from "vue-i18n";

import { callWithToken, Service } from "@/api";
import { useInitialize } from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";

// Change this to sort locales by their display name
const localeOrder: string[] = [
  "en",
  "tr",
  "az",
  "hy",
  "ar",
  "fr",
  "ka",
  "id",
  "hi",
  "kk",
  "ky",
  "mn",
  "ms",
  "ne",
  "pt",
  "ru",
  "es",
  "th",
  "tg",
  "tl",
  "uk",
  "uz",
  "vi",
];

export function useLocale() {
  const { set } = useCookies(["locale"]);
  const { isLoggedIn } = useLogin();
  const { fetchSiteData, siteData } = useInitialize();

  const { locale, availableLocales, messages, t }: any = useI18n({
    useScope: "global",
  });

  function watchLocale() {
    watch(locale, async () => {
      set("locale", locale.value, {
        expires: DateTime.local().plus({ days: 365 }).toJSDate(),
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      document
        .getElementsByTagName("html")[0]
        .setAttribute("lang", locale.value);

      if (isLoggedIn.value) {
        await callWithToken(Service.postChangeLanguage);
        await fetchSiteData();
      }
    });
  }

  const timezone = (dateValue: Date, options: object = {}): string => {
    const country = siteData.value.businessCompany.country;
    const timeZoneMinutes = new Date().getTimezoneOffset() * -1;
    const d = new Date(new Date(dateValue).getTime() + timeZoneMinutes * 60000);
    return d.toLocaleString(country, options);
  };

  return {
    t,
    locale,
    timezone,
    availableLocales: availableLocales
      .map((locale: string) => ({
        locale: locale,
        localeName: messages.value[locale]?.localeName,
      }))
      .sort(
        (a: VueI18n, b: VueI18n) =>
          localeOrder.indexOf(a.locale) - localeOrder.indexOf(b.locale)
      ),
    watchLocale,
  };
}
