import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ethers } from 'ethers';
import tokenJson from '../assets/MyToken.json';
import tokenizedBallotJson from '../assets/TokenizedBallot.json';

// claimTokensDto should be preferably in another file
export class claimTokensDTO {
  constructor(public address: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.Provider;
  tokenAddress: string | undefined;
  tokenContract: ethers.Contract | undefined;
  tokenizedBallotContract: ethers.Contract | undefined;

  ethBalance: number | undefined;
  tokenBalance: number | undefined;
  votePower: number | undefined;
  totalSupply: number | undefined;

  mintTxHash: string = '';

  ballotAddress: string | undefined;
  ballotTargetBlockNumber: string | undefined;
  ballotProposals: string[] = [];

  addApiKey: boolean = false;
  importWallet: boolean = false;
  updating: boolean = false;

  constructor(private http: HttpClient) {
    this.provider = ethers.getDefaultProvider('goerli');
    this.http
      .get<any>('http://localhost:3000/token-contract-address')
      .subscribe((ans) => {
        this.tokenAddress = ans.result;
      });
  }

  displayAddApiKeyForm() {
    this.addApiKey = true;
    this.importWallet = false;
  }

  displayImportWalletForm() {
    this.addApiKey = false;
    this.importWallet = true;
  }

  logout() {
    this.addApiKey = false;
    this.importWallet = false;
    this.wallet = undefined;
  }

  updateValues() {
    if (this.wallet && this.tokenContract) {
      this.updating = true;
      const ethBalancePromise = this.wallet.getBalance();
      const tokenBalancePromise = this.tokenContract['balanceOf'](
        this.wallet.address
      );
      const votePowerPromise = this.tokenContract['getVotes'](
        this.wallet.address
      );
      const totalSupplyPromise = this.tokenContract['totalSupply']();
      Promise.all([
        ethBalancePromise,
        tokenBalancePromise,
        votePowerPromise,
        totalSupplyPromise,
      ]).then(([ethBalanceBN, tokenBalanceBN, votePowerBN, totalSupplyBN]) => {
        this.ethBalance = parseFloat(ethers.utils.formatEther(ethBalanceBN));
        this.tokenBalance = parseFloat(
          ethers.utils.formatEther(tokenBalanceBN)
        );
        this.votePower = parseFloat(ethers.utils.formatEther(votePowerBN));
        this.totalSupply = parseFloat(ethers.utils.formatEther(totalSupplyBN));
        this.updating = false;
      });
    }
  }

  createProviderFromKey(key: string) {
    this.addApiKey = false;
    if (key) {
      this.provider = new ethers.providers.EtherscanProvider('goerli', key);
    }
  }

  createContractInstanceAndUpdateValues() {
    this.ballotAddress = undefined;
    if (this.tokenAddress) {
      this.tokenContract = new ethers.Contract(
        this.tokenAddress,
        tokenJson.abi,
        this.wallet
      );
    }
    this.updateValues();
  }

  createWallet() {
    this.importWallet = false;
    this.wallet = ethers.Wallet.createRandom().connect(this.provider);
    this.createContractInstanceAndUpdateValues();
  }

  importWalletFromMnemonicOrPrivateKey(mnemonicOrPrivateKey: string) {
    this.importWallet = false;
    switch (mnemonicOrPrivateKey.split(' ').length) {
      case 1:
        this.wallet = new ethers.Wallet(mnemonicOrPrivateKey).connect(
          this.provider
        );
        break;
      case 12:
        this.wallet = ethers.Wallet.fromMnemonic(mnemonicOrPrivateKey).connect(
          this.provider
        );
        break;
      default:
        // TODO return error on frontend to show the user an error happened
        console.error('Input should be a private key or a 12 mnemonic');
    }
    this.createContractInstanceAndUpdateValues();
  }

  async requestTokens() {
    console.log(this.wallet?.address);
    const body = new claimTokensDTO(this.wallet?.address ?? '');
    this.http
      .post<any>('http://localhost:3000/claim-tokens', body)
      .subscribe(async (ans) => {
        this.mintTxHash = ans.result;
        console.log(`Received transaction hash ${ans.result}`);
        const tx = await this.provider.getTransaction(this.mintTxHash);
        const txReceipt = await tx.wait();
        if (txReceipt.status) {
          this.updateValues();
        }
        this.mintTxHash = '';
      });

    //alternative working method to get data from a post
    /*
    await firstValueFrom(this.http.post<any>(`http://localhost:3000/claim-tokens`, body )).then((value) => {
      console.log(value);
    })
*/
  }

  connectBallot(ballotAddress: string) {
    //TODO: connect a ballot instance attached to this address
    //TODO: fetch information of that ballot to be displayed in the page
    this.ballotAddress = ballotAddress;
    this.tokenizedBallotContract = new ethers.Contract(
      ballotAddress,
      tokenizedBallotJson.abi,
      this.wallet
    );
    console.log(`Ballot Contract address ${ballotAddress}`);
    this.tokenizedBallotContract['targetBlockNumber']().then(
      (blockNumber: string) => {
        this.ballotTargetBlockNumber = blockNumber;
      }
    );
    this.ballotProposals = [];
    // Read all proposals from first one
    const ballotProposalsPromises = [];
    for (let i = 0; i < 3; i++) {
      ballotProposalsPromises.push(
        this.tokenizedBallotContract['proposals'](i)
      );
    }
    Promise.all(ballotProposalsPromises).then((proposals: any[]) => {
      this.ballotProposals = proposals.map((proposal) =>
        ethers.utils.toUtf8String(proposal.name)
      );
    });
  }
}
