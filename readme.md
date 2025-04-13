
# 🧾 Formulario Dinámico con Validación de Códigos

Este proyecto es un formulario web moderno hecho con **React + Vite + TypeScript + TailwindCSS**, que valida códigos únicos, genera inputs desde Google Sheets y guarda respuestas automáticamente en otra pestaña. Diseñado para ser modular, adaptable a cualquier dispositivo y fácil de escalar.

---

## 🚀 Características

- 🔐 Validación de códigos únicos
- 🧠 Inputs generados dinámicamente desde una pestaña "campos" en Google Sheets
- 📝 Registro automático de respuestas en la pestaña "registro"
- 🎨 Estilo moderno: glassmorphism, animaciones suaves, transiciones y responsividad total
- 🌐 Redirección controlada a WhatsApp al finalizar
- 📦 Proyecto modularizado por vistas y componentes
- ⚙️ Configuración con variables de entorno (usando `.env`)
- 🔒 Sin exponer claves sensibles

---

## 📁 Estructura del Proyecto

```
formulario_base/
├── src/
│   ├── views/               # CodeInput, Formulario, Success, ErrorUsed, ErrorInvalid
│   ├── components/          # Inputs, Botones, Contenedores
│   ├── services/            # api.ts (conexión a Google Sheets)
│   ├── hooks/               # useGoogleSheets
│   ├── styles/              # Estilos por sección y botones separados
│   ├── utils/               # Funciones auxiliares
│   └── main.tsx
├── public/
├── index.html
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Instalación

```bash
npm install
npm run dev
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz con estas claves:

```env
VITE_SHEETS_CAMPOS_URL=TU_URL
VITE_SHEETS_CODIGOS_URL=TU_URL
VITE_SHEETS_REGISTRO_URL=TU_URL
```

O usa el archivo de ejemplo `.env.example`.

---

## 📲 Flujo del Usuario

1. ✅ Ingresa un código de acceso.
2. 🔄 Si el código es válido, se genera un formulario en tiempo real.
3. 📝 El usuario responde.
4. ☑️ Al enviar, se muestra una vista de agradecimiento con botón hacia WhatsApp.
5. ❌ Si el código es inválido o ya usado, se muestran pantallas de error estilizadas con opción de volver.

---

## 🌐 Tecnologías Usadas

- React.js + TypeScript
- Tailwind CSS
- Vite
- Google Sheets (Apps Script API)
- SweetAlert2
- React Router DOM

---

## 👨‍💻 Autor

Desarrollado por Grupo Dk  


---

## 🛡️ Licencia

Este proyecto es de uso privado para validación de formularios con control total.  
Puedes adaptarlo a tus necesidades si tienes permiso del autor.
