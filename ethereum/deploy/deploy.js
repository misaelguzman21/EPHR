const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledContracts= require('../compile');

const provider = new HDWalletProvider(
  'mango wool bridge rail agree thank stadium slice detect fluid federal joy',
  'https://sepolia.infura.io/v3/e62dea9220264697a491ddea6b248a35'
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const balance = await web3.eth.getBalance(accounts[0]);
  console.log('Balance:', balance);

  const minBalance = web3.utils.toWei('2', 'ether');
  if (BigInt(balance) < BigInt(minBalance)) {
    console.error('Insufficient funds. Please add more Ether to the account.');
    return;
  }

  try {
    const deployedDoctor = await new web3.eth.Contract(compiledContracts['Doctor'].abi)
      .deploy({ data: compiledContracts['Doctor'].bytecode })
      .send({ from: accounts[0], gas: '3000000' });
    console.log('Doctor deployed to', deployedDoctor.options.address);

    const deployedPatient = await new web3.eth.Contract(compiledContracts['Patient'].abi)
      .deploy({ data: compiledContracts['Patient'].bytecode })
      .send({ from: accounts[0], gas: '3000000' });
    console.log('Patient deployed to', deployedPatient.options.address);

    const deployedEHR = await new web3.eth.Contract(compiledContracts['EHR'].abi)
      .deploy({
        data: compiledContracts['EHR'].bytecode,
        arguments: [deployedDoctor.options.address, deployedPatient.options.address]
      })
      .send({ from: accounts[0], gas: '3000000' });
    console.log('EHR deployed to', deployedEHR.options.address);

  } catch (error) {
    console.error("Error deploying contracts:", error);
  } finally {
    provider.engine.stop();
  }
};

deploy().catch(error => {
  console.error("Error deploying contracts:", error);
  process.exit(1); // Termina el proceso con un código de error
});