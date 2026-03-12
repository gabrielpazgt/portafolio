# ✨ Portafolio Frontend de Gabriel Paz

Sitio web estático multipágina diseñado para presentar perfil profesional, casos conceptuales y una descarga directa de CV en PDF con una estética moderna, clara y orientada a producto.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-1F1F1F?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## 🌐 Vista general

Este proyecto funciona como portafolio personal y carta de presentación profesional. Incluye:

- Landing principal con enfoque comercial y narrativa visual.
- Descarga directa del CV en formato PDF.
- Demos conceptuales para distintos tipos de negocio.
- Configuración centralizada para enlaces, identidad y datos personales.
- Despliegue simple en hosting estatico sin build ni dependencias.

## 🧰 Stack

- `HTML5`
- `CSS3`
- `JavaScript` vanilla
- Hosting estatico

## 📁 Estructura del proyecto

| Ruta | Descripción |
| --- | --- |
| `index.html` | Landing principal del portafolio. |
| `Gabriel-Paz-CV.pdf` | CV descargable desde los botones del sitio. |
| `styles/main.css` | Estilos globales de la landing. |
| `scripts/portfolio-data.js` | Datos editables: nombre, rol, enlaces y contacto. |
| `scripts/main.js` | Navegación, animaciones, reveal y lógica de formulario. |
| `demos/` | Casos conceptuales por industria. |
| `.nojekyll` | Archivo opcional para despliegues estaticos sin procesamiento adicional. |

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
4. Verifica `brandName`, `role`, `whatsapp`, `linkedin` y `cv`.
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

## 🚀 Publicar en hosting estatico

Este proyecto esta listo para publicarse en cualquier servicio de hosting estatico.

### 1. Sube los archivos

Publica el contenido raiz del proyecto tal como esta:

- `index.html`
- `styles/`
- `scripts/`
- `demos/`
- `Gabriel-Paz-CV.pdf`
- `.nojekyll` si tu proveedor lo requiere

### 2. Define tu dominio o URL publica

Puedes usar:

- Un subdominio tipo `portfolio.tudominio.com`
- Un dominio principal
- Una URL temporal del proveedor mientras haces pruebas

### 3. Verifica el sitio publicado

Antes de compartirlo, revisa:

- Navegacion principal
- Descarga del CV
- Demos dentro de `demos/`
- Formulario o enlaces de contacto
- Version desktop y mobile

## ✅ Recomendaciones antes de publicar

- Agrega tu correo real en `scripts/portfolio-data.js`.
- Si usarás formulario directo, configura `contactFormEndpoint`.
- Revisa que los enlaces visibles sean los definitivos.
- Comprueba que `Gabriel-Paz-CV.pdf` y las rutas dentro de `demos/` abran correctamente.
- Haz una última revisión visual en desktop y mobile.

## 📧 Conectar el formulario de contacto

La forma mas simple para este proyecto es usar `Formspree`, porque funciona bien con sitios estaticos.

1. Crea un formulario en Formspree.
2. Copia el endpoint que te entregue, algo como:

```text
https://formspree.io/f/tu_codigo
```

3. Pégalo en `scripts/portfolio-data.js`:

```js
contactFormEndpoint: "https://formspree.io/f/tu_codigo",
```

4. Publica de nuevo el sitio en tu hosting estatico.

Si `contactFormEndpoint` está vacío, el portafolio usa el modo actual de `mailto` como fallback.

## 📬 Contacto

- LinkedIn: [Gabriel Paz](https://www.linkedin.com/in/gabriel-paz-gapg/)

## 📌 Nota

Este proyecto no necesita `npm install`, compilacion ni pipeline adicional para publicarse. Con subir los archivos a un hosting estatico es suficiente.
