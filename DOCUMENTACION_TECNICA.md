# DOCUMENTACIÓN TÉCNICA - OR ELSE

**"Disciplina o Arrepentimiento"**

Este documento proporciona una visión exhaustiva de la arquitectura, reglas de diseño y convenciones técnicas del proyecto **OR ELSE**. Su propósito es permitir a cualquier desarrollador (o a ti mismo en el futuro) retomar el desarrollo en minutos sin necesidad de ingeniería inversa.

---

## 1. VISIÓN GENERAL

**OR ELSE** es una aplicación/landing page de productividad basada en disciplina militar y refuerzo negativo.
- **Tono:** Estricto, agresivo, militar. "Sin excusas. Sin piedad."
- **Diseño:** "Dark Luxury" (Lujo Oscuro) con acentos en "Rojo Sangre" (`#FF0000`).
- **Idioma principal:** Español (`lang="es"`).
- **Stack:** HTML5, CSS3, JavaScript Vainilla.
- **Construcción:** No hay paso de compilación (No build step). Todo es estático y se ejecuta nativamente en el navegador.

---

## 2. EJECUCIÓN Y DESPLIEGUE

### Entorno de Desarrollo Local
Dado que no hay dependencias de Node.js ni bundlers (Webpack/Vite), puedes servir el proyecto localmente usando Python:

```bash
python3 -m http.server
```
Luego, accede a `http://localhost:8000` en tu navegador.

### Despliegue
El proyecto está configurado para desplegarse en **Firebase Hosting**.
- Archivo de configuración: `firebase.json` (reescribe todas las rutas a `index.html`).
- Archivo del proyecto: `.firebaserc`.

---

## 3. ESTRUCTURA DEL PROYECTO

- `/index.html`: La estructura principal de la landing page. Contiene todo el marcado semántico, secciones de héroe, protocolos, sistema de balas y modales legales.
- `/styles.css`: Hoja de estilos principal. Utiliza variables CSS para la gestión del diseño, colores y tipografía.
- `/script.js`: Toda la interactividad (partículas, animaciones de scroll, contadores, navbar móvil, modales).
- `/images/`: Directorio de activos estáticos (iconos, avatares, mockups).

---

## 4. CONCEPTOS CLAVE DEL NEGOCIO (LÓGICA)

1. **Protocolos (Misiones):** Tareas que el usuario "Operativo" se compromete a realizar (ej. *Levantarse, Toque de Queda, Apagón Digital*). Requieren verificación por hardware (QR, GPS, Acelerómetro).
2. **Sistema de Munición (Balas / Bullets):** Moneda de supervivencia. Las balas permiten al usuario saltarse un castigo inminente.
   - *Regla Visual:* El icono de "Bala" debe mantener una apariencia dorada/metálica realista y **NO DEBE** ser teñido de rojo.
3. **Sistema de Castigos (Consecuencias):** Niveles crecientes de penalización (Molestia, Resistencia, Daño) impuestos si se falla un protocolo. (Ej. *Agitar el teléfono, Escribir líneas, Penalización financiera*).
4. **Sistema de Rangos:** Determina la capacidad del usuario. Progresión desde *Recluta* hasta *Leyenda*. Un rango superior aumenta el límite máximo de Balas y Targets (objetivos) almacenados.

---

## 5. GUÍA DE ESTILOS Y CONVENCIONES CSS

### Variables Principales
- **Fondo:** `--bg-primary: #000000;`, `--bg-secondary: #09090B;`, `--bg-tertiary: #18181B;`
- **Acento (Rojo Sangre):** `--primary-500: #FF0000;`
- **Texto:** `--text-primary: #FFFFFF;`, `--text-secondary: #E4E4E7;`

### Convenciones de Desarrollo Frontend
1. **Reutilización de Clases:** *Prioridad Absoluta*. Antes de crear nuevos estilos, reutiliza clases globales existentes:
   - `.glass-card`: Para contenedores con fondo translúcido, desenfoque (blur) y bordes sutiles.
   - `.text-gradient`: Para aplicar el degradado rojo brillante a textos (h1, span).
   - `.btn-primary` y `.btn-secondary`: Para botones y llamadas a la acción (CTAs).

2. **Reglas de Diseño Responsivo (Breakpoints):**
   - **< 900px:** Los botones de acción en la sección Hero (`.hero-cta`) deben apilarse verticalmente para evitar desbordamiento horizontal.
   - **< 768px:** La variable `--section-padding` se sobrescribe a `60px` para optimizar el espacio en móviles.
   - **< 600px:** El menú de navegación oculta sus enlaces (`.nav-links`) y muestra el botón toggle (`.mobile-menu-toggle`).

3. **Convenciones de Layout (Grids):**
   - Todos los diseños de cuadrícula (Grid Layouts) **deben usar** `minmax(250px, 1fr)` para definir sus columnas. Esto garantiza un ajuste (wrapping) automático y previene desbordamientos en dispositivos móviles.

4. **Regla Técnica de Renderizado 3D:**
   - **NUNCA** apliques `backdrop-filter` (o efectos de cristal/glass) a elementos que utilizan transformaciones 3D (`transform: rotateY()`, etc.). Esto rompe el motor de renderizado 3D en la mayoría de los navegadores web. (Ver implementación de `.service-card-flip` en `styles.css`).

---

## 6. CONVENCIONES DE JAVASCRIPT Y DOM

1. **Gestión de Estado de Interfaz (UI State):**
   - Los cambios visuales en el DOM (como abrir menús, mostrar elementos, activar validaciones) deben realizarse **alternando clases CSS** (ej. `.classList.toggle('active')`, `.classList.add('visible')`) y NO manipulando estilos en línea directamente mediante JS (`element.style.display = 'block'`).

2. **Implementación de Modales:**
   - Al escribir lógica de JavaScript para modales, los selectores de elementos internos (por ejemplo, botones de cierre `.close-btn`, contenedores de contenido) **deben estar limitados al contenedor del modal específico** usando `modal.querySelector()`.
   - *Razón:* Evitar conflictos de eventos o cierres accidentales cuando existen múltiples modales en la misma página (ej. Modal de Términos, Modal de Privacidad).

---

## 7. CÓMO RETOMAR EL DESARROLLO

Si estás leyendo esto tras meses de inactividad, sigue este flujo:
1. Abre una terminal y ejecuta `python3 -m http.server`.
2. Revisa `index.html` para encontrar la sección que deseas modificar (está fuertemente comentado).
3. Si vas a añadir una nueva tarjeta (card) de protocolo o castigo, simplemente copia el HTML de una `.service-card-flip` existente, cambia la imagen y el texto. Todo el CSS y JS necesario (efecto flip 3D, animación de aparición en scroll) se aplicará automáticamente.
4. Si necesitas modificar estilos, revisa primero las variables en la cima de `styles.css`.
5. Si vas a añadir un nuevo Modal, duplica la estructura de `#privacy-policy-modal`, y en `script.js` sigue la regla estricta de usar `modal.querySelector('.close-btn')`.

*No Excuses. No Surrender.*