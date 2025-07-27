import { useNavigatorLanguage } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import { createI18n } from "vue-i18n";

const { get } = useCookies(["locale"]);
const { language } = useNavigatorLanguage();
const languageCode = language.value?.split("-")[0];

const ar = { ...require("../locales/remote/ar.json") };
const az = { ...require("../locales/remote/az.json") };
const en = { ...require("../locales/remote/en.json") };
const es = { ...require("../locales/remote/es.json") };
const fr = { ...require("../locales/remote/fr.json") };
const hi = { ...require("../locales/remote/hi.json") };
const hy = { ...require("../locales/remote/hy.json") };
const id = { ...require("../locales/remote/id.json") };
const ka = { ...require("../locales/remote/ka.json") };
const kk = { ...require("../locales/remote/kk.json") };
const ky = { ...require("../locales/remote/ky.json") };
const mn = { ...require("../locales/remote/mn.json") };
const ms = { ...require("../locales/remote/ms.json") };
const ne = { ...require("../locales/remote/ne.json") };
const pt = { ...require("../locales/remote/pt.json") };
const ru = { ...require("../locales/remote/ru.json") };
const tg = { ...require("../locales/remote/tg.json") };
const th = { ...require("../locales/remote/th.json") };
const tl = { ...require("../locales/remote/tl.json") };
const tr = { ...require("../locales/remote/tr.json") };
const uk = { ...require("../locales/remote/uk.json") };
const uz = { ...require("../locales/remote/uz.json") };
const vi = { ...require("../locales/remote/vi.json") };

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
