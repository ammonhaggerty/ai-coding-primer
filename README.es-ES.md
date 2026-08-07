

# Introducción al Desarrollo Full-Stack de Productos con IA

Una guía y kit de inicio de código abierto para construir productos reales con Claude Code y Cloudflare — escrita para diseñadores, fundadores, gerentes de producto (PMs), investigadores, aficionados y cualquier persona con ideas que se haya visto frenada por la barrera técnica.

[![AI Coding Primer Onboarding Video](https://github.com/user-attachments/assets/0a621b86-f898-487f-ac7d-d34a6c6aa3cc)](https://youtu.be/KPAlZ3Oni1A)
*☝️ Este video recorre todo el proceso de incorporación y el proyecto de ejemplo*

Quiero ser claro: lo que comparto es altamente técnico y las ideas expuestas me han llevado años aprender y comprender. Lo que ha cambiado es que Claude, como asistente, resolutor de problemas y guía, te permite navegar casi cualquier obstáculo que se te presente. Intenté hacer el proceso de incorporación lo más simple posible, pero mi primera prueba fue un completo fracaso; sin embargo, Claude fue capaz de identificar y corregir cada problema. Una vez que tengas Claude en ejecución, simplemente pide ayuda en cualquier paso. 

---

> ### 🔄 Actualizado en julio de 2026
>
> La guía se ha renovado para mantener actualizados todos los modelos, precios, comandos y versiones. Novedades:
>
> - **Modelos:** ahora se centra en **Claude Opus 4.8** (para código) y **Sonnet 5**; el apéndice de precios de API añade **Fable 5** y el precio de introducción de Sonnet 5.
> - **Instalación:** Claude Code ahora utiliza el **instalador nativo** (`curl … | bash` / PowerShell), manteniendo npm como alternativa.
> - **Nuevas directrices:** configura **Esfuerzo medio** para la mayoría del código (más rápido, menos tokens) y usa **`/compact` entre tareas principales** para mantener las sesiones rápidas y económicas.
> - **Referencia de Claude Code:** se corrigieron las listas de comandos con barra diagonal y atajos de teclado para que coincidan con la versión actual de Claude Code.
> - **Cloudflare:** la plantilla de inicio migrada a **`wrangler.jsonc`** (formato recomendado por Cloudflare); se actualizaron los límites del nivel gratuito, los modelos de Workers AI (Llama 4, FLUX.2) y los precios de Vectorize.
> - **Terceros:** actualizados el modelo de imágenes de Google y los precios de Deepgram/Cartesia.
>
> Registro completo de cambios: [`docs/2026-07-refresh-findings.md`](docs/2026-07-refresh-findings.md).

---

## Comienza a Leer

**[Leer la guía →](guidebook/)**

O salta directamente a la [Ruta Rápida TL;DR](guidebook/00-tldr.md) si quieres empezar a construir ahora mismo.

## Contenido

```
ai-coding-primer/
├── guidebook/       # La guía — un capítulo por archivo, léela como un libro
├── starter/         # Plantilla del proyecto de inicio (lo que clonarás)
├── assets/          # Imágenes y diagramas
├── docs/            # Notas de trabajo y planes (memoria del proyecto)
└── _authoring/      # Materiales editoriales (esquemas, investigación, notas)
```

## La Guía

| # | Capítulo | Descripción |
|---|---------|-------------|
| 00 | [TL;DR](guidebook/00-tldr.md) | Siete pasos para una aplicación desplegada |
| 01 | [Acerca del Autor](guidebook/01-about-the-author.md) | Quién escribió esto y por qué |
| 02 | [El Panorama](guidebook/02-the-landscape.md) | Qué ha cambiado y el modelo mental |
| 03 | [Configuración](guidebook/03-setting-up.md) | Instalando tu entorno de trabajo |
| 04 | [La Nube](guidebook/04-the-cloud.md) | Cloudflare y tu primer despliegue |
| 05 | [Construcción](guidebook/05-building.md) | Tu primera funcionalidad, de principio a fin |
| 06 | [Práctica Diaria](guidebook/06-daily-practice.md) | El ritmo continuo de desarrollo |
| 07 | [Hacia Dónde Vamos](guidebook/07-where-this-is-going.md) | Qué viene después |
| 08 | [Apéndices](guidebook/08-appendices.md) | Características de Claude Code, modelos y precios de IA, nivel gratuito de Cloudflare, enlaces, glosario y solución de problemas |

## El Stack

Esta guía enseña un stack específico y con opiniones marcadas:

- **Claude Code** (Opus 4.8) — Tu compañero de código IA, en la terminal
- **Cloudflare Workers** — Donde se ejecuta tu código (el nivel gratuito te lleva muy lejos)
- **Hono** — Framework web para el edge
- **Tailwind + DaisyUI** — Estilos sin escribir CSS
- **HTMX + Alpine.js** — Interactividad sin un framework
- **D1** — Base de datos SQLite, configuración cero
- **R2** — Almacenamiento de archivos, cero tarifas de salida
- **Vectorize** — Base de datos vectorial para búsqueda inteligente y RAG

## Estado

La guía, el complemento `a-primer-skills` y la plantilla de inicio están en línea y en uso activo. El contenido se mantiene actualizado a medida que evolucionan las herramientas: consulta `docs/` para las notas de actualización recientes. Se agradecen correcciones y contribuciones.

## Contribuir

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para saber cómo ayudar, desde corregir erratas hasta sugerir nuevo contenido.

## Licencia

[MIT](LICENSE) — Úsalo, compártelo, construye sobre él.
