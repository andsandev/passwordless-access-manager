import React, { useState } from "react";
import { BrowserProvider } from "ethers";
import { getNonce, verifySignature } from "../api";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface LoginProps {
  onStatus: (status: string) => void;
}

const Login: React.FC<LoginProps> = ({ onStatus }) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Instala Metamask para continuar");
      return;
    }

    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
    setWalletConnected(true);
  };

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("No se detecta Metamask");
      return;
    }

    try {
      const nonce = await getNonce(address);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(nonce);

      const status = await verifySignature(address, signature);
      onStatus(status);
    } catch (err) {
      console.error(err);
      onStatus("Error durante login");
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <button onClick={connectWallet}>Conectar Wallet</button>
      ) : (
        <div>
          <p>Wallet: {address}</p>
          <button onClick={handleLogin}>Login con Web3</button>
        </div>
      )}
    </div>
  );
};

export default Login;
