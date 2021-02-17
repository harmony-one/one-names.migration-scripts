pragma solidity >=0.4.25;

// We need this to persuade Truffle to compile all the code we want to use.

import "@ensdomains/ens/ENSRegistry";
import "@ensdomains/ens/FIFSRegistrar";
import "@ensdomains/ens/ReverseRegistrar";

import '@ensdomains/resolver/DefaultReverseResolver';
import "@ensdomains/resolver/PublicResolver";
import '@ensdomains/resolver/OwnedResolver';

import '@ensdomains/ethregistrar/StablePriceOracle';
import '@ensdomains/ethregistrar/DummyOracle';
import '@ensdomains/ethregistrar/ETHRegistrarController';
import '@ensdomains/ethregistrar/BaseRegistrarImplementation';

import '@ensdomains/root/Root';
