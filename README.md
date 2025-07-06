# EXATEC Perú Website

Este repositorio contiene el código fuente del sitio web oficial de la asociación de exalumnos EXATEC Perú.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web
- **TypeScript**: Superset de JavaScript con tipado estático
- **Tailwind CSS**: Framework de CSS para diseño rápido y responsivo
- **React**: Biblioteca para interfaces de usuario

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/yourusername/exatec_peru_site.git
cd exatec_peru_site
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

## Ejecución en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
bun dev
```

````

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Construir para producción

Para crear una versión optimizada para producción:

```bash
npm run build
# o
yarn build
````

Para ejecutar la versión de producción:

```bash
npm run start
# o
yarn start
```

## Estructura del proyecto

```
exatec_peru_site/
├── public/             # Archivos estáticos (imágenes, fuentes, etc.)
├── src/                # Código fuente
│   ├── app/            # Páginas de la aplicación (App Router de Next.js)
│   │   ├── directorio/ # Directorio Empresarial
│   │   ├── eventos/    # Calendario de Eventos
│   │   ├── mesa-directiva/ # Mesa Directiva
│   │   ├── quienes-somos/ # Quienes Somos (Misión y Visión)
│   │   ├── unete/      # Página para unirse a EXATEC Perú
│   │   └── ...         # Otras páginas
│   ├── components/     # Componentes reutilizables
│   │   ├── Footer.tsx  # Pie de página
│   │   ├── Navbar.tsx  # Barra de navegación
│   │   └── ...         # Otros componentes
└── ...                 # Archivos de configuración
```

## Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en Vercel. Para desplegar:

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una.
2. Conecta tu repositorio de GitHub a Vercel.
3. Configura el proyecto y despliégalo.

Alternativamente, puedes usar la CLI de Vercel:

```bash
npm i -g vercel
vercel login
vercel
```

## Personalización

### Colores

Los colores principales del sitio se definen en el archivo `tailwind.config.ts`:

- Primary: #0053c7 (Azul principal)
- Secondary: #f8f8f8 (Fondo secundario)
- Accent: #ffc72c (Color de acento)

### Imágenes

Reemplaza los placeholders de imágenes en la carpeta `public/` con las imágenes reales para cada sección.

## Contribución

1. Crea un fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

© 2025 EXATEC Perú. Todos los derechos reservados.
