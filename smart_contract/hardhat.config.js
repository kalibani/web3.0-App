// https://eth-ropsten.alchemyapi.io/v2/vLEaCuSgSzI0cY_Oj8dONlNNOmt1Jdl3

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/vLEaCuSgSzI0cY_Oj8dONlNNOmt1Jdl3",
      accounts: [
        "0892b04c830886c6e1f9387c966f77d067b276e475ad6065615389885013dd51",
      ],
    },
  },
};
