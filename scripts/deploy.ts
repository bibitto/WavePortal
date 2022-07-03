import hre from 'hardhat';

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // コントラクトに0.001ETHを付与
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.001'),
    });
    await waveContract.deployed();

    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());
    console.log('Contract deployed to: ', waveContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
