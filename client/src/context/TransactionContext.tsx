import {
  FunctionComponent,
  useState,
  useEffect,
  createContext,
  ReactNode,
  ChangeEvent,
} from "react";
import { ethers } from "ethers";
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
// @ts-ignore
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};
// @ts-ignore
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

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
    console.log("run");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      console.log(formData);
      console.log("currentAccount", currentAccount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 gwei
            value: parsedAmount._hex, // 0.0001
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setLoading(true);
      console.log(`Loading ${transactionHash.hash}`);
      await transactionHash.wait();
      setLoading(true);
      console.log(`Succeess ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
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
    handleChange,
    sendTransaction,
  };

  return (
    // @ts-ignore
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
