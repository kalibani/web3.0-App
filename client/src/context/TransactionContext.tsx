import { FunctionComponent, useState, useEffect, createContext } from "react";
import { ethers, providers } from "ethers";
interface TransactionsProps {
  transactions?: Array<[]>;
}

import { contractABI, contractAddress } from "../utils/constant";

export const TransactionsContext = createContext<TransactionsProps>({
  transactions: [],
});

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider = ({ children }) => {
  const value = {
    transactions: [],
  };
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
