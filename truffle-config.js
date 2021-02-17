require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { TruffleProvider } = require('@harmony-js/core')
const account_1_mnemonic = process.env.MNEMONIC
const account_1_private_key = process.env.PRIVATE_KEY
const account_2_mnemonic = process.env.MNEMONIC2
const account_2_private_key = process.env.PRIVATE_KEY2
const testnet_url = process.env.TESTNET_URL
const mainnet_url = process.env.MAINNET_URL
gasLimit = process.env.GAS_LIMIT
gasPrice = process.env.GAS_PRICE

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
                return new HDWalletProvider([account_1_private_key], "https://ropsten.infura.io/v3/58a380d3ecd545b2b5b3dad5d2b18bf0");
            },
            network_id: '3',
            from: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581'
        },
        testnet: {
            network_id: '2',
            provider: () => {
                const truffleProvider = new TruffleProvider(
                    testnet_url,
                    { memonic: account_1_mnemonic },
                    { shardID: 0, chainId: 2 },
                    { gasLimit: gasLimit, gasPrice: gasPrice},
                );
                const newAcc = truffleProvider.addByPrivateKey(account_1_private_key);
                truffleProvider.setSigner(newAcc);
                return truffleProvider;
            },
        },
        test: {
            network_id: '2',
            provider: () => {
                const truffleProvider = new TruffleProvider(
                    testnet_url,
                    { memonic: account_2_mnemonic },
                    { shardID: 0, chainId: 2 },
                    { gasLimit: gasLimit, gasPrice: gasPrice },
                );
                const newAcc = truffleProvider.addByPrivateKey(account_2_private_key);
                truffleProvider.setSigner(newAcc);
                return truffleProvider;
            },
        },
        mainnet: {
            network_id: '1',
            provider: () => {
                const truffleProvider = new TruffleProvider(
                    mainnet_url,
                    { memonic: account_1_mnemonic },
                    { shardID: 0, chainId: 1 },
                    { gasLimit: gasLimit, gasPrice: gasPrice },
                );
                const newAcc = truffleProvider.addByPrivateKey(account_1_private_key);
                truffleProvider.setSigner(newAcc);
                return truffleProvider;
            },
        }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
        }
    }
}
