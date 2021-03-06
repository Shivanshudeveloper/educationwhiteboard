const fs = require("fs");

const THRESSHOLD = 85;

const crowdinMap = {
  "ar-SA": "en-ar",
  "bg-BG": "en-bg",
  "bn-BD": "en-bn",
  "ca-ES": "en-ca",
  "da-DK": "en-da",
  "de-DE": "en-de",
  "el-GR": "en-el",
  "es-ES": "en-es",
  "fa-IR": "en-fa",
  "fi-FI": "en-fi",
  "fr-FR": "en-fr",
  "he-IL": "en-he",
  "hi-IN": "en-hi",
  "hu-HU": "en-hu",
  "id-ID": "en-id",
  "it-IT": "en-it",
  "ja-JP": "en-ja",
  "kab-KAB": "en-kab",
  "ko-KR": "en-ko",
  "my-MM": "en-my",
  "nb-NO": "en-nb",
  "nl-NL": "en-nl",
  "nn-NO": "en-nnno",
  "oc-FR": "en-oc",
  "pa-IN": "en-pain",
  "pl-PL": "en-pl",
  "pt-BR": "en-ptbr",
  "pt-PT": "en-pt",
  "ro-RO": "en-ro",
  "ru-RU": "en-ru",
  "si-LK": "en-silk",
  "sk-SK": "en-sk",
  "sv-SE": "en-sv",
  "ta-IN": "en-ta",
  "tr-TR": "en-tr",
  "uk-UA": "en-uk",
  "zh-CN": "en-zhcn",
  "zh-HK": "en-zhhk",
  "zh-TW": "en-zhtw",
  "lv-LV": "en-lv",
  "cs-CZ": "en-cs",
  "kk-KZ": "en-kk",
};

const flags = {
  "ar-SA": "๐ธ๐ฆ",
  "bg-BG": "๐ง๐ฌ",
  "bn-BD": "๐ง๐ฉ",
  "ca-ES": "๐ณ",
  "cs-CZ": "๐จ๐ฟ",
  "da-DK": "๐ฉ๐ฐ",
  "de-DE": "๐ฉ๐ช",
  "el-GR": "๐ฌ๐ท",
  "es-ES": "๐ช๐ธ",
  "fa-IR": "๐ฎ๐ท",
  "fi-FI": "๐ซ๐ฎ",
  "fr-FR": "๐ซ๐ท",
  "he-IL": "๐ฎ๐ฑ",
  "hi-IN": "๐ฎ๐ณ",
  "hu-HU": "๐ญ๐บ",
  "id-ID": "๐ฎ๐ฉ",
  "it-IT": "๐ฎ๐น",
  "ja-JP": "๐ฏ๐ต",
  "kab-KAB": "๐ณ",
  "kk-KZ": "๐ฐ๐ฟ",
  "ko-KR": "๐ฐ๐ท",
  "lv-LV": "๐ฑ๐ป",
  "my-MM": "๐ฒ๐ฒ",
  "nb-NO": "๐ณ๐ด",
  "nl-NL": "๐ณ๐ฑ",
  "nn-NO": "๐ณ๐ด",
  "oc-FR": "๐ณ",
  "pa-IN": "๐ฎ๐ณ",
  "pl-PL": "๐ต๐ฑ",
  "pt-BR": "๐ง๐ท",
  "pt-PT": "๐ต๐น",
  "ro-RO": "๐ท๐ด",
  "ru-RU": "๐ท๐บ",
  "si-LK": "๐ฑ๐ฐ",
  "sk-SK": "๐ธ๐ฐ",
  "sv-SE": "๐ธ๐ช",
  "ta-IN": "๐ฎ๐ณ",
  "tr-TR": "๐น๐ท",
  "uk-UA": "๐บ๐ฆ",
  "zh-CN": "๐จ๐ณ",
  "zh-HK": "๐ญ๐ฐ",
  "zh-TW": "๐น๐ผ",
};

