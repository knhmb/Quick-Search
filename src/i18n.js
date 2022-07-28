import { createI18n } from "vue-i18n";
import en from "./locale/en";
import zh from "./locale/zh";

const messages = {
  "en-us": en,
  "zh-hant-hk": zh,
};

const i18n = createI18n({
  locale: "zh-hant-hk",
  fallbackLocale: "en-us",
  messages,
});
export default i18n;
