const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
// const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar");
// const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar");
const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");

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

const sleep = (sec) => new Promise(resolve => setTimeout(resolve, 1000 * sec))

module.exports = async function(deployer, network, accounts) {
  return await deploy(deployer, network, accounts);

  // const registrar = await BaseRegistrarImplementation.at("0xE8BDB2B6a5b78f7A6A71Bd0FaC4d07dB519e9A76");
  /// await registrar.register(utils.sha3('resolver.eth'), accounts[0], 31536000, {from: accounts[0]});

  // const ens = await ENS.at("0x8C2D39443d10E2b2b960A25e471E5eb96F89f549");

  // const publicResolver = await PublicResolver.at("0xfA330f0641A8D00Bb90857BAB27e91A44aFAdaB5");
  // const resolver = await PublicResolver.at("0x3731E38434b97aD28F927B7DE9b87E7f2bA2d507");
  // const registrar = await BaseRegistrarImplementation.at("0x621B814906488E89dab356053a67D21c503C8977");
  //
  // await registrar.setResolver("0xf70d85914EBAA490C867c90B68dE37872e7A8A81");
  //
  // return;
  const controller = await ETHRegistrarController.at("0x108FE0C494F4AeE5a76Df49B62F2bfe8F0417B7b");

  // await registrar.addController("0x430506383f1ac31f5fdf5b49adb77fac604657b2", {from: accounts[0]});

  console.log(1)

  const commitment = await controller.makeCommitmentWithConfig(
      "ankaw",
      accounts[0],
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      "0x8c36fB3c29750477e9ec0Aaad4CeBbFab2fa901d",
      accounts[0],
      { from: accounts[0] }
  )

  console.log(2)

  await controller.commit(commitment, { from: accounts[0] })

  console.log(3, 'sleep')

  await sleep(65);

  console.log(31)

  await controller.registerWithConfig(
      "ankaw",
      accounts[0],
      299536000,
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      "0x8c36fB3c29750477e9ec0Aaad4CeBbFab2fa901d",
      accounts[0],
      { from: accounts[0], value: 1e18 }
  );

  console.log(4)


  return;
/*
  console.log(1)

  const commitment = await controller.makeCommitmentWithConfig(
      "ankaw",
      accounts[0],
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      "0xf70d85914EBAA490C867c90B68dE37872e7A8A81",
      accounts[0],
      { from: accounts[0] }
  )

  console.log(2)

  await controller.commit(commitment, { from: accounts[0] })

  console.log(3, 'sleep')

  await sleep(65);

  console.log(31)

  await controller.registerWithConfig(
      "ankaw",
      accounts[0],
      299536000,
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      "0xf70d85914EBAA490C867c90B68dE37872e7A8A81",
      accounts[0],
      { from: accounts[0], value: 1e18 }
  );

  console.log(4)
*/

  // await controller.register(
  //     "test",
  //     accounts[0],
  //     299536000,
  //     "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
  //     { from: accounts[0], value: 1e18 }
  //   );

  // await registrar.removeController(accounts[0], {from: accounts[0]});

  // await controller.registerWithConfig(
  //     "mikle",
  //     accounts[0],
  //     31556952,
  //     "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
  //     "0xf70d85914EBAA490C867c90B68dE37872e7A8A81",
  //     accounts[0],
  //     { from: accounts[0], value: 1e18 }
  //   );

  //
  // let resolverNode = namehash.hash("resolver");
  // let resolverLabel = utils.sha3("resolver");

  // await registrar.addController(controller.address, {from: accounts[0]});
  //
  // console.log(1)
  // await registrar.register(utils.sha3('resolver'), accounts[0], 31536000, {from: accounts[0]});
  // console.log(2)
  // await ens.setResolver(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});
  // console.log(3)
  //
  // await registrar.removeController(accounts[0], {from: accounts[0]});

  // console.log(1)
  //   await ens.setSubnodeOwner(ZERO_ADDRESS, resolverLabel, accounts[0], {from: accounts[0]});
  // console.log(10)
  //   await ens.setSubnodeOwner(ETH_NODE, resolverLabel, accounts[0], {from: accounts[0]});
  // console.log(11)
  // await ens.setResolver(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});
  // // console.log(2)
  // console.log(3)
  //   await resolver.setAddr(namehash.hash("resolver.eth"), resolver.address);
  // console.log(4)

  return;

  // await deployer.deploy(ENS);
  // const ens = await ENS.deployed();
  //
  // await deployer.deploy(PublicResolver, ens.address);
  // const resolver = await PublicResolver.deployed();
  // await deployer.deploy(PublicResolver, ens.address);
  // const resolver = await PublicResolver.at("0x07C63C9Cc0A0d1b9d82fFDC13AD396CF0A500cd1");

  // console.log('registrar.register 1')
  // await registrar.register(utils.sha3('resolver.eth'), accounts[0], 31536000, {from: accounts[0]});
  // console.log('registrar.register 2')
  // await ens.setResolver(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});
  // console.log('registrar.register 3')

  // await deployer.deploy(PublicResolver, ens.address);
  // const resolver = await PublicResolver.deployed();
  //
  // resolverNode = namehash.hash("resolver");
  // resolverLabel = utils.sha3("resolver");
  // // //
  // console.log(1)
  // await ens.setSubnodeOwner(ZERO_ADDRESS, resolverLabel, accounts[0]);
  // console.log(2)
  // await ens.setResolver(ZERO_ADDRESS, resolver.address);
  // console.log(3)
  // await resolver.setAddr(resolverNode, resolver.address);
  // console.log(4)
  // // await ens.setSubnodeRecord(ZERO_ADDRESS, resolverLabel, "0x34ec97d460062aE53DAAd56B68a85A95Fe773cb9", "0x74E14CDc6091B39e82573347d93452577279f652", 0, {from: accounts[0]});

  // return await deploy(deployer, network, accounts);
}

