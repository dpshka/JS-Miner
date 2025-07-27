import { useNavigatorLanguage } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import { createI18n } from "vue-i18n";

const { get } = useCookies(["locale"]);
const { language } = useNavigatorLanguage();
const languageCode = language.value?.split("-")[0];

const ar = { ...require("../locales/ar.json") };
const az = { ...require("../locales/az.json") };
const en = { ...require("../locales/en.json") };
const es = { ...require("../locales/es.json") };
const fr = { ...require("../locales/fr.json") };
const hi = { ...require("../locales/hi.json") };
const hy = { ...require("../locales/hy.json") };
const id = { ...require("../locales/id.json") };
const ka = { ...require("../locales/ka.json") };
const kk = { ...require("../locales/kk.json") };
const ky = { ...require("../locales/ky.json") };
const mn = { ...require("../locales/mn.json") };
const ms = { ...require("../locales/ms.json") };
const ne = { ...require("../locales/ne.json") };
const pt = { ...require("../locales/pt.json") };
const ru = { ...require("../locales/ru.json") };
const tg = { ...require("../locales/tg.json") };
const th = { ...require("../locales/th.json") };
const tl = { ...require("../locales/tl.json") };
const tr = { ...require("../locales/tr.json") };
const uk = { ...require("../locales/uk.json") };
const uz = { ...require("../locales/uz.json") };
const vi = { ...require("../locales/vi.json") };

function defineLanguage(locale: string, localeName: string, messages: object) {
  return {
    [locale]: {
      localeName: localeName,
      ...messages,
    },
  };
}

export default createI18n({
  locale: get("locale") || languageCode || "en",
  fallbackLocale: "en",
  allowComposition: true,
  globalInjection: true,
  messages: {
    ...defineLanguage("en", "English", en),
    ...defineLanguage("tr", "Türkçe", tr),
    ...defineLanguage("az", "Azerbaijani", az),
    ...defineLanguage("hy", "Armenian", hy),
    ...defineLanguage("ar", "Arabic", ar),
    ...defineLanguage("fr", "French", fr),
    ...defineLanguage("ka", "Georgian", ka),
    ...defineLanguage("id", "Indonesian", id),
    ...defineLanguage("hi", "Hindi", hi),
    ...defineLanguage("kk", "Kazakh", kk),
    ...defineLanguage("ky", "Kyrgyz", ky),
    ...defineLanguage("mn", "Mongolian", mn),
    ...defineLanguage("ms", "Malay", ms),
    ...defineLanguage("ne", "Nepali", ne),
    ...defineLanguage("pt", "Portuguese", pt),
    ...defineLanguage("ru", "Russian", ru),
    ...defineLanguage("es", "Spanish", es),
    ...defineLanguage("th", "Thai", th),
    ...defineLanguage("tg", "Tajik", tg),
    ...defineLanguage("tl", "Tagalog", tl),
    ...defineLanguage("uk", "Ukrainian", uk),
    ...defineLanguage("uz", "Uzbek", uz),
    ...defineLanguage("vi", "Vietnamese", vi),
  },
});
