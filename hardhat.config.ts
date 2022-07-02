import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';

import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config();

// polygon: {
//   url: process.env.API_URL,
//   accounts: [process.env.PRIVATE_KEY!],
// },
const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {},
        localhost: { timeout: 600000 },
    },
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {
                enabled: true,
                runs: 800
            }
        }
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS === 'true' ? true : false,
        noColors: true,
        outputFile: 'reports/gas_usage/summary.txt'
    },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5'
    }
}

export default config;