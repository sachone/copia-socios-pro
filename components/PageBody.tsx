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

/** JSON seguro para incrustar dentro de un <script>: neutraliza "</script>". */
function safeJson(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export default function PageBody({ html, bodyClass, scripts }: Props) {
  return (
    <>
      {/* Aplica las clases de <body> ya en el primer pintado (sin parpadeo).
          JSON.stringify() no escapa "</script>": si `bodyClass` llegara a
          contenerlo (viene del scrape del original, ver tools/generar.py), el
          navegador cerraria el script ahi y lo que siguiera seria marcado. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.className=${safeJson(bodyClass)};`,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ElementorRuntime bodyClass={bodyClass} />
      {scripts?.length ? <WidgetScripts scripts={scripts} /> : null}
    </>
  );
}
