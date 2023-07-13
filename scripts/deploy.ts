import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('Deploy from address: ', deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());


    // const BMEDICAL = await ethers.getContractFactory("Bmedical");
    // const Bmedical = await BMEDICAL.deploy();
    // console.log('Bmedical address: ', (await Bmedical.getAddress()));
    // Config.setConfig(network + '.Bmedical', (await Bmedical.getAddress()));

    const BMEDICALTOKEN = await ethers.getContractFactory("BMTOKEN");
    const bmedicalToken = await BMEDICALTOKEN.deploy();
    console.log('Bmedcal Token address: ', await bmedicalToken.getAddress());
    Config.setConfig(network + '.Bmedical Token', await bmedicalToken.getAddress());

    await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});