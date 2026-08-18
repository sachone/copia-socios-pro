import footer from "@/content/footer.json";

/** Pie del sitio (plantilla de Elementor `elementor-location-footer`). */
export default function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: footer.html }} />;
}
