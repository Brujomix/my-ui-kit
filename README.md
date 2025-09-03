# UI Kit

Componentes reutilizables de UI en React + TypeScript con clases Tailwind.

> Este repositorio está diseñado para usarse como submódulo en proyectos que ya tienen configurado TailwindCSS.

## Uso

1. Agrega el subrepo:

```bash
  git submodule add https://github.com/Brujomix/my-ui-kit.git 
```

2. En Repositorio Principal agrega estas lines en tsconfig.json

```json
  "baseUrl": ".",
  "paths": {
    "@my-ui-kit": ["/my-ui-kit"]
  }
```

3. Una Vez instalado e inicializado tailwind anñade estas lineas a tailwindconfig.js

   ```js
   import uiKitTailwindPreset from "./my-ui-kit/tailwind-config.js"

   /** @type {import('tailwindcss').Config} */
   module.exports = {
     presets:[uiKitTailwindPreset],
     content: [
       './app/**/*.{ts,tsx}',

       // Ruta a tu submódulo UI Kit:
       './ui-kit/**/*.{ts,tsx,js,jsx}', ✔ esta línea a la ruta de submodule

     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. En Layout principal de la app importar y renderizar;
```js
  import "@my-ui-kit/main.css";
  import { GlobalModalManager, Toast_Container } from "@/my-ui-kit";

  return (
    <html lang="en">
        <body>
          <main>
            {children}
            <GlobalModalManager/>
            <Toast_Container/>
          </main>
        </body>
    </html>
  );
```

5. En App anfitrion instalar dependecias:

```bash
  pnpm i react-toastify
```

6. Los Modales Renderizados en RenderModal se definen en App Anfitrion y se importan
los componentes TSX en REnderModals.tsx para ser evaluados y mostrados por redux
