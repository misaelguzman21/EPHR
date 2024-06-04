// contexts/Web3Context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getWeb3 } from '../ethereum/web3';

const Web3Context = createContext({});

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    useEffect(() => {
        function handleAccountsChanged(accounts) {
            setAccount(accounts.length === 0 ? null : accounts[0]);
        }

        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            setIsMetaMaskInstalled(true);
            window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    return (
        <Web3Context.Provider value={{ account, isMetaMaskInstalled }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => useContext(Web3Context);
