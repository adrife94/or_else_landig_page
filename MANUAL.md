# 🦅 MANUAL DE OPERACIONES: OR ELSE (LANDING PAGE)

## 1. VISIÓN GENERAL (The Web Bunker)
Este repositorio contiene el perímetro visual de la aplicación OR ELSE. Es una página estática (HTML/CSS) diseñada para reclutar nuevos operativos.

La infraestructura está dividida estratégicamente para evadir las restricciones de seguridad de las plataformas gratuitas:

*   **Alojamiento Web (UI):** Firebase Hosting (Plan Spark - Gratuito).
*   **Distribución de Binarios (APK):** GitHub Releases (Repositorio Público).

## 2. RESTRICCIONES CRÍTICAS (Reglas de Combate)
El Plan Spark de Firebase prohíbe estrictamente alojar archivos ejecutables (como .apk o .exe) para evitar la distribución de malware. Si se intenta subir un APK, el despliegue fallará con un Error 400.

## 3. PROTOCOLO DE DESPLIEGUE WEB (Actualización Visual)
Cualquier cambio en los textos, colores o estructura de la Landing Page debe subirse a Firebase.

1.  Abre la terminal en la raíz de `or_else_landig_page`.
2.  Verifica que no haya ningún archivo `.apk` suelto en la carpeta (por seguridad).
3.  Ejecuta el comando de lanzamiento:

```bash
firebase deploy --only hosting
```

Si los cambios no se reflejan inmediatamente en el navegador, fuerza la limpieza de caché con `Ctrl + F5` (o `Cmd + Shift + R` en Mac).

## 4. PROTOCOLO DE ACTUALIZACIÓN DEL APK (Distribución de Armamento)
Cuando se compile una nueva versión de la aplicación móvil en Flutter, se debe actualizar el enlace de descarga de la web siguiendo este orden estricto:

### Fase A: Preparación en GitHub
1.  Ve al repositorio público de la Landing Page en GitHub.
2.  Navega a la sección **Releases** (margen derecho).
3.  Haz clic en **Draft a new release**.
4.  Crea un nuevo Tag con la versión exacta (ej. `v1.1.0+8`).
5.  Arrastra el nuevo archivo `.apk` a la caja de Assets.
6.  Añade el hash SHA-256 en la descripción para garantizar la integridad.
7.  Haz clic en **Publish release**.

### Fase B: Extracción del Enlace
1.  En la página de la Release recién publicada, localiza el archivo `.apk` bajo la sección Assets.
2.  Haz clic derecho sobre el archivo y selecciona **Copiar dirección de enlace**.

### Fase C: Actualización del Búnker
1.  Abre el archivo `index.html` en tu editor de código local.
2.  Busca la etiqueta `<a>` del botón de descarga.
3.  Reemplaza el atributo `href` con el nuevo enlace copiado.
4.  Actualiza el nombre del archivo en el atributo `download` y el hash SHA-256 en la advertencia visual.
5.  Sube los cambios a Firebase:

```bash
firebase deploy --only hosting
```
