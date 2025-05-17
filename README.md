# UI Kit

Componentes reutilizables de UI en React + TypeScript con clases Tailwind.

> Este repositorio está diseñado para usarse como submódulo en proyectos que ya tienen configurado TailwindCSS.

## Uso

1. Agrega el subrepo:

   ```bash

   git submodule add https://github.com/Brujomix/my-ui-kit.git lib/ui-kit

   ```

2. En Repositorio Principal agrega estas lines en tsconfig.json

```json
  "baseUrl": ".",
  "paths": {
    "@my-ui-kit": ["lib/ui-kit/src/index.ts"],
    "@my-ui-kit/*": ["lib/ui-kit/*"]
  }
```

3. Una Vez instalado e inicializado tailwind anñade estas lineas a tailwindconfig.js

   ```js
   import uiKitTailwindPreset from "./lib/ui-kit/tailwind.preset.js"

   /** @type {import('tailwindcss').Config} */
   module.exports = {
     presets:[uiKitTailwindPreset],
     content: [
       './app/**/*.{ts,tsx}',

       // Ruta a tu submódulo UI Kit:
       './lib/ui-kit/**/*.{ts,tsx,js,jsx}', ✔ esta línea a la ruta de submodule

     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. En Layout principal de la app importar;
```js
  import "@my-ui-kit/global.css";
  import { ProviderRedux } from "@my-ui-kit/redux";
```

5. En App anfitrion instalar dependecias:

```bash
  pnpm install @reduxjs/toolkit react-redux
```
