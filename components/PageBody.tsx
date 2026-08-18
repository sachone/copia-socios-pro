import ElementorRuntime from "./ElementorRuntime";
import WidgetScripts from "./WidgetScripts";

type Props = {
  /** HTML de la pagina, tal cual lo genera WordPress + Elementor. */
  html: string;
  /** Clases que el original pone en <body> para esta pagina. */
  bodyClass: string;
  /** JS que traian incrustado los widgets HTML de esta pagina. */
  scripts?: string[];
};

export default function PageBody({ html, bodyClass, scripts }: Props) {
  return (
    <>
      {/* Aplica las clases de <body> ya en el primer pintado (sin parpadeo). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.className=${JSON.stringify(bodyClass)};`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ElementorRuntime bodyClass={bodyClass} />
      {scripts?.length ? <WidgetScripts scripts={scripts} /> : null}
    </>
  );
}
