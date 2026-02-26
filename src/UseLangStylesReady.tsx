import { useEffect } from "react";
import i18n from "@/i18n/i18n";

function normalize(lang?: string) {
  const base = (lang ?? "ko").toLowerCase().split("-")[0];
  return base === "en" ? "en" : "ko";
}

function getLangFromPathname(pathname: string): "ko" | "en" | null {
  const segs = pathname.split("/");
  const candidate = segs[1] === "pp" ? segs[2] : segs[1];
  if (candidate === "ko" || candidate === "en") return candidate;
  return null;
}

export default function UseLangStylesReady() {
  useEffect(() => {
    const pathLang = getLangFromPathname(window.location.pathname);
    const lang = pathLang ?? normalize(i18n.language);

    // URL 언어를 우선 동기화 (/pp/en 직접 진입 시 ko css 선로딩 방지)
    if (pathLang && normalize(i18n.language) !== pathLang) {
      i18n.changeLanguage(pathLang);
    }

    // html lang도 같이 변경
    document.documentElement.lang = lang;

  }, [i18n.language]);

  return true;
}
