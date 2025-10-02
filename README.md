# 🐲 Sagas Z Builder

![Angular](https://img.shields.io/badge/Angular-20.3-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Status](https://img.shields.io/badge/Status-Active-green.svg)

**Constructor de ejércitos moderno para el juego de mesa Sagas Z**, desarrollado con Angular 18+ y Angular Signals para una experiencia de usuario fluida y reactiva.

## 🎯 Características Principales

### ⚡ **Gestión de Estado Reactiva**

- **Angular Signals** para un estado predecible y eficiente
- Actualizaciones automáticas de la interfaz
- Sin dependencia de RxJS para el estado local

### 🎨 **Interfaz Moderna**

- Diseño responsive con Bootstrap
- Sintaxis de templates Angular 17+ (control flow)
- Componentes standalone reutilizables

### 📊 **Funcionalidades del Builder**

- ✅ Selección de facciones y límites de puntos
- ✅ Catálogo completo de unidades por facción
- ✅ Sistema de mejoras con restricciones inteligentes
- ✅ Validación automática de límites de puntos
- ✅ Cálculo dinámico de costes totales
- ✅ Exportación a PDF profesional

### 🔧 **Sistema de Mejoras Avanzado**

- Restricciones por facción, unidad y categoría
- Slots múltiples para el mismo tipo de mejora
- Validación automática de compatibilidad
- Descripciones detalladas de cada mejora

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Angular CLI

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/EnrGarVic/sagas-z-builder.git
cd sagas-z-builder

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### Comandos Disponibles

```bash
npm start          # Servidor de desarrollo (http://localhost:4200)
npm run build      # Build de producción
npm run test       # Ejecutar tests
npm run watch      # Build en modo watch
```

## 📁 Arquitectura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios principales
│   │   └── army-store.service.ts   # Estado global con Signals
│   ├── features/                # Pantallas principales
│   │   ├── setup-screen/           # Configuración inicial
│   │   ├── start-screen/           # Pantalla de inicio
│   │   └── builder/                # Constructor de ejércitos
│   │       ├── army-panel/         # Panel del ejército actual
│   │       └── available-units/    # Catálogo de unidades
│   ├── shared/                  # Componentes reutilizables
│   │   ├── data.service.ts         # Base de datos del juego
│   │   ├── models.ts               # Interfaces TypeScript
│   │   ├── army-header/            # Cabecera con info del ejército
│   │   └── upgrade-modal/          # Modal de selección de mejoras
│   ├── app.ts                   # Componente raíz
│   └── app.html                 # Template principal
```

## 🏗️ Tecnologías Utilizadas

### Frontend

- **Angular 20.3** - Framework principal
- **Angular Signals** - Gestión de estado reactiva
- **TypeScript 5.9** - Tipado estático
- **SCSS** - Estilos avanzados

### Librerías

- **jsPDF** - Generación de documentos PDF
- **Bootstrap** - Sistema de diseño
- **RxJS** - Programación reactiva (mínimo uso)

### Herramientas de Desarrollo

- **Angular CLI** - Tooling y build
- **Prettier** - Formateo de código
- **Karma + Jasmine** - Testing

## 🎮 Cómo Usar la Aplicación

### 1. **Pantalla de Inicio**

- Introducción al constructor de ejércitos
- Botón para crear nuevo ejército

### 2. **Configuración de Ejército**

- Seleccionar facción disponible
- Establecer límite de puntos
- Nombrar el ejército

### 3. **Constructor**

- **Panel izquierdo**: Unidades disponibles por categoría
- **Panel derecho**: Tu ejército actual
- **Funciones**: Añadir/quitar unidades, gestionar mejoras

### 4. **Gestión de Mejoras**

- Clic en "Añadir Mejora" en cualquier unidad
- Modal con mejoras compatibles
- Descripciones detalladas y restricciones

### 5. **Exportación**

- Botón "Exportar a PDF"
- Descarga automática con formato profesional
- Nombre de archivo basado en tu ejército

## 📋 Base de Datos del Juego

El proyecto incluye una base de datos completa con:

### Facciones Disponibles

- 🟡 **Guerreros Z** - Héroes de la Tierra
- 🔴 **Guerreros Saiyan** - Raza guerrera del espacio
- 🟣 **Ejército de Freezer** - Imperio galáctico
- 🟢 **Androides** - Creaciones del Dr. Gero
- 🔵 **Namekianos** - Guerreros del planeta Namek

### Datos Incluidos

- **150+ Unidades** con estadísticas completas
- **100+ Mejoras** con restricciones y descripciones
- **Múltiples categorías** (Comandante, Fuerzas Especiales, etc.)
- **Sistema de cualidades** y habilidades especiales

## 🔄 Signals vs RxJS

Este proyecto utiliza **Angular Signals** para demostrar las ventajas sobre RxJS tradicional:

### Ventajas de Signals

```typescript
// ✅ Signals - Declarativo y simple
readonly totalPoints = computed(() =>
  this.armyList().reduce((sum, unit) =>
    sum + unit.coste + unit.upgrades.reduce((upgradeSum, upgrade) =>
      upgradeSum + upgrade.coste, 0), 0)
);

// ❌ RxJS tradicional - Más verboso
totalPoints$ = this.armyList$.pipe(
  map(units => units.reduce(/* ... lógica compleja ... */)),
  shareReplay(1)
);
```

### Beneficios Obtenidos

- 🚀 **Performance**: Actualizaciones granulares
- 🧹 **Simplicidad**: Menos boilerplate code
- 🔒 **Type Safety**: Mejor integración con TypeScript
- 🎯 **Debugging**: Stack traces más claros

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Roadmap

### Próximas Funcionalidades

- [ ] **Importar ejércitos** desde archivos JSON
- [ ] **Validador de listas** según reglas oficiales
- [ ] **Modo torneo** con restricciones especiales
- [ ] **Calculadora de probabilidades** de dados
- [ ] **Base de datos extendida** con expansiones

### Mejoras Técnicas

- [ ] **Tests unitarios** completos
- [ ] **PWA** para uso offline
- [ ] **Docker** para despliegue
- [ ] **CI/CD** automatizado

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**EnrGarVic** - [GitHub](https://github.com/EnrGarVic)

---

## 🎲 Sobre Sagas Z

Sagas Z es un juego de mesa de combate táctico basado en el universo de Dragon Ball Z. Este constructor de ejércitos no oficial facilita la creación y gestión de listas de ejército para partidas.

> ⚠️ **Disclaimer**: Este proyecto es no oficial y no está afiliado con los creadores de Sagas Z o Dragon Ball Z.

---

⭐ **¡Si te gusta el proyecto, dale una estrella!** ⭐

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
