// Extraido de los widgets HTML de /planes-y-precios/ en el sitio original.
// Va en un fichero aparte porque el HTML se inyecta con innerHTML
// y los <script> insertados asi no se ejecutan.

const comparisonData = [
            {
                category: "Gestión de socios",
                items: [
                    ["Alta / baja de socios", true, true, true],
                    ["Importación de socios desde Excel", true, true, true],
                    ["Familias (titular para cobros)", true, true, true],
                    ["Cuotas", true, true, true],
                    ["Pagos pendientes", true, true, true],
                    ["Remesas SEPA (recibos domiciliados)", true, true, true]
                ]
            },
            {
                category: "Gestión económica",
                items: [
                    ["Partidas presupuestarias", true, true, true],
                    ["Proyectos", true, true, true],
                    ["Ingresos y gastos", true, true, true],
                    ["Previsiones", true, true, true]
                ]
            },
            {
                category: "Facturación (con o sin Verifactu)",
                items: [
                    ["Clientes y proveedores", true, true, true],
                    ["Facturas y rectificativas (clientes)", true, true, true],
                    ["Facturas y rectificativas (proveedores)", true, true, true]
                ]
            },
            {
                category: "Eventos",
                items: [
                    ["Eventos públicos y privados", true, true, true],
                    ["Inscripciones y tarifas", true, true, true],
                    ["Control de acceso por QR", true, true, true],
                    ["Control de acceso por NFC", false, true, true],
                    ["Control de asistencia", true, true, true],
                    ["Logística del evento", true, true, true]
                ]
            },
            {
                category: "Espacios",
                items: [
                    ["Configuración de espacios (local, salas)", true, true, true],
                    ["Tarifas", true, true, true],
                    ["Control de reservas de espacios", true, true, true]
                ]
            },
            {
                category: "Agenda",
                items: [
                    ["Agenda común para todos los socios", true, true, true],
                    ["Creación de citas o eventos", true, true, true],
                    ["Categorías", true, true, true],
                    ["Integración con iCal", true, true, true]
                ]
            },
            {
                category: "Loterías",
                items: [
                    ["Sorteos (diarios, mensuales, etc.)", true, true, true],
                    ["Configuración (papeletas, donativos)", true, true, true],
                    ["Control de lotería repartida / vendida", true, true, true],
                    ["Reparto de lotería a socios", true, true, true],
                    ["TPV de venta (socios y público)", true, true, true],
                    ["Beneficio de lotería", true, true, true],
                    ["Estadísticas (venta y reparto)", true, true, true]
                ]
            },
            {
                category: "Monedero",
                items: [
                    ["TPV venta en barra", false, true, true],
                    ["Venta a socio (QR/NFC) o anónima", false, true, true],
                    ["Arqueos de caja", false, true, true],
                    ["Configuración de productos", false, true, true],
                    ["Recarga a socios (dinero o bonos)", false, true, true]
                ]
            },
            {
                category: "Comunicaciones",
                items: [
                    ["Mails", true, true, true],
                    ["Notificaciones push", true, true, true]
                ]
            },
            {
                category: "Portal del socio (móvil)",
                items: [
                    ["Cuotas, pagos, eventos, reservas", true, true, true],
                    ["Carnet virtual del socio", true, true, true],
                    ["Datos personales", true, true, true]
                ]
            },
            {
                category: "Tesorería",
                items: [
                    ["Flujo de Caja", false, false, true],
                    ["Préstamos Bancarios", false, false, true],
                    ["Previsiones de Tesorería", false, false, true]
                ]
            },
            {
                category: "Informes financieros y ratios",
                items: [
                    ["Balance de Situación Financiero", false, false, true],
                    ["Cuenta de Pérdidas y Ganancias Financiero", false, false, true],
                    ["Fondos de Maniobra", false, false, true],
                    ["Necesidades Operativas de Fondos", false, false, true],
                    ["Periodos Medios", false, false, true],
                    ["Umbral de Rentabilidad", false, false, true],
                    ["Ratios Financieros", false, false, true]
                ]
            },
            {
                category: "Modelos de Hacienda",
                items: [
                    ["Modelo 111 - 190", false, false, true],
                    ["Modelo 115 - 180", false, false, true],
                    ["Modelo 130", false, false, true],
                    ["Modelo 303 - 390", false, false, true],
                    ["Modelo 340", false, false, true],
                    ["Modelo 347", false, false, true],
                    ["Modelo 349", false, false, true],
                    ["Modelo 415 (Canarias)", false, false, true],
                    ["Modelo 420 - 425 (Canarias)", false, false, true]
                ]
            },
            {
                category: "Contabilidad",
                items: [
                    ["Contabilización automática de facturas y gastos", false, false, true],
                    ["Contabilización automática de pagos y cobros", false, false, true],
                    ["Contabilización automática de nóminas", false, false, true],
                    ["Amortizaciones", false, false, true],
                    ["Libro Diario", false, false, true],
                    ["Balance de Sumas y Saldos", false, false, true],
                    ["Balance de Situación", false, false, true],
                    ["Cuenta de Pérdidas y Ganancias", false, false, true],
                    ["Generación de Libros para Registro Mercantil", false, false, true]
                ]
            }
        ];

        function checkIcon(mobile = false) {
            return `
                <svg class="${mobile ? 'h-5 w-5 text-green-500' : 'h-5 w-5 text-green-600'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
        }

        function crossIcon(mobile = false) {
            return `
                <svg class="${mobile ? 'h-5 w-5 text-red-500' : 'h-5 w-5 text-red-500'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        }

        function desktopStatusIcon(value) {
            return `
                <div class="flex justify-center">
                    <div class="${value ? 'bg-green-100' : 'bg-red-50'} rounded-full p-1 shadow-sm">
                        ${value ? checkIcon(false) : crossIcon(false)}
                    </div>
                </div>
            `;
        }

        function mobileStatusIcon(label, value) {
            return `
                <div class="flex items-center justify-between sm:justify-start">
                    <span class="text-gray-500 mr-2">${label}:</span>
                    ${value ? checkIcon(true) : crossIcon(true)}
                </div>
            `;
        }

        const mobileContainer = document.getElementById("mobile-comparison");
        const desktopContainer = document.getElementById("desktop-comparison");

        comparisonData.forEach((section, sectionIndex) => {
            const mobileSection = document.createElement("div");
            mobileSection.className = "bg-gray-50 rounded-lg p-6 border border-gray-100";

            mobileSection.innerHTML = `
                <h3 class="text-lg font-bold text-gray-900 mb-4 border-b pb-2 border-gray-200">${section.category}</h3>
                <div class="space-y-4">
                    ${section.items.map(item => `
                        <div class="flex flex-col space-y-2 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                            <p class="text-sm font-medium text-gray-700">${item[0]}</p>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                ${mobileStatusIcon("Gestión", item[1])}
                                ${mobileStatusIcon("Wallet", item[2])}
                                ${mobileStatusIcon("Fiscal", item[3])}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;

            mobileContainer.appendChild(mobileSection);

            const desktopSection = document.createElement("div");
            desktopSection.className = sectionIndex === 0
                ? "mt-8 border-t border-gray-100 pt-8 first:mt-0 first:border-0 first:pt-0"
                : "mt-8 border-t border-gray-100 pt-8";

            desktopSection.innerHTML = `
                <h3 class="text-lg font-bold text-gray-900 bg-gray-50 px-6 py-3 rounded-md mb-4 inline-block">${section.category}</h3>
                <div class="space-y-4">
                    ${section.items.map((item, itemIndex) => `
                        <div class="grid grid-cols-5 gap-4 px-6 py-3 items-center rounded-lg ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                            <div class="col-span-2 text-sm text-gray-700 font-medium">${item[0]}</div>
                            ${desktopStatusIcon(item[1])}
                            ${desktopStatusIcon(item[2])}
                            ${desktopStatusIcon(item[3])}
                        </div>
                    `).join("")}
                </div>
            `;

            desktopContainer.appendChild(desktopSection);
        });