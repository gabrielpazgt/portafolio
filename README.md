# ✨ Portafolio Frontend de Gabriel Paz

Sitio web estático multipágina diseñado para presentar perfil profesional, casos conceptuales y una descarga directa de CV en PDF con una estética moderna, clara y orientada a producto.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-1F1F1F?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## 🌐 Vista general

Este proyecto funciona como portafolio personal y carta de presentación profesional. Incluye:

- Landing principal con enfoque comercial y narrativa visual.
- Descarga directa del CV en formato PDF.
- Demos conceptuales para distintos tipos de negocio.
- Configuración centralizada para enlaces, identidad y datos personales.
- Despliegue simple en GitHub Pages sin build ni dependencias.

## 🧰 Stack

- `HTML5`
- `CSS3`
- `JavaScript` vanilla
- `GitHub Pages` para despliegue

## 📁 Estructura del proyecto

| Ruta | Descripción |
| --- | --- |
| `index.html` | Landing principal del portafolio. |
| `Gabriel-Paz-CV.pdf` | CV descargable desde los botones del sitio. |
| `styles/main.css` | Estilos globales de la landing. |
| `scripts/portfolio-data.js` | Datos editables: nombre, rol, enlaces y contacto. |
| `scripts/main.js` | Navegación, animaciones, reveal y lógica de formulario. |
| `demos/` | Casos conceptuales por industria. |
| `.nojekyll` | Evita problemas de procesamiento en GitHub Pages. |

## 🎨 Demos incluidas

- `Nativo Cafe`
- `Atelier Lumen`
- `Blackline Auto`
- `Vertex Legal`
- `Solara Wellness`
- `Northpeak Realty`
- `Orbit Finance`
- `Moss Studio`
- `Pulse Fit Club`

## ⚙️ Personalización rápida

Antes de publicarlo, te conviene revisar estos puntos:

1. Edita `scripts/portfolio-data.js`.
2. Completa `email` con tu correo real.
3. Si vas a usar formulario real, agrega tu endpoint en `contactFormEndpoint`.
4. Verifica `brandName`, `role`, `whatsapp`, `github`, `linkedin` y `cv`.
5. Ajusta textos del `index.html` si quieres enfocar mejor tu propuesta.
6. Sustituye demos conceptuales por proyectos reales cuando quieras mostrar trabajo final.

## 💻 Cómo verlo localmente

### Opción 1: Python en Windows

```powershell
py -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

### Opción 2: Node.js

```powershell
npx serve .
```

### Opción 3: VS Code

Puedes usar una extensión como:

- `Live Preview`
- `Live Server`

## 🚀 Publicar en GitHub Pages

Este repositorio ya está listo para publicarse como sitio estático. Como tu remoto actual es:

```text
https://github.com/gabrielpazgt/portafolio.git
```

la URL esperada de GitHub Pages será:

```text
https://gabrielpazgt.github.io/portafolio/
```

### 1. Sube tus cambios al repositorio

```powershell
git add .
git commit -m "feat: update portfolio and README"
git push origin main
```

### 2. Activa GitHub Pages en GitHub

En tu repositorio entra a:

```text
Settings > Pages
```

Configura estas opciones:

- `Source`: `Deploy from a branch`
- `Branch`: `main`
- `Folder`: `/ (root)`

Después guarda los cambios.

### 3. Espera la publicación

GitHub normalmente tarda entre 1 y 10 minutos en dejar el sitio disponible. Cuando termine, podrás abrir:

```text
https://gabrielpazgt.github.io/portafolio/
```

## ✅ Recomendaciones antes de publicar

- Agrega tu correo real en `scripts/portfolio-data.js`.
- Si usarás formulario directo, configura `contactFormEndpoint`.
- Revisa que los enlaces de LinkedIn y GitHub sean los definitivos.
- Comprueba que `Gabriel-Paz-CV.pdf` y las rutas dentro de `demos/` abran correctamente.
- Haz una última revisión visual en desktop y mobile.

## 📧 Conectar el formulario de contacto

La forma más simple para este proyecto es usar `Formspree`, porque funciona bien con sitios estáticos en GitHub Pages.

1. Crea un formulario en Formspree.
2. Copia el endpoint que te entregue, algo como:

```text
https://formspree.io/f/tu_codigo
```

3. Pégalo en `scripts/portfolio-data.js`:

```js
contactFormEndpoint: "https://formspree.io/f/tu_codigo",
```

4. Publica de nuevo el sitio con `git push origin main`.

Si `contactFormEndpoint` está vacío, el portafolio usa el modo actual de `mailto` como fallback.

## 📬 Contacto

- GitHub: [gabrielpaz](https://github.com/gabrielpaz)
- LinkedIn: [Gabriel Paz](https://www.linkedin.com/in/gabriel-paz-gapg/)

## 📌 Nota

Este proyecto no necesita `npm install`, compilación ni pipeline adicional para desplegarse en GitHub Pages. Con subir los archivos y activar Pages desde `main` es suficiente.
