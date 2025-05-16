# UI Kit

Componentes reutilizables de UI en React + TypeScript con clases Tailwind.

> Este repositorio está diseñado para usarse como submódulo en proyectos que ya tienen configurado TailwindCSS.

## Uso

1. Agrega el subrepo:

// - bash
git submodule add https://github.com/Brujomix/my-ui-kit.git lib/ui-kit


2. repo Principal
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@my-ui-kit": ["lib/ui-kit/src/index.ts"],
      "@my-ui-kit/*": ["lib/ui-kit/src/*"]
    }
  }
}