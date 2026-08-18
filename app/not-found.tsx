import Link from "next/link";

export default function NotFound() {
  return (
    <div id="content" className="site-content">
      <div className="ast-container">
        <div id="primary" className="content-area primary">
          <main id="main" className="site-main" style={{ padding: "80px 0", textAlign: "center" }}>
            <h1>Página no encontrada</h1>
            <p>La página que buscas no existe o ha cambiado de dirección.</p>
            <p>
              <Link href="/">Volver al inicio</Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}
