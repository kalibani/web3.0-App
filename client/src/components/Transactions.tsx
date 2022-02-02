import { FunctionComponent, useContext } from "react";
import { TransactionsContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";

import { shortenAdress } from "../utils/shortenAddress";

interface TransactionsProps {}
interface TransactionCardProps {
  addressTo?: string;
  addressFrom?: string;
  timestamp?: string;
  message?: string;
  keyword?: string;
  amount?: string;
  url?: string;
}

const TransactionCard: FunctionComponent<TransactionCardProps> = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
}) => {
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[400px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full gap-2 p-2 mb-6">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base text-white">
              From: {shortenAdress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base text-white">
              To: {shortenAdress(addressTo)}
            </p>
          </a>
          <p className="text-base text-white">Amount: {amount} Eth</p>
          {message && (
            <>
              <br />
              <p className="text-base text-white">Message : {message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Transactions: FunctionComponent<TransactionsProps> = () => {
  const { currentAccount } = useContext(TransactionsContext);

  return (
    <div className="flex items-center justify-center w-full 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col px-4 py-12 md:p-12">
        {currentAccount ? (
          <h3 className="my-2 text-3xl text-center text-white">
            Latest transactions
          </h3>
        ) : (
          <h3 className="my-2 text-3xl text-center text-white">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap items-center justify-center mt-10">
          {dummyData.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
