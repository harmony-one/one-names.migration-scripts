const ETHRegistrarController = artifacts.require('@ensdomains/ethregistrar/ETHRegistrarController');
const OwnedResolver = artifacts.require('@ensdomains/resolver/OwnedResolver');

const sleep = (sec) => new Promise(resolve => setTimeout(resolve, 1000 * sec))

module.exports = async function(deployer, network, accounts) {
    console.log('Controller address: ', ETHRegistrarController.address);
    console.log('Resolver address: ', OwnedResolver.address);

    console.log('User account: ', accounts[0]);

    const controller = await ETHRegistrarController.at(ETHRegistrarController.address);
    const resolver = await OwnedResolver.at(OwnedResolver.address);

    console.log('1 - makeCommitmentWithConfig')

    const commitment = await controller.makeCommitmentWithConfig(
        "test",
        accounts[0],
        "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
        OwnedResolver.address,
        accounts[0],
        {from: accounts[0]}
    )

    console.log('2 - commit: ', commitment)

    await controller.commit(commitment, {from: accounts[0]})

    console.log('3 - sleep 65 sec')

    await sleep(65);

    console.log('4 - registerWithConfig')

    await controller.registerWithConfig(
        "test",
        accounts[0],
        299536000,
        "0xe6bcec774acd54b71bd49ca5570f4bae074e7d983cad8a3162b480219adecdea",
        resolver.address,
        accounts[0],
        {from: accounts[0], value: 5e18}
    );

    console.log('5 - success')
}