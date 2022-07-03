import hre from 'hardhat';

const main = async () => {
    // hardhatでのデプロイをサポートするライブラリのアドレスとWacePortalコントラクトの連携
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // HardhatによってコントラクトのためのローカルEthネットが構築（実行後に破棄される）
    // 0.1ETHをコントラクトに提供してデプロイする
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log('Contract added to:', waveContract.address);

    // コントラクトの残高を出力
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance', hre.ethers.utils.formatEther(contractBalance));

    let waveTxn = await waveContract.wave('A message!'); // wave関数を実行
    await waveTxn.wait(); // txが認証されるまで待つ(テスト１回目)
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.wave('Another message!');
    await waveTxn.wait(); // txが承認されるまで待つ（テスト２回目）

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
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
