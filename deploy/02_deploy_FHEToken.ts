import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get, log } = hre.deployments;

  const name = process.env.FHETOKEN_TESTNET_NAME ?? "Confidential Token (Testnet)";
  const symbol = process.env.FHETOKEN_TESTNET_SYMBOL ?? "CTKN";
  const tokenURI = process.env.FHETOKEN_TESTNET_URI ?? "ipfs://cwtt";

  const underlying = await get("TestERC20");

  const deployed = await deploy("FHEToken", {
    from: deployer,
    args: [name, symbol, tokenURI, underlying.address],
    log: true,
  });

  log(`FHEToken (testnet) deployed at ${deployed.address} (underlying ${underlying.address})`);
};

export default func;
func.id = "deploy_fhe_token_testnet";
func.tags = ["FHETokenTestnet"];
func.dependencies = ["TestERC20"];
