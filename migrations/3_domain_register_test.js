const ETHRegistrarController = artifacts.require('@ensdomains/ethregistrar/ETHRegistrarController');
const OwnedResolver = artifacts.require('@ensdomains/resolver/OwnedResolver');

const namehash = require('eth-ens-namehash');

const sleep = (sec) => new Promise(resolve => setTimeout(resolve, 1000 * sec))

module.exports = async function(deployer, network, accounts) {
    console.log('Controller address: ', ETHRegistrarController.address);
    console.log('Resolver address: ', OwnedResolver.address);

    console.log('User account: ', accounts[0]);

    const domain = 'test-789';
    const duration = 60 * 60 * 24 * 365; // 1 year

    console.log('New domain: ', domain);

    const controller = await ETHRegistrarController.at(ETHRegistrarController.address);
    const resolver = await OwnedResolver.at(OwnedResolver.address);

    const rentPrice = await controller.rentPrice(domain, duration);

    console.log('rentPrice: ', Number(rentPrice) / 1e18);

    console.log('1 - makeCommitmentWithConfig')

    const commitment = await controller.makeCommitmentWithConfig(
        domain,
        accounts[0],
        "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
        OwnedResolver.address,
        accounts[0],
        {from: accounts[0]}
    )

    console.log('2 - commit: ', commitment)

    await controller.commit(commitment, {from: accounts[0]})

    console.log('3 - sleep 61 sec')

    await sleep(61);

    console.log('4 - registerWithConfig')

    await controller.registerWithConfig(
        domain,
        accounts[0],
        duration,
        "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
        resolver.address,
        accounts[0],
        {from: accounts[0], value: rentPrice}
    );

    console.log('5 - success')

    const address = await resolver.addr(namehash.hash(domain + '.one'));

    console.log('6 - resolved address: ', address, address === accounts[0]);
}
