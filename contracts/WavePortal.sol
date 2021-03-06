// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }
    uint256 totalWaves;
    uint256 private seed;
    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    // payableとすることで送金機能を実装
    constructor() payable {
        console.log("WavePortal - Smart Contract!");
        // 初期シードを設定
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        // 15分のクールダウンを強制
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            'Wait 15m'
        );
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // 50%の確率でETHをプレゼントする
        seed = (block.timestamp + block.difficulty) % 100;
        if (seed <= 50) {
            console.log('%s won!', msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                'Trying to withdraw more money than the contract has.'
            );
            // 送金を行うための実装
            (bool success, ) = (msg.sender).call{value: prizeAmount}('');
            require(success, 'Failed to withdraw money from contract.');
        } else {
            console.log("%s did not win.", msg.sender);
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
