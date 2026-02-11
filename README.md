# CLASESDROPI — Mastermind Dropshipping

5 SPAs interactivas para clase presencial con proyector. Cada SPA es una **clase completa** de scroll (top → bottom) con animaciones, imágenes, videos embebidos, checklists interactivos y quizzes.

## Módulos

| SPA | Tema | Color | Puerto dev |
|-----|------|-------|------------|
| `spa-mod3-relisit` | RELISIT: panel, config, pedido de prueba | Cyan / Teal | 5173 |
| `spa-mod4-facebook` | Fan page, BM, 2FA, dominio, Shopify | Azul Meta / Violeta | 5174 |
| `spa-mod5-creativos` | Hook, AIDA, storyboard, grabado, marca | Magenta / Naranja | 5175 |
| `spa-mod6-campanas` | ABO vs CBO, 3 públicos, píxel, métricas | Verde / Amarillo | 5176 |
| `spa-mod7-dropi` | Etapas pedido, etiquetas, incidencias, retiro | Coral / Dorado | 5177 |

## Stack

- React 18.2.0 + TypeScript
- Vite 5
- Three.js (partículas hero) via @react-three/fiber + drei
- GSAP (animaciones scroll)
- CSS custom properties por módulo

## Levantar un módulo

```bash
cd spa-mod3-relisit   # o cualquier spa-mod*
npm install --legacy-peer-deps
npm run dev
```

## Build producción

```bash
npm run build   # genera dist/
```

## Deploy en Vercel

Cada SPA se despliega como proyecto independiente:

1. Importar repo en Vercel
2. **Root Directory**: `spa-mod3-relisit` (o el módulo deseado)
3. **Framework Preset**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install --legacy-peer-deps`

Repetir para cada módulo como proyecto separado.

## Videos del curso (locales)

Los videos MP4 del Mastermind NO están en el repo (son muy pesados). Cada SPA referencia los archivos locales con el componente `local-video-ref`. Abrir desde la carpeta `Mastermind/` en el PC del instructor.

## Estructura

```
CLASESDROPI/
├── spa-mod3-relisit/     # SPA React clase módulo 3
├── spa-mod4-facebook/    # SPA React clase módulo 4
├── spa-mod5-creativos/   # SPA React clase módulo 5
├── spa-mod6-campanas/    # SPA React clase módulo 6
├── spa-mod7-dropi/       # SPA React clase módulo 7
├── mod3_relisit/         # Markdown + guion clase
├── mod4_facebook/        # Markdown + guion clase
├── mod5_creativos/       # Markdown + guion clase
├── mod6_campanas/        # Markdown + guion clase
├── mod7_dropi/           # Markdown + guion clase
├── Mastermind/           # Videos curso (NO en repo, .gitignore)
└── *.md                  # Agenda, checklists, reto 72h
```
