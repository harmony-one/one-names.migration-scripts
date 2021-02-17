const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 7545,
      network_id: '5777',
      gas: 4712388
    },
    ropsten: {
      provider: function() {
        // return new HDWalletProvider(["06363a6a8068946a6bfd8776234af6917458c232bf25ea79e92ac31fd439f2af"], "https://ropsten.infura.io/v3/58a380d3ecd545b2b5b3dad5d2b18bf0");
        return new HDWalletProvider(["6a36da6f9d0c9ad9fda5ca9b29ab372441196e12cadd813fcb86f6dcd02df332"], "https://ropsten.infura.io/v3/58a380d3ecd545b2b5b3dad5d2b18bf0");
      },
      network_id: '3',
      from: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581'
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 1
    }
  },
  compilers: {
    solc: {
      version: "0.7.4",
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
