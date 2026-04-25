# MyHealth 🛡️💊

**MyHealth** es una aplicación descentralizada diseñada para salvar vidas mediante la gestión segura de información médica de emergencia. Utiliza tecnología Blockchain y dispositivos NFC para permitir que los rescatistas accedan a datos vitales de forma inmediata, manteniendo la privacidad del paciente bajo un sistema de cifrado con PIN.

## 🚀 Funcionalidades Principales

- **Escaner NFC Simulado:** Simulación de lectura de brazaletes médicos con validación de datos en tiempo real.
- **Bóveda Médica Protegida:** Información sensible (historial clínico, enfermedades, medicación) protegida por un PIN de 4 dígitos.
- **Registro en Blockchain:** Los datos de salud y los contactos de emergencia se protocolizan de forma segura.
- **Historial de Accesos:** Registro inmutable de cada vez que la información ha sido consultada por personal de emergencia.
- **Ficha Médica de Emergencia:** Acceso rápido a datos críticos como tipo de sangre, alergias y contactos SOS sin necesidad de desbloqueo.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Animaciones:** Tailwind Animate
- **Red:** Integración conceptual con [Monad Blockchain](https://www.monad.xyz/)

## 📦 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/4liyat/myhealth.git
   cd myhealth
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

## 🔐 Seguridad y Privacidad

MyHealth divide la información en dos capas:
1. **Pública:** Datos de identificación rápida necesarios para la atención inmediata en el sitio.
2. **Privada (Bóveda):** Historial clínico detallado que requiere autorización mediante PIN, garantizando que solo personal autorizado (o con el consentimiento del usuario) acceda a datos sensibles.

---
Desarrollado con ❤️ para el ecosistema Monad.
