import { isAddress } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const name = process.env.FHETOKEN_MAINNET_NAME ?? "Confidential Token";
  const symbol = process.env.FHETOKEN_MAINNET_SYMBOL ?? "CTKN";
  const tokenURI = process.env.FHETOKEN_MAINNET_URI ?? "ipfs://cwtt";
  const underlyingAddress = process.env.FHETOKEN_MAINNET_UNDERLYING ?? "";

  if (!isAddress(underlyingAddress)) {
    throw new Error("FHETOKEN_MAINNET_UNDERLYING must be a valid address");
  }

  const deployed = await deploy("FHEToken", {
    from: deployer,
    args: [name, symbol, tokenURI, underlyingAddress],
    log: true,
  });

  log(`FHEToken (mainnet) deployed at ${deployed.address} (underlying ${underlyingAddress})`);
};

export default func;
func.id = "deploy_fhe_token_mainnet";
func.tags = ["FHETokenMainnet"];
