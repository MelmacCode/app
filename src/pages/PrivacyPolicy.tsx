import { SEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { ArrowLeft, Cookie, Shield, Eye, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Politica de Privacidad | La Taza Nomada"
        description="Politica de privacidad, cookies y proteccion de datos de La Taza Nomada."
        url="/privacidad"
      />

      <div className="content-max-width max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-nav text-sm mb-6 transition-colors hover:underline"
            style={{ color: "var(--taza-brown)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <h1 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "var(--taza-dark)" }}>
            Politica de Privacidad
          </h1>
          <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
            Ultima actualizacion: Junio 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-10">
          {/* Seccion 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6" style={{ color: "var(--taza-brown)" }} />
              <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                1. Responsable del tratamiento
              </h2>
            </div>
            <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
              La Taza Nomada es responsable del tratamiento de los datos personales recopilados a traves de este sitio web. Puedes contactarnos en hola@latazanomada.com para cualquier consulta sobre tus datos.
            </p>
          </section>

          {/* Seccion 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6" style={{ color: "var(--taza-brown)" }} />
              <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                2. Datos que recopilamos
              </h2>
            </div>
            <p className="font-body mb-4" style={{ color: "var(--taza-dark-light)" }}>
              Recopilamos los siguientes datos cuando interactuas con nuestra web:
            </p>
            <ul className="list-disc list-inside font-body space-y-2" style={{ color: "var(--taza-dark-light)" }}>
              <li>Nombre y correo electronico (a traves del formulario de contacto)</li>
              <li>Telefono y direccion (para pedidos por WhatsApp)</li>
              <li>Datos de navegacion (paginas visitadas, tiempo de sesion) via Google Analytics</li>
              <li>Preferencia de idioma (almacenada en localStorage)</li>
            </ul>
          </section>

          {/* Seccion 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6" style={{ color: "var(--taza-brown)" }} />
              <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                3. Uso de cookies
              </h2>
            </div>
            <p className="font-body mb-4" style={{ color: "var(--taza-dark-light)" }}>
              Utilizamos cookies para mejorar tu experiencia de navegacion. Las cookies que usamos son:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream-light)" }}>
                <h3 className="font-display text-lg mb-2" style={{ color: "var(--taza-dark)" }}>Cookies esenciales</h3>
                <p className="font-body text-sm" style={{ color: "var(--taza-dark-light)" }}>
                  Necesarias para el funcionamiento del sitio: carrito de compras, preferencia de idioma, estado del intro. No se pueden desactivar.
                </p>
              </div>
              <div className="p-4 rounded-lg border" style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream-light)" }}>
                <h3 className="font-display text-lg mb-2" style={{ color: "var(--taza-dark)" }}>Cookies analiticas</h3>
                <p className="font-body text-sm" style={{ color: "var(--taza-dark-light)" }}>
                  Google Analytics: nos ayudan a entender como usas la web para mejorarla. Puedes rechazarlas en el banner de cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Seccion 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" style={{ color: "var(--taza-brown)" }} />
              <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                4. Tus derechos
              </h2>
            </div>
            <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
              Tienes derecho a acceder, rectificar, limitar y suprimir tus datos. Para ejercer estos derechos, envianos un correo a hola@latazanomada.com con el asunto "Proteccion de datos".
            </p>
          </section>

          {/* Seccion 5 */}
          <section>
            <h2 className="font-display text-2xl mb-4" style={{ color: "var(--taza-dark)" }}>
              5. Cambios en esta politica
            </h2>
            <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
              Podemos actualizar esta politica ocasionalmente. Te notificaremos cualquier cambio significativo a traves del banner de cookies o por correo electronico si nos lo proporcionaste.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--taza-border)" }}>
          <p className="font-caption text-center" style={{ color: "var(--taza-dark-light)" }}>
            La Taza Nomada © 2026. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}