//ethereum/ehr.js
import Web3 from 'web3';
import EHR from './build/abi/EHR.json';

let web3Instance;
const contractAddress = '0x214f013EF6cBeaFB7d9da70c80B6e8612535472E';

const initWeb3 = () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        return new Web3(window.ethereum);
    } else {
        const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/e62dea9220264697a491ddea6b248a35");
        return new Web3(provider);
    }
};

export const getWeb3 = () => {
    if (!web3Instance) {
        web3Instance = initWeb3();
    }
    return web3Instance;
};

export const getEHRInstance = () => {
    const web3 = getWeb3();
    return new web3.eth.Contract(EHR, contractAddress);
};
