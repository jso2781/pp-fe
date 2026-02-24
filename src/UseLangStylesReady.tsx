import { useEffect, useRef, useState } from "react";
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
  const [ready, setReady] = useState(false);
  const loaded = useRef(new Set<string>());

  useEffect(() => {
    const pathLang = getLangFromPathname(window.location.pathname);
    const lang = pathLang ?? normalize(i18n.language);

    // URL 언어를 우선 동기화 (/pp/en 직접 진입 시 ko css 선로딩 방지)
    if (pathLang && normalize(i18n.language) !== pathLang) {
      i18n.changeLanguage(pathLang);
    }

    // html lang도 같이 변경
    document.documentElement.lang = lang;

    // 이미 로드했으면 다시 import 하지 않음
    if(loaded.current.has(lang)){
      setReady(true);
      return;
    }

    setReady(false);

    // ✅ 언어별 scss 동적 로드
    const p = lang === "en" ? import("@/styles/main.en.scss") : import("@/styles/main.ko.scss");

    p.then(() => {
      loaded.current.add(lang);
      setReady(true);
    });

  }, [i18n.language]);

  console.log("UseLangStylesReady i18n.language="+i18n.language+", ready="+ready);

  return ready;
}