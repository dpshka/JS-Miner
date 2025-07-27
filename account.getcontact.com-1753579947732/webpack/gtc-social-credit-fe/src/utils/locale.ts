import { useCookies } from "@vueuse/integrations/useCookies";
import { DateTime } from "luxon";
import { watch } from "vue";
import { useI18n, VueI18n } from "vue-i18n";

// Change this to sort locales by their display name
const localeOrder = [
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

  const { locale, availableLocales, messages, t }: any = useI18n({
    useScope: "global",
  });

  function watchLocale() {
    watch(locale, async () => {
      set("locale", locale.value, {
        expires: DateTime.local().plus({ days: 365 }).toJSDate(),
        path: "/",
        secure: process.env.NODE_ENV == "production" ? true : false,
      });
      document
        .getElementsByTagName("html")[0]
        .setAttribute("lang", locale.value);
    });
  }

  return {
    t,
    locale,
    watchLocale,
    availableLocales: availableLocales
      .map((locale: string) => ({
        locale: locale,
        localeName: messages.value[locale]?.localeName,
      }))
      .sort(
        (a: VueI18n, b: VueI18n) =>
          localeOrder.indexOf(a.locale) - localeOrder.indexOf(b.locale)
      ),
  };
}
