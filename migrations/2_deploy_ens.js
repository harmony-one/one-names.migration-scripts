const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
// const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar");
// const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar");
// const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");

const StablePriceOracle = artifacts.require('@ensdomains/ethregistrar/StablePriceOracle');
const DummyOracle = artifacts.require('@ensdomains/ethregistrar/DummyOracle');

const ETHRegistrarController = artifacts.require('@ensdomains/ethregistrar/ETHRegistrarController');
const OwnedResolver = artifacts.require('@ensdomains/resolver/OwnedResolver');
const BaseRegistrarImplementation = artifacts.require('@ensdomains/ethregistrar/BaseRegistrarImplementation');
const ReverseRegistrar = artifacts.require('@ensdomains/ens/ReverseRegistrar');
const Root = artifacts.require('@ensdomains/root/Root');
const DefaultReverseResolver = artifacts.require('@ensdomains/resolver/DefaultReverseResolver');

const utils = require('web3-utils');
const namehash = require('eth-ens-namehash');

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const tld = "one";
const ETH_LABEL = utils.sha3(tld);
const ETH_NODE = namehash.hash(tld);

const MIN_COMMITMENT_AGE = 60;
const MAX_COMMITMENT_AGE = 86400;

module.exports = async function(deployer, network, accounts) {
  return await deploy(deployer, network, accounts);
};

async function deploy(deployer, network, accounts) {
  await deployer.deploy(ENS);
  const ens = await ENS.deployed();

  await deployer.deploy(OwnedResolver);
  const ownedResolver = await OwnedResolver.deployed();

  // Deploy and activate the .eth registrar
  await deployer.deploy(BaseRegistrarImplementation, ens.address, ETH_NODE, {from: accounts[0]});
  const registrar = await BaseRegistrarImplementation.deployed();

  await ens.setSubnodeRecord(ZERO_ADDRESS, ETH_LABEL, registrar.address, ownedResolver.address, 0, {from: accounts[0]});

  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3(tld), registrar.address);

  console.log("Start: Set resolver.one address for main Resolver");

  // Set address for owned resolver
  await registrar.addController(accounts[0], {from: accounts[0]});
  await registrar.register(utils.sha3('resolver'), accounts[0], 31536000, {from: accounts[0]});
  await ens.setResolver(namehash.hash('resolver.one'), ownedResolver.address, {from: accounts[0]});
  await ownedResolver.setAddr(namehash.hash("resolver.one"), ownedResolver.address);
  await registrar.removeController(accounts[0], {from: accounts[0]});

  console.log("End: Set resolver.one address for main Resolver");

  await deployer.deploy(DummyOracle, utils.toBN(1e18));
  const dummyOracle = await DummyOracle.deployed();

  await deployer.deploy(StablePriceOracle, dummyOracle.address, [0, 0, 4, 2, 1]);
  const priceOracle = await StablePriceOracle.deployed();

  await deployer.deploy(
      ETHRegistrarController,
      BaseRegistrarImplementation.address,
      priceOracle.address, MIN_COMMITMENT_AGE, MAX_COMMITMENT_AGE,
      {from: accounts[0]}
      );

  const ethRegistrarController = await ETHRegistrarController.deployed();

  // Configure the owned resolver
  await ownedResolver.methods['setAddr(bytes32,address)'](ETH_NODE, BaseRegistrarImplementation.address);
  await ownedResolver.setInterface(ETH_NODE, "0x6ccb2df4", BaseRegistrarImplementation.address); // Legacy wrong ERC721 ID
  await ownedResolver.setInterface(ETH_NODE, "0x80ac58cd", BaseRegistrarImplementation.address); // Correct ERC721 ID
  await ownedResolver.setInterface(ETH_NODE, "0x018fac06", ETHRegistrarController.address); // Controller interface

  // ownedResolver.transferOwnership(ethRegistrarController.address, {from: accounts[0]});
  await registrar.addController(ethRegistrarController.address, {from: accounts[0]});

  await ownedResolver.transferOwnership(ethRegistrarController.address, {from: accounts[0]});

  // Deploy and activate the reverse registrar
  await deployer.deploy(DefaultReverseResolver, ens.address, {from: accounts[0], gas: 1000000});
  await deployer.deploy(ReverseRegistrar, ens.address, DefaultReverseResolver.address, {from: accounts[0], gas: 1000000});
  await ens.setSubnodeOwner(ZERO_ADDRESS, utils.sha3("reverse"), accounts[0], {from: accounts[0]});
  await ens.setSubnodeOwner(namehash.hash("reverse"), utils.sha3("addr"), ReverseRegistrar.address, {from: accounts[0]});
  await ens.setOwner(namehash.hash("reverse"), ZERO_ADDRESS, {from: accounts[0]});

  // Deploy the DNS registrar and configure it for .xyz
  // const oldXyzRegistrarAddress = await oldENS.owner(namehash.hash("xyz"));
  // if(oldXyzRegistrarAddress != config.ZERO_ADDRESS) {
  //   const oldXyzRegistrar = await DNSRegistrar.at(oldXyzRegistrarAddress);
  //   await deployer.deploy(DNSRegistrar, await oldXyzRegistrar.oracle(), ENSRegistryWithFallback.address, {from: accounts[1]});
  //   await ens.setSubnodeOwner(config.ZERO_ADDRESS, sha3("xyz"), DNSRegistrar.address, {from: accounts[1]});
  // }

  // Deploy the root contract and make it the owner of the root node
  // return;

  await deployer.deploy(Root, ens.address, {from: accounts[0]});
  const root = await Root.deployed();
  await ens.setOwner(ZERO_ADDRESS, Root.address, {from: accounts[0]});

  const ownerAddress = accounts[0];

  // Transfer ownership of the root to the required account
  await root.setController(ownerAddress, true, {from: accounts[0]});
  await root.transferOwnership(ownerAddress, {from: accounts[0]});
};
