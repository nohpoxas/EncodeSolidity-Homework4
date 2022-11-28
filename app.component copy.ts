import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ethers } from 'ethers';
import tokenJson from '../assets/MyToken.json';
import { firstValueFrom } from 'rxjs';
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

  ethBalance: number | undefined;
  tokenBalance: number | undefined;
  votePower: number | undefined;
  totalSupply: number | undefined;
  keyy: string | undefined;

  mintTxHash: string = '';

  addApiKey: boolean;
  importWallet: boolean;
  etherscanButton: boolean;
  infuraButton: boolean;

  constructor(private http: HttpClient) {
    this.addApiKey = false;
    this.importWallet = false;
    this.etherscanButton = false;
    this.infuraButton = false;
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
    this.wallet?.getBalance().then((balanceBN) => {
      this.ethBalance = parseFloat(ethers.utils.formatEther(balanceBN));
    });
    if (this.tokenContract) {
      this.tokenContract['balanceOf'](this.wallet?.address).then(
        (balanceBN: ethers.BigNumberish) => {
          this.tokenBalance = parseFloat(ethers.utils.formatEther(balanceBN));
        }
      );
      this.tokenContract['getVotes'](this.wallet?.address).then(
        (votingPowerBN: ethers.BigNumberish) => {
          this.votePower = parseFloat(ethers.utils.formatEther(votingPowerBN));
        }
      );
      this.tokenContract['totalSupply']().then(
        (totalSupplyBN: ethers.BigNumberish) => {
          this.totalSupply = parseFloat(
            ethers.utils.formatEther(totalSupplyBN)
          );
        }
      );
    }
  }

  createProviderFromKey(key: string) {
    this.addApiKey = false;
    if (key) {
      this.provider = new ethers.providers.EtherscanProvider('goerli', key);
    }
  }

  createWallet() {
    this.importWallet = false;
    this.wallet = ethers.Wallet.createRandom().connect(this.provider);
    if (this.tokenAddress) {
      this.tokenContract = new ethers.Contract(
        this.tokenAddress,
        tokenJson.abi,
        this.wallet
      );
    }
    this.updateValues();
  }

  importWalletFromMnemonicOrPrivateKey(mnemonicOrPrivateKey: string) {
    this.importWallet = false;
    const validationArray = mnemonicOrPrivateKey.split(' ');
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
    this.updateValues();
  }

  importPrivateKey() {
    this.http
      .get<any>('http://localhost:3000/get-private-key')
      .subscribe((ans) => {
        this.wallet = new ethers.Wallet(ans.result).connect(this.provider);
      });
    if (this.tokenAddress) {
      this.tokenContract = new ethers.Contract(
        this.tokenAddress,
        tokenJson.abi,
        this.wallet
      );
    }
    this.updateValues();
  }

  async importInfuraApiKey() {
    // let key = '';
    this.http
      .get<any>('http://localhost:3000/get-infura-key')
      .subscribe((ans) => {
        this.keyy = ans.result;
      });
    // if (key) {
    this.provider = new ethers.providers.InfuraProvider('goerli', this.keyy);
    // }
    this.infuraButton = true;
    this.etherscanButton = false;
  }

  async importEtherscanApiKey() {
    // let key = '';
    this.http
      .get<any>('http://localhost:3000/get-etherscan-key')
      .subscribe((ans) => {
        this.keyy = ans.result;
      });
    // if (key) {
    this.provider = new ethers.providers.EtherscanProvider('goerli', this.keyy);
    // }
    this.infuraButton = false;
    this.etherscanButton = true;
  }

  async requestTokens() {
    console.log(this.wallet?.address);
    const body = new claimTokensDTO(this.wallet?.address ?? '');
    console.log(body);
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
    console.log('todo');
  }
}
