import { Component } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  wallet: ethers.Wallet | undefined;

  constructor() { }

  createWallet() {

  }

  importWallet(seedOrPrivateKey: string) {

  }

}
