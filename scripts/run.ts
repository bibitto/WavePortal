import hre from 'hardhat';

const main = async () => {
    // hre.ethers.getSignersはHardhatが提供する任意のアドレスを返す関数
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // hardhatでのデプロイをサポートするライブラリのアドレスとWacePortalコントラクトの連携
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    // HardhatによってコントラクトのためのローカルEthネットが構築（実行後に破棄される）
    const waveContract = await waveContractFactory.deploy();
    // WavePortalコントラクトをローカルのブロックチェーンにデプロイ
    const wavePortal = await waveContract.deployed();

    console.log('Contract deployed to:', wavePortal.address);
    console.log('Contract deployed by:', owner.address);
    console.log('randomPerson_address:', randomPerson.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    // wave関数を実行
    let waveTxn = await waveContract.wave();
    // txが認証されるまで待つ
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
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
