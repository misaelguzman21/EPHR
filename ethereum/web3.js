//ethereum/web3.js
import Web3 from 'web3';

let web3;

// Función para inicializar Web3
const initWeb3 = () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // We are in the browser and MetaMask is running.
    return new Web3(window.ethereum);
  } else {
    // We are on the server *OR* the user is not running MetaMask
    const provider = new Web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/e62dea9220264697a491ddea6b248a35"
    );
    return new Web3(provider);
  }
};

// Exporta una función que inicializa Web3 a demanda
export const getWeb3 = () => {
  if (!web3) {
    web3 = initWeb3();
  }
  return web3;
};

export default getWeb3;