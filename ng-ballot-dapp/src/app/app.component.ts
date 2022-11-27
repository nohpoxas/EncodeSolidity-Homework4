import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ethers } from 'ethers';
import tokenJson from '../assets/MyToken.json';

// claimTokensDto should be preferably in another file
export class claimTokensDto {
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

  constructor(private http: HttpClient) {
    this.provider = ethers.getDefaultProvider('goerli');
    this.http
      .get<any>('http://localhost:3000/token-contract-address')
      .subscribe((ans) => {
        this.tokenAddress = ans.result;
      });
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
          this.votePower = parseFloat(
            ethers.utils.formatEther(votingPowerBN)
          );
        }
      );
    }
  }

  createWallet() {
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

  importWallet(privateKey: string) {
    // TODO (optional): make this.wallet to be imported from private key
    this.updateValues();
  }

  requestTokens() {
    const body = new claimTokensDto(this.wallet?.address ?? '');
    this.http
      .post<any>('http://localhost:3000/claim-tokens', body)
      .subscribe((ans) => {
        const txHash = ans.result;
        // TODO: const tx = this.provider.getTransaction(txHash);
        // TODO: tx.wait()
        // TODO: aster tx confirms we can call updateValues again
      });
  }

  connectBallot(ballotAddress: string) {
    //TODO: connect a ballot instance attached to this address
    //TODO: fetch information of that ballot to be displayed in the page
  }
}
