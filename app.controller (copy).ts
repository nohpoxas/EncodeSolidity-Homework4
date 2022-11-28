import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class claimTokensDTO {
  address: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('token-contract-address')
  tokenContractAddress() {
    return this.appService.tokenContractAddress();
  }

  @Get('ballot-contract-address')
  ballotContractAddress() {
    return this.appService.ballotContractAddress();
  }

  @Get('get-participants-balance')
  async getParticipantsBalance() {
    return await this.appService.getParticipantsBalance();
  }

  @Get('get-infura-key')
  importInfuraApiKey() {
    return this.appService.importInfuraApiKey();
  }

  @Get('get-etherscan-key')
  importEtherscanApiKey() {
    return this.appService.importEtherscanApiKey();
  }

  @Get('get-private-key')
  importWallet() {
    return this.appService.importWallet();
  }

  @Post('claim-tokens')
  claimTokens(@Body() body: claimTokensDTO) {
    return this.appService.claimTokens(body.address);
  }
}
