import {
  FunctionComponent,
  useState,
  useEffect,
  createContext,
  ReactNode,
  ChangeEvent,
} from "react";
import { ethers, providers } from "ethers";
interface TransactionsProps {
  currentAccount?: string;
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  formData?: object;
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    name: string | undefined
  ) => void | undefined;
  sendTransaction: Function;
}

import { contractABI, contractAddress } from "../utils/constant";

export const TransactionsContext = createContext<TransactionsProps>({
  currentAccount: "",
  connectWallet: () => {},
  formData: {},
  sendTransaction: () => {},
  handleChange: () => {},
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
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      console.log(accounts, "accounts");

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("no ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("no ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const { addressTo, amount, keyword, message } = formData;
      getEthereumContract();
    } catch (error) {
      console.log(error);

      throw new Error("no ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const value = {
    connectWallet,
    currentAccount,
    formData,
    setFormData,
    handleChange,
    sendTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
