# 🧱 Plantilla Base - Node.js + TypeScript

Este repositorio sirve como punto de partida para proyectos desarrollados con Node.js y TypeScript. Incluye herramientas modernas como ESLint, Prettier, alias de importación, y recarga automática en desarrollo.

---

## 🚀 Tecnologías incluidas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ts-node](https://typestrong.org/ts-node/)
- [Nodemon](https://nodemon.io/)
- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
- [tsc-alias](https://www.npmjs.com/package/tsc-alias)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

    
## 📦 Scripts disponibles

| Script         | Comando                                           | Descripción                                           |
|----------------|---------------------------------------------------|-------------------------------------------------------|
| `dev`          | `npm run dev`                                     | Corre la app en modo desarrollo con recarga automática|
| `build`        | `npm run build`                                   | Compila el proyecto                                   |
| `start`        | `npm start`                                       | Ejecuta el código compilado en `/dist`                |
| `lint`         | `npm run lint`                                    | Analiza el código con ESLint                          |
| `format`       | `npm run format`                                  | Formatea el código con Prettier                       |

---

## 🗃 Estructura de carpetas recomendada

src/
├── index.ts
├── config/
├── utils/
├── services/
├── models/
├── controllers/

---

## 🛠️ Instalación

1. Cloná este repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo-base.git
cd tu-repo-base
```

2. Instalá dependencias:

```bash
npm install
```

3. Ejecuta en modo desarrollo:

```bash
npm run dev
```