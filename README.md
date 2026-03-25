<div align="center">

# 🌉 Bridge Markets — Partner Dashboard

**Portal de afiliados premium para gestión de campañas, materiales de marketing, comisiones y conversiones.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)]()

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Módulos del Dashboard](#-módulos-del-dashboard)
- [API Endpoints](#-api-endpoints)
- [Sistema de Subdominios](#-sistema-de-subdominios)
- [Internacionalización (i18n)](#-internacionalización-i18n)
- [Componentes Reutilizables](#-componentes-reutilizables)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)

---

## 🎯 Descripción General

**Bridge Markets Partner Dashboard** es un portal web de alta calidad diseñado para que los afiliados (partners) del broker **Bridge Markets** puedan gestionar todos los aspectos de su programa de afiliación desde un único lugar. 

El dashboard ofrece una experiencia visual premium con efectos 3D, animaciones fluidas y una interfaz moderna que permite a los partners:

- Visualizar métricas de rendimiento en tiempo real
- Gestionar materiales de marketing multilingüe
- Administrar links de tracking y campañas
- Consultar comisiones, pagos y conversiones
- Generar landing pages personalizadas

El sistema también incluye una **vista de administrador** que permite a los gestores de la plataforma supervisar métricas globales del programa de afiliados.

---

## ✨ Características Principales

| Característica | Descripción |
|---|---|
| 🔐 **Login Premium 3D** | Página de inicio de sesión con fondo animado Vanta.js (waves), efecto parallax 3D en la tarjeta de login y transiciones cinematográficas |
| 📊 **Dashboard Overview** | Panel con KPIs principales, gráfico de rendimiento semanal, canales de adquisición, distribución geográfica y dispositivos |
| 🎨 **Materiales de Marketing** | Galería de banners, videos, landing pages y widgets HTML con filtros por categoría |
| 🔗 **Gestión de Links** | Tabla de links de tracking con nombre, URL, clicks, conversiones, estado y funcionalidad de copiado rápido |
| 💰 **Comisiones y Pagos** | Balance disponible, pendiente y total retirado. Historial completo de pagos con métodos (transferencia bancaria, USDT) |
| 📈 **Reporte de Conversiones** | Registro detallado con filtros avanzados (fecha, campaña, estado), KPIs y estados (Aprobado/Pendiente/Rechazado) |
| 🌐 **Landing Page Generator** | Formulario estilo Typeform para crear y desplegar landing pages personalizadas para captura de leads |
| 🔄 **Vista Dual (Partner/Admin)** | Toggle para alternar entre vista de partner individual y vista de administrador global |
| 🌍 **Multilingüe** | Soporte para Español (ES), Inglés (EN) y Portugués (PT) en los materiales de marketing |
| 📱 **Responsive** | Diseño adaptativo para Desktop y dispositivos móviles |

---

## 🛠 Stack Tecnológico

### Core
| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 14.2.15 | Framework de React con SSR, routing y API routes |
| **React** | 18 | Librería de UI con hooks y componentes funcionales |
| **TypeScript** | 5 | Tipado estático para desarrollo robusto |

### Estilos y UI
| Tecnología | Versión | Uso |
|---|---|---|
| **TailwindCSS** | 3.4.1 | Framework de CSS utilitario |
| **Framer Motion** | 11.11.1 | Animaciones declarativas para React |
| **Lucide React** | 0.453.0 | Iconografía moderna y consistente |

### Efectos Visuales
| Tecnología | Uso |
|---|---|
| **Vanta.js (Waves)** | Fondo 3D animado interactivo en la página de login |
| **Three.js** (r134) | Motor 3D requerido por Vanta.js |
| **React Parallax Tilt** | Efecto de inclinación 3D en componentes |

---

## 🏗 Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────┐
│                    MIDDLEWARE                             │
│         (Redirección por subdominios de afiliados)        │
└───────────────────────┬─────────────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
    ┌────▼────┐   ┌─────▼─────┐  ┌────▼──────┐
    │  Login  │   │ Dashboard │  │  Affiliate│
    │  Page   │   │  (Portal) │  │   Embed   │
    │   (/)   │   │(/dashboard│  │(/[affId]) │
    └─────────┘   └─────┬─────┘  └───────────┘
                        │
         ┌──────────────┼──────────────────────┐
         │              │              │        │
    ┌────▼────┐   ┌─────▼─────┐ ┌─────▼──┐ ┌──▼─────┐
    │Overview │   │Materiales │ │  Links  │ │Landing │
    │         │   │           │ │         │ │  Pages │
    └─────────┘   └───────────┘ └─────────┘ └────────┘
         │
    ┌────▼────────────────────┐
    │  Comisiones │ Convers.  │
    └─────────────────────────┘
```

---

## ⚡ Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x (o **yarn** / **pnpm**)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/gestionscallaai-max/Bridge-Markets.git

# 2. Navegar al directorio del proyecto
cd Bridge-Markets

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Credenciales de Demo

| Campo | Valor |
|---|---|
| **Email** | `partner@bridgemarkets.com` |
| **Password** | `demo123` |

> ⚠️ **Nota**: Actualmente el login usa credenciales demo hardcodeadas. En producción se debe integrar con un sistema de autenticación real (NextAuth.js, Supabase Auth, etc.).

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| **Dev** | `npm run dev` | Inicia el servidor de desarrollo en `localhost:3000` |
| **Build** | `npm run build` | Genera la build de producción optimizada |
| **Start** | `npm run start` | Inicia el servidor de producción |
| **Lint** | `npm run lint` | Ejecuta ESLint para verificar calidad del código |

---

## 📁 Estructura de Carpetas

```
partner-dashboard/
├── app/                          # App Router de Next.js 14
│   ├── layout.tsx                # Layout raíz (metadata, fuente Inter)
│   ├── page.tsx                  # Página de Login (Vanta.js 3D)
│   ├── globals.css               # Estilos globales
│   │
│   ├── [affiliateId]/            # Ruta dinámica para subdominios de afiliados
│   │   └── embed/                # Vista embebida del afiliado
│   │
│   ├── api/                      # API Routes
│   │   ├── landing/
│   │   │   └── deploy/route.ts   # Endpoint para desplegar landing pages
│   │   └── materials/
│   │       └── download/route.ts # Endpoint para descarga de materiales
│   │
│   └── dashboard/                # Sección principal del dashboard
│       ├── layout.tsx            # Layout del dashboard (sidebar + topbar)
│       ├── page.tsx              # Materiales de marketing (vista principal)
│       ├── overview/page.tsx     # Panel de métricas y estadísticas
│       ├── links/page.tsx        # Gestión de links de tracking
│       ├── landing/page.tsx      # Generador de landing pages
│       ├── commissions/page.tsx  # Comisiones y pagos
│       └── conversions/page.tsx  # Reporte de conversiones
│
├── components/                   # Componentes React reutilizables
│   ├── Assets/
│   │   └── AssetCard.tsx         # Tarjeta de material de marketing
│   ├── Filters/
│   │   └── FilterBar.tsx         # Barra de filtros
│   ├── Forms/
│   │   ├── ImageDownloadForm.tsx  # Formulario de descarga de imágenes
│   │   └── LandingTypeform.tsx    # Formulario tipo Typeform para landing pages
│   ├── Layout/
│   │   └── DashboardLayout.tsx    # Componente de layout del dashboard
│   └── Modals/
│       └── CodeGeneratorModal.tsx # Modal generador de código embed
│
├── lib/                          # Utilidades y datos
│   ├── data/
│   │   └── locales.ts            # Datos multilingüe de assets (ES/EN/PT)
│   └── utils.ts                  # Funciones utilitarias
│
├── middleware.ts                 # Middleware de Next.js (redirección subdominios)
├── next.config.mjs              # Configuración de Next.js
├── tailwind.config.ts           # Configuración de TailwindCSS
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias y scripts
```

---

## 📑 Módulos del Dashboard

### 1. 🔐 Login (`/`)
Página de autenticación con:
- **Fondo 3D interactivo** con Vanta.js (efecto de ondas púrpuras)
- **Tarjeta de login con parallax 3D** que sigue el movimiento del mouse
- **Animación de transición** cinematográfica al autenticarse
- Campos: email y contraseña

### 2. 📊 Overview (`/dashboard/overview`)
Panel principal de métricas con vistas diferenciadas:

**Vista Partner:**
- Usuarios Totales, Sesiones Activas, Descargas de Material, Workspaces Creados
- Gráfico de barras: Nuevos Usuarios Registrados (últimos 7 días)
- Canales de Adquisición (Orgánico, Referidos, Redes Sociales)
- Top Países (España, México, Colombia, Argentina)
- Distribución por dispositivos (Desktop/Mobile)

**Vista Admin:**
- Partners Totales, Comisiones Pagadas, Volumen de Trading, Nuevas Cuentas FTD
- Gráfico de barras: Ingresos Consolidados Netos (USD)
- Distribución de Ingresos por tipo de partner
- Mercados Principales (Brasil, España, México, Chile)

### 3. 🎨 Materiales (`/dashboard`)
Galería de recursos de marketing:
- **Pestañas**: Todos, Banners, Landing Pages, Videos, Widgets HTML
- **AssetCards** con preview, información del recurso y acciones
- **CodeGeneratorModal**: genera código embed personalizado con el ID del afiliado
- **ImageDownloadForm**: servicio de descarga de imágenes en alta resolución

### 4. 🔗 Links de Tracking (`/dashboard/links`)
- Tabla de links con: nombre, URL, clicks, conversiones, estado, fecha
- **Copiar URL al portapapeles** con un clic
- Búsqueda y filtros
- Crear nuevos links de tracking
- Paginación

### 5. 💰 Comisiones (`/dashboard/commissions`)
- **Balance Disponible**: tarjeta premium con gradiente oscuro
- **Balance Pendiente**: con countdown de liberación
- **Total Retirado**: acumulado histórico
- **Historial de Pagos**: tabla con ID, fecha, método (Transferencia/USDT), referencia, estado, monto
- Botón de solicitud de retiro

### 6. 📈 Conversiones (`/dashboard/conversions`)
- Filtros avanzados: búsqueda, fecha, campaña, estado
- **KPI Strip**: Total Conversiones, Aprobadas, Pendientes, Rechazadas
- Tabla detallada: ID, fecha/hora, campaña, tipo (CPA/RevShare/CPL), comisión, estado
- Exportar a CSV
- Paginación

### 7. 🌐 Landing Pages (`/dashboard/landing`)
- Generador de landing pages estilo Typeform
- Formulario paso a paso para personalizar la landing
- Deploy automático via API

---

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/landing/deploy` | Despliega una landing page generada por el usuario |
| `GET/POST` | `/api/materials/download` | Descarga materiales de marketing (banners, imágenes) |

---

## 🌐 Sistema de Subdominios

El middleware de Next.js (`middleware.ts`) implementa un sistema de redirección por subdominios para identificar afiliados:

```
{affiliateId}.bridgemarkets.com  →  /{affiliateId}/...
BM_10940382.bridgemarkets.com    →  /BM_10940382/embed
```

**Lógica:**
1. Extrae el subdominio de la URL
2. Si existe un subdominio válido (no `www`), reescribe la URL a la ruta dinámica `[affiliateId]`
3. Compatible con localhost para desarrollo local

---

## 🌍 Internacionalización (i18n)

Los materiales de marketing soportan 3 idiomas definidos en `lib/data/locales.ts`:

| Código | Idioma |
|---|---|
| `ES` | Español |
| `EN` | Inglés |
| `PT` | Portugués |

Cada asset incluye traducciones localizadas de título y CTA:

```typescript
type LocaleLanguage = 'ES' | 'EN' | 'PT';

interface AssetData {
    id: string;
    type: string;        // Banner, Video, Widget, etc.
    instrument: string;  // Cripto, Forex, Metales, Índices
    size: string;        // 300x250, 728x90, etc.
    badge?: 'cr' | 'new';
    locales: Record<LocaleLanguage, { title: string; cta: string }>;
}
```

---

## 🧩 Componentes Reutilizables

| Componente | Ubicación | Descripción |
|---|---|---|
| `AssetCard` | `components/Assets/` | Tarjeta visual para materiales de marketing con gradiente, badge y acciones |
| `FilterBar` | `components/Filters/` | Barra de filtros genérica con opciones configurables |
| `ImageDownloadForm` | `components/Forms/` | Formulario para descarga de imágenes con preview y opciones |
| `LandingTypeform` | `components/Forms/` | Formulario multi-step estilo Typeform para creación de landing pages |
| `DashboardLayout` | `components/Layout/` | Layout base del dashboard con sidebar y topbar |
| `CodeGeneratorModal` | `components/Modals/` | Modal que genera código HTML embed personalizado con el affiliate ID |

---

## 🗺 Roadmap

- [ ] 🔐 Integración con sistema de autenticación real (NextAuth / Supabase)
- [ ] 📡 Conexión con backend/API real para datos dinámicos
- [ ] 💾 Persistencia de datos en base de datos (Supabase / PostgreSQL)
- [ ] 📊 Gráficos interactivos con Recharts o Chart.js
- [ ] 🔔 Sistema de notificaciones en tiempo real
- [ ] 📱 Versión PWA (Progressive Web App)
- [ ] 🌙 Modo oscuro
- [ ] 📧 Integración con email marketing
- [ ] 🏷 Sistema de etiquetas y organización de campañas

---

## 🤝 Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m "feat: agregar nueva funcionalidad"`
4. Haz push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Convenciones de Commits

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Cambios en documentación
style:    Cambios de formato (no afectan lógica)
refactor: Refactorización de código
test:     Agregar o modificar tests
chore:    Tareas de mantenimiento
```

---

<div align="center">

**Bridge Markets © 2024 — Todos los derechos reservados**

Hecho con ❤️ por el equipo de Bridge Markets

</div>