async function deploy(deployer, network, accounts) {
  await deployer.deploy(ENS);
  const ens = await ENS.deployed();

  // await setupResolver(ens, resolver, accounts);

  await deployer.deploy(OwnedResolver);
  const ownedResolver = await OwnedResolver.deployed();

  // Deploy and activate the .eth registrar
  await deployer.deploy(BaseRegistrarImplementation, ens.address, ETH_NODE, {from: accounts[0]});
  const registrar = await BaseRegistrarImplementation.deployed();

  await ens.setSubnodeRecord(ZERO_ADDRESS, ETH_LABEL, registrar.address, ownedResolver.address, 0, {from: accounts[0]});

  // const registrar = await deployer.deploy(FIFSRegistrar, ens.address, namehash.hash(tld));

  await setupRegistrar(ens, registrar, accounts);

  // await deployer.deploy(PublicResolver, ens.address);
  // const publicResolver = await PublicResolver.deployed();
  //
  // console.log('01')
  // await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", ETH_LABEL, accounts[0]);
  // console.log('02')
  // ens.setResolver(ETH_NODE, publicResolver.address);
  // console.log('03')
  // publicResolver.setAddr(ETH_NODE, publicResolver.address);

  await registrar.addController(accounts[0], {from: accounts[0]});
  console.log(1)
  await registrar.register(utils.sha3('resolver'), accounts[0], 31536000, {from: accounts[0]});
  console.log(2)
  await ens.setResolver(namehash.hash('resolver.one'), ownedResolver.address, {from: accounts[0]});
  console.log(3)
  await ownedResolver.setAddr(namehash.hash("resolver.one"), ownedResolver.address);
  console.log(4)
  await registrar.removeController(accounts[0], {from: accounts[0]});

  // await registrar.register(utils.sha3('resolver.eth'), accounts[0], 31536000, {from: accounts[0]});
  // await ens.setResolver(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});

  // const reverseRegistrar = await deployer.deploy(ReverseRegistrar, ens.address, resolver.address);

  // await setupReverseRegistrar(ens, resolver, reverseRegistrar, accounts);

  // Deploy - but don't activate - the standard controller
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

  // console.log('registrar.register 1')
  // await registrar.register(utils.sha3('resolver.eth'), accounts[0], 31536000, {from: accounts[0]});
  // console.log('registrar.register 2')
  // await ens.setResolver(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});
  // await ens.setAddr(namehash.hash('resolver.eth'), resolver.address, {from: accounts[0]});
  // console.log('registrar.register 3')

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

  await test(ethRegistrarController, ownedResolver, accounts);
};

