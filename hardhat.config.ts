import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    bsctest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      // accounts:  [process.env.PRIVa_KEY]
      accounts : ['bf9f947ecc0a08bebf9cd683bf0b09308a9589bd80a53f41ddb2f5a6baccccaf']
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};

export default config;