const languages = {
  "ar-SA": "ุงูุนุฑุจูุฉ",
  "bg-BG": "ะัะปะณะฐััะบะธ",
  "bn-BD": "Bengali",
  "ca-ES": "Catalร ",
  "cs-CZ": "ฤesky",
  "da-DK": "Dansk",
  "de-DE": "Deutsch",
  "el-GR": "ฮฮปฮปฮทฮฝฮนฮบฮฌ",
  "es-ES": "Espaรฑol",
  "fa-IR": "ูุงุฑุณ?",
  "fi-FI": "Suomi",
  "fr-FR": "Franรงais",
  "he-IL": "ืขืืจืืช",
  "hi-IN": "เคนเคฟเคจเฅเคฆเฅ",
  "hu-HU": "Magyar",
  "id-ID": "Bahasa Indonesia",
  "it-IT": "Italiano",
  "ja-JP": "ๆฅๆฌ่ช",
  "kab-KAB": "Taqbaylit",
  "kk-KZ": "าะฐะทะฐา ััะปั",
  "ko-KR": "ํ๊ตญ์ด",
  "lv-LV": "Latvieลกu",
  "my-MM": "Burmese",
  "nb-NO": "Norsk bokmรฅl",
  "nl-NL": "Nederlands",
  "nn-NO": "Norsk nynorsk",
  "oc-FR": "Occitan",
  "pa-IN": "เจชเฉฐเจเจพเจฌเฉ",
  "pl-PL": "Polski",
  "pt-BR": "Portuguรชs Brasileiro",
  "pt-PT": "Portuguรชs",
  "ro-RO": "Romรขnฤ",
  "ru-RU": "ะ ัััะบะธะน",
  "si-LK": "เทเทเถเทเถฝ",
  "sk-SK": "Slovenฤina",
  "sv-SE": "Svenska",
  "ta-IN": "Tamil",
  "tr-TR": "Tรผrkรงe",
  "uk-UA": "ะฃะบัะฐัะฝััะบะฐ",
  "zh-CN": "็ฎไฝไธญๆ",
  "zh-HK": "็น้ซไธญๆ (้ฆๆธฏ)",
  "zh-TW": "็น้ซไธญๆ",
};

const percentages = fs.readFileSync(
  `${__dirname}/../src/locales/percentages.json`,
);
const rowData = JSON.parse(percentages);

const coverages = Object.entries(rowData)
  .sort(([, a], [, b]) => b - a)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

const boldIf = (text, condition) => (condition ? `**${text}**` : text);

const printHeader = () => {
  let result = "| | Flag | Locale | % |\n";
  result += "| :--: | :--: | -- | :--: |";
  return result;
};

const printRow = (id, locale, coverage) => {
  const isOver = coverage >= THRESSHOLD;
  let result = `| ${isOver ? id : "..."} | `;
  result += `${locale in flags ? flags[locale] : ""} | `;
  const language = locale in languages ? languages[locale] : locale;
  if (locale in crowdinMap && crowdinMap[locale]) {
    result += `[${boldIf(
      language,
      isOver,
    )}](https://crowdin.com/translate/excalidraw/10/${crowdinMap[locale]}) | `;
  } else {
    result += `${boldIf(language, isOver)} | `;
  }
  result += `${coverage === 100 ? "๐ฏ" : boldIf(coverage, isOver)} |`;
  return result;
};

console.info(
  `Each language must be at least **${THRESSHOLD}%** translated in order to appear on Excalidraw. Join us on [Crowdin](https://crowdin.com/project/excalidraw) and help us translate your own language. **Can't find yours yet?** Open an [issue](https://github.com/excalidraw/excalidraw/issues/new) and we'll add it to the list.`,
);
console.info("\n\r");
console.info(printHeader());
let index = 1;
for (const coverage in coverages) {
  if (coverage === "en") {
    continue;
  }
  console.info(printRow(index, coverage, coverages[coverage]));
  index++;
}
console.info("\n\r");
console.info("\\* Languages in **bold** are going to appear on production.");
