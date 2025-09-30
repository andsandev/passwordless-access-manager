# Passwordless Access Manager (Web3)

Proyecto full-stack Web3 para portfolio, que permite **acceso passwordless** mediante **firma de nonce con Metamask**, con **backend en Raspberry Pi**, **smart contract seguro en testnet** y **frontend React + TypeScript**.

---

## 🔹 Características

- Autenticación **passwordless** mediante **firma de mensajes (nonce)**
- **Smart contract seguro** para validar accesos (`hasAccess`) en blockchain (testnet Sepolia / Polygon Mumbai)
- **Logs auditable-friendly** guardados en SQLite para auditorías
- Frontend en **React + TypeScript** con conexión a **Metamask**
- Uso de **.env** tanto en backend como en frontend para variables sensibles y configuración
- Escucha de eventos del contrato (`AccessGranted` y `AccessRevoked`) en tiempo real
- Proyecto **full-stack listo para demo** en Raspberry Pi o local

---

## 🔹 Tecnologías

- **Frontend:** React, TypeScript, ethers.js, axios
- **Backend:** Node.js, Express, SQLite, ethers.js
- **Blockchain:** Smart contract en Solidity, desplegado en testnet
- **Hardware:** Raspberry Pi 3B+ (backend)
- **Gestión de entornos:** `.env` para configuración segura

---

## 🔹 Instalación

### 1. Backend (Raspberry Pi / Node.js)

```bash
cd backend
npm install
```	