async function test(controller, resolver, accounts) {
  console.log(1)

  const commitment = await controller.makeCommitmentWithConfig(
      "test",
      accounts[0],
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      resolver.address,
      accounts[0],
      { from: accounts[0] }
  )

  console.log(2)

  await controller.commit(commitment, { from: accounts[0] })

  console.log(3, 'sleep')

  await sleep(65);

  console.log(31)

  await controller.registerWithConfig(
      "test",
      accounts[0],
      299536000,
      "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
      resolver.address,
      accounts[0],
      { from: accounts[0], value: 5e18 }
  );

  console.log(4)
}

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = utils.sha3("resolver");

  console.log('resolverLabel', resolverLabel);
  console.log('accounts', accounts[0]);

  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", resolverLabel, accounts[0]);

  console.log('resolver.address', resolver.address);
  console.log('resolverNode', resolverNode);

  await ens.setResolver(resolverNode, resolver.address);
  await resolver.setAddr(resolverNode, resolver.address);
}

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3(tld), registrar.address);
}

async function setupReverseRegistrar(ens, resolver, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), utils.sha3("addr"), reverseRegistrar.address);
}



/*
const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
const ENSRegistryWithFallback = artifacts.require('@ensdomains/ens/ENSRegistryWithFallback');
const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar");
const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar");
const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");
const OwnedResolver = artifacts.require('@ensdomains/resolver/OwnedResolver');
const BaseRegistrarImplementation = artifacts.require('@ensdomains/ethregistrar/BaseRegistrarImplementation');
const ENSMigrationSubdomainRegistrar = artifacts.require("@ensdomains/subdomain-registrar/ENSMigrationSubdomainRegistrar");


const utils = require('web3-utils');
const namehash = require('eth-ens-namehash');

const tld = "eth";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ETH_LABEL = sha3("eth");
const ETH_NODE = namehash.hash("eth");

module.exports = async (deployer, network, accounts) => {
  let ens;
  let publicResolver;
  let ownedResolver;
  let registrar;

  // Deploy the registry
    ens = deployer.deploy(ENSRegistryWithFallback);

    // Deploy a new public resolver
  publicResolver = deployer.deploy(PublicResolver, ens.address);

    // Deploy the OwnedResolver for .eth
    ownedResolver = deployer.deploy(OwnedResolver);

    // Deploy and activate the .eth registrar
    registrar = await deployer.deploy(BaseRegistrarImplementation, ENSRegistryWithFallback.address, config.ETH_NODE, {from: accounts[1]});
    await ens.setSubnodeRecord(ZERO_ADDRESS, ETH_LABEL, BaseRegistrarImplementation.address, ownedResolver.address, 0, {from: accounts[1]});

    // Deploy a new subdomain registrar
    await deployer.deploy(ENSMigrationSubdomainRegistrar, ens.address, {from: accounts[0], gas: 4000000});


    // // Registry
  // deployer.deploy(ENS)
  // // Resolver
  //     .then(function(ensInstance) {
  //       ens = ensInstance;
  //       return deployer.deploy(PublicResolver, ens.address);
  //     })
  //     .then(function(resolverInstance) {
  //       resolver = resolverInstance;
  //     })
  //     .then(function() {
  //         return setupResolver(ens, resolver, accounts);
  //     })
  //     // Registrar
  //     .then(function() {
  //       return deployer.deploy(FIFSRegistrar, ens.address, namehash.hash(tld));
  //     })
  //     .then(function(registrarInstance) {
  //       registrar = registrarInstance;
  //       return setupRegistrar(ens, registrar, accounts);
  //     })
  //     // Reverse Registrar
  //     .then(function() {
  //       return deployer.deploy(ReverseRegistrar, ens.address, resolver.address);
  //     })
  //     .then(function(reverseRegistrarInstance) {
  //       return setupReverseRegistrar(ens, resolver, reverseRegistrarInstance, accounts);
  //     })
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver.eth");
  const resolverLabel = utils.sha3("resolver.eth");

  console.log('resolverLabel', resolverLabel);
  console.log('accounts', accounts[0]);

  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", resolverLabel, accounts[0]);

  console.log('resolver.address', resolver.address);
  console.log('resolverNode', resolverNode);

  await ens.setResolver(resolverNode, resolver.address);
  await resolver.setAddr(resolverNode, resolver.address);
}

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3(tld), registrar.address);
}

async function setupReverseRegistrar(ens, resolver, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), utils.sha3("addr"), reverseRegistrar.address);
}
*/
