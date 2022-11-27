import { Injectable } from '@nestjs/common';

import { BigNumber, ethers } from "ethers";
import { MyToken__factory, MyToken } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config()
import contractsData from './assets/contracts_data'
import { Hash } from 'crypto';

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
//const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
const provider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
const signer = wallet.connect(provider);
const tokenContractFactory = new MyToken__factory(signer);
const tokenContract: MyToken = tokenContractFactory.attach(process.env.TOKEN_CONTRACT_ADDRESS ?? "");

@Injectable()
export class AppService {
  getHello(): string {
    return 'Encode Solidity Bootcamp project week 4 - Group 4';
  }

  tokenContractAddress() {
    return {result: contractsData.Token.address};
  }

  ballotContractAddress() {
    return {result: contractsData.Ballot.address};
  }

  async claimTokens(address: string) {
    //recalculate prize
    let nonce = await provider.getTransactionCount(signer.address)
    let overrides = {
      //value : ethers.utils.parseEther('1'),
      gasPrice: ethers.utils.parseUnits('10', 'gwei'),
      gasLimit: ethers.utils.hexlify(1000000),
      nonce
    }
    try {
      let tx = await tokenContract.mint(address, '1', overrides)
      await tx.wait()
      return {
        status:'ok',
        result: tx
      }
    } catch (e) {
      return {
        status:'nok',
        error:e.reason,
        myMessage:'probably the signer on the server has not the minter role, check on goerli scan',
        txhash:e.transactionHash,
        result:''
    }
    }

  }
  async getParticipantsBalance() {

    let voterAddress;
    let balance: BigNumber;
    let votePower;
    let balanceAll = []
    let data = {}
    let name
    name = "Alessandro Morandi"
    voterAddress = "0xb91bc2a105c03667930b5ebe639e7914c5763bdb";
    balance = await tokenContract.balanceOf(voterAddress);
    votePower = await tokenContract.getVotes(voterAddress);
    data = {
      name,
      voterAddress,
      balance: balance.toString(),
      votePower: votePower.toString()
    }
    balanceAll.push(data)

    name = "José Henrique K. Ambiel"
    voterAddress = "0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa";
    balance = await tokenContract.balanceOf(voterAddress);
    votePower = await tokenContract.getVotes(voterAddress);
    data = {
      name,
      voterAddress,
      balance: balance.toString(),
      votePower: votePower.toString()
    }
    balanceAll.push(data)

    name = "Marcello Rigotti"
    voterAddress = "0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8";
    balance = await tokenContract.balanceOf(voterAddress);
    votePower = await tokenContract.getVotes(voterAddress);
    data = {
      name,
      voterAddress,
      balance: balance.toString(),
      votePower: votePower.toString()
    }
    balanceAll.push(data)

    name = "Sobhan Bahrami"
    voterAddress = "0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da";
    balance = await tokenContract.balanceOf(voterAddress);
    votePower = await tokenContract.getVotes(voterAddress);
    data = {
      name,
      voterAddress,
      balance: balance.toString(),
      votePower: votePower.toString()
    }
    balanceAll.push(data)

    name = "Jeremy Bernard"
    voterAddress = "0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7";
    balance = await tokenContract.balanceOf(voterAddress);
    votePower = await tokenContract.getVotes(voterAddress);
    data = {
      name,
      voterAddress,
      balance: balance.toString(),
      votePower: votePower.toString()
    }

    return { result: balanceAll }
  }

}
