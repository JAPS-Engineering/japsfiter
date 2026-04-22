# JAPSfiter Landing

Landing/demo interactiva de gasfiteria construida como SPA ligera con React en navegador (sin bundler ni build step).

## Descripcion

Este repositorio contiene una demo funcional orientada a conversion para servicios de gasfiteria en Chile. Incluye:

- Home comercial con propuesta de valor y cobertura.
- Cotizador dinamico por tipo de servicio.
- Flujo de agendamiento embebido.
- Seccion "Nosotros" para presentar a JAPS Engineering.
- Boton flotante de WhatsApp.
- Chat de diagnostico con IA (con fallback si no hay proveedor conectado).

## Stack Tecnologico

- HTML5 + CSS3 + JavaScript.
- React 18 (UMD via CDN).
- ReactDOM 18 (UMD via CDN).
- Babel Standalone para transpilar JSX en el navegador.

No requiere `npm install` ni herramientas de build para correr en local.

## Estructura Del Proyecto

```text
.
├── index.html
├── styles.css
├── components/
│   ├── shared.jsx
│   ├── home.jsx
│   ├── services.jsx
│   ├── agendar.jsx
│   └── nosotros.jsx
├── static/
├── design-canvas.jsx
└── Japsfiter Landing.html
```

### Archivos principales

- `index.html`: entrypoint, carga React/Babel y monta la app.
- `styles.css`: tokens visuales, layout, componentes y responsive.
- `components/shared.jsx`: componentes compartidos (nav, footer, iconos, chat IA, botones flotantes).
- `components/home.jsx`: vista de inicio.
- `components/services.jsx`: vista de servicios + cotizador.
- `components/agendar.jsx`: vista de agenda y widget embebido.
- `components/nosotros.jsx`: vista corporativa de JAPS.
- `static/`: imagenes y recursos estaticos.

## Como Ejecutar En Local

### Opcion recomendada (servidor local)

```bash
cd japsfiter
python3 -m http.server 5173
```

Luego abre:

```text
http://localhost:5173
```

### Opcion directa

Tambien puedes abrir `index.html` en el navegador, pero para integraciones externas y comportamiento consistente de rutas se recomienda usar servidor local.

## Navegacion

La app maneja rutas SPA con History API:

- `/`
- `/servicios`
- `/agendar`
- `/nosotros`

Nota: si haces refresh en rutas internas, tu servidor debe resolver fallback a `index.html`.

## Personalizacion Rapida

En `index.html` existe un objeto de configuracion inicial (`TWEAK_DEFAULTS`) para ajustar direccion visual y color de acento.

Tambien hay un panel de ajustes en modo edicion para alternar variantes de UI y revisar vistas.

## Integraciones

- **Agendamiento**: iframe + script desde `api.one.japs.ing`.
- **Chat IA**: usa `window.claude.complete(...)` si esta disponible en runtime.
- **WhatsApp**: enlace directo con mensaje predefinido.

## Consideraciones Tecnicas

- Se necesita conexion a internet para CDNs (React/Babel) e integraciones externas.
- Babel en navegador es ideal para demo/prototipo, no para produccion de alto trafico.
- Para despliegue productivo, conviene migrar a build con Vite/Next y assets versionados.

## Licencia

Uso interno/demo. Define una licencia explicita antes de distribuir o publicar.
