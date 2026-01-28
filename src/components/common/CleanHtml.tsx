import DOMPurify from "dompurify";

export default function CleanHtml ({ html, loading }: { html: string | Node | undefined, loading: boolean }) {
  
  if(loading || !html) return <>loading...</>//스피너 있으면 좋을듯

  const cleanHtml = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
}