Passwordless Access Manager (Web3)

Proyecto full-stack Web3 para portfolio, que permite acceso passwordless mediante firma de nonce con Metamask, con backend en Raspberry Pi, smart contract seguro en testnet y frontend React + TypeScript.

🔹 Características

Autenticación passwordless mediante firma de mensajes (nonce)

Smart contract seguro para validar accesos (hasAccess) en blockchain (testnet Sepolia / Polygon Mumbai)

Logs auditable-friendly guardados en SQLite para auditorías

Frontend en React + TypeScript con conexión a Metamask

Uso de .env tanto en backend como en frontend para variables sensibles y configuración

Escucha de eventos del contrato (AccessGranted y AccessRevoked) en tiempo real

Proyecto full-stack listo para demo en Raspberry Pi o local

🔹 Tecnologías

Frontend: React, TypeScript, ethers.js, axios

Backend: Node.js, Express, SQLite, ethers.js

Blockchain: Smart contract en Solidity, desplegado en testnet

Hardware: Raspberry Pi 3B+ (backend)

Gestión de entornos: .env para configuración segura

🔹 Instalación
1. Backend (Raspberry Pi / Node.js)
cd backend
npm install


Crea un archivo .env en backend/ con:

INFURA_KEY=TU_INFURA_KEY
CONTRACT_ADDRESS=TU_CONTRACT_ADDRESS
PORT=3000


Inicia el servidor:

npm start

2. Frontend (React + TypeScript)
cd frontend
npm install


Crea un archivo .env en frontend/ con:

REACT_APP_BACKEND_URL=http://TU_RASPBERRY_PI_IP:3000


Inicia la aplicación:

npm start


Abre http://localhost:3000
 en un navegador con Metamask instalado

🔹 Uso

Conectar Wallet: Haz click en "Conectar Wallet" y acepta la conexión en Metamask

Login: Firma el nonce enviado por el backend

Verificación: El backend consulta el smart contract seguro y devuelve Access Granted o Access Denied

Historial: Todos los accesos y eventos de blockchain se registran en SQLite y se pueden mostrar en el frontend

🔹 Estructura del proyecto
passwordless-access-manager/
├── backend/
│   ├── index.js
│   ├── access.db
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   └── components/
│   │       ├── Login.tsx
│   │       └── AccessHistory.tsx
│   └── .env
└── README.md

🔹 Smart Contract (Solidity)

Función principal: hasAccess(address user) returns(bool)

Eventos:

AccessGranted(address indexed user, address indexed grantedBy)

AccessRevoked(address indexed user, address indexed revokedBy)

Audit-friendly, preparado para revisiones profesionales

🔹 Notas importantes

TypeScript: se usa para mayor seguridad y mantenimiento del código

BrowserProvider: para conectarse a Metamask en Ethers v6

.env: protege claves sensibles (Infura Key, dirección de contrato, backend URL)

Logs SQLite: auditable-friendly, todos los eventos se registran localmente

Compatible con Raspberry Pi 3B+ y testnet Sepolia / Polygon Mumbai

🔹 Contribuciones

Este proyecto es parte del portfolio de Andres Sanchez

Pull requests y mejoras son bienvenidas

Mantener las variables sensibles en .env, nunca subirlas a GitHub

🔹 Demo

Backend corriendo en Raspberry Pi 3B+

Frontend en navegador con Metamask

Login passwordless con firma de nonce

Logs en tiempo real desde blockchain y backend