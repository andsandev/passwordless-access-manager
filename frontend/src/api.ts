import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

if (!BASE_URL) {
  throw new Error("REACT_APP_BACKEND_URL no está definido en .env");
}

export const getNonce = async (address: string): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/nonce`, { params: { address } });
  return response.data.nonce;
};

export const verifySignature = async (address: string, signature: string): Promise<string> => {
  const response = await axios.post(`${BASE_URL}/verify`, { address, signature });
  return response.data.status;
};

export const getLogs = async () => {
  const response = await axios.get(`${BASE_URL}/logs`);
  return response.data;
};
