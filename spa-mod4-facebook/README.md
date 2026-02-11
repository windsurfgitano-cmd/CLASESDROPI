# SPA Template Mastermind (React + Vite + GSAP + Three.js)

Listo para clonar por módulo (RELISIT, Facebook, Creativos, Campañas, Dropi). Incluye canvas con partículas y bloques básicos (Hero, Agenda, Demo, Tareas, Checklist, Quiz).

## Uso rápido
1) En `spa-template/`: `npm install --legacy-peer-deps`
2) Correr en local: `npm run dev` (puerto 5173).
3) Build: `npm run build`; preview: `npm run preview`.

## Duplicar para un módulo
- Copia la carpeta `spa-template` y renómbrala, ej. `spa-mod4-facebook`.
- En `src/App.tsx`, rellena textos con el contenido del `.md` del módulo (ya listo en `modX_*`).
- Ajusta colores/animaciones en `src/styles.css` y `App.tsx` según necesidad.

## Estructura
- `src/main.tsx`: entrypoint React.
- `src/App.tsx`: layout Hero + secciones (agenda, demo, tareas, checklist, quiz) y canvas Three.
- `src/styles.css`: estilo base, fondo animado y layout proyector (fuente 24–32px recomendado).
- `package.json`: scripts Vite (`dev`, `build`, `preview`).

## Contenido por módulo (referencia)
- Módulo 3 RELISIT: ver `mod3_relisit/spa_mod3_relisit.md`.
- Módulo 4 Facebook: ver `mod4_facebook/spa_mod4_facebook.md`.
- Módulo 5 Creativos: ver `mod5_creativos/spa_mod5_creativos.md`.
- Módulo 6 Campañas: ver `mod6_campanas/spa_mod6_campanas.md`.
- Módulo 7 Dropi Operación: ver `mod7_dropi/spa_mod7_dropi_operacion.md`.

## Notas
- Instalación usó `--legacy-peer-deps` para resolver peer de @react-three/fiber.
- Three mesh bvh muestra warning de deprecación; no afecta el template base.
- Ajusta CTA/botones y enlaces a videos/recursos en `App.tsx`.
