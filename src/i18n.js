import { createI18n } from "vue-i18n";
import en from "./locale/en";
import zh from "./locale/zh";

const messages = {
  "en-US": en,
  "zh-Hant-HK": zh,
};

const i18n = createI18n({
  locale: "zh-Hant-HK",
  fallbackLocale: "en-US",
  messages,
});
export default i18n;
