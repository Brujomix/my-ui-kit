# UI Kit

Componentes reutilizables de UI en React + TypeScript con clases Tailwind.

> Este repositorio está diseñado para usarse como submódulo en proyectos que ya tienen configurado TailwindCSS.

## Uso

1. Agrega el subrepo:

// - bash
git submodule add https://github.com/Brujomix/my-ui-kit.git lib/ui-kit


2. En Repositorio Principal agrega estas lines en tsconfig.json

    "baseUrl": ".",
    "paths": {
      "@my-ui-kit": ["lib/ui-kit/src/index.ts"],
      "@my-ui-kit/*": ["lib/ui-kit/src/*"]
    }

3. Una Vez instalado e inicializado tailwind anñade estas lineas a tailwindconfig.js

import uiKitTailwindPreset from "./lib/ui-kit/tailwind.preset.js"

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets:[uiKitTailwindPreset],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',

    // Ruta a tu submódulo UI Kit:
    './lib/ui-kit/src/**/*.{ts,tsx,js,jsx}', ✔ esta línea a la ruta de submodule

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}