import { FunctionComponent } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from "./";

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  const connectWallet = () => {};
  const commonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-start justify-between px-4 py-12 md:flex-row md:p-20">
        <div className="flex flex-col justify-start flex-1 md:mr-10">
          <h1 className="py-1 text-3xl text-white sm:text-5xl text-gradient">
            Send Crypto
            <br /> across the world
          </h1>
          <p className="w-11/12 mt-5 text-base font-light text-left text-white md:w-9/12">
            Explore the crypto world. Buy and sell cryptocurrencies easily in
            Krypto
          </p>
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <span className="text-base font-semibold text-white">
              Connect Wallet
            </span>
          </button>
          <div className="grid mt-10 sm:grid-cols-3 grid-cols-2w-full">
            <div className={`rounded-tl-2xl ${commonStyles}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
