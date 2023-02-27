// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const SSVETH = await ethers.getContract("SSVETH", deployer);

  await deploy("StakingPool", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [SSVETH.address],
    log: true,
  });

  // Getting a previously deployed contract
  const StakingPool = await ethers.getContract("StakingPool", deployer);
  console.log('StakingPool: ', StakingPool.address)
  await SSVETH.transferOwnership(
    StakingPool.address
  );

};
module.exports.tags = ["StakingPool"];
