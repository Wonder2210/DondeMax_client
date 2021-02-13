import es from "./es";
import en from "./en";
import LocalTypes from "./types";

const Languages: (lang: string) => LocalTypes = (lang) => {
  const choose = {
    es,
    en,
  };

  return choose[lang];
};

export default Languages;
