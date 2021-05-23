import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ABI, ADDERSS } from '../Contracts/myWallet'


const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
		infuraId: "INFURA_ID" // required
		}
	}
};

const web3Modal = new Web3Modal({
	cacheProvider: true, // optional
	providerOptions // required
});


export async function getMyWallet() {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

	const myWallet = new web3.eth.Contract(ABI, ADDERSS);

	web3.eth.getBalance(provider.selectedAddress)
		.then(res => console.log(`before: ${res}`));	

	const wallet = {
		myWallet,
		owner: provider.selectedAddress
	};

    return wallet;
}

export async function getBalance(myWallet, owner) {
    try{
		const balance = await myWallet.methods.getBalance(owner).call();
		return balance;
	}catch(err){
		return 'unable to fetch your balance';
	}
}

export async function transfer(myWallet, owner, to_address, amount) {

	try{
		if(amount <= 0 || to_address === ""){
			throw Error("invalid input")
		}
		await myWallet.methods.withdraw(amount, owner).send({from: owner});
	}catch(err){
		// TODO:/ show pop-up
		console.log(`error: ${err.message}`);
		return null;
	}

	try{
		await myWallet.methods.deposit(amount, to_address).send({from: owner});
	}catch(err){
		// TODO:/ show pop-up
		console.log(`error: ${err.message}`);
		return null;
	}
	
	try{
		const balance = await myWallet.methods.getBalance(owner).call();
		return balance;
	}catch(err){
		return null;
	}
}
