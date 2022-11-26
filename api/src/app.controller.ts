import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
export class claimTokenPostClass{
  address:string
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('token-contract-address')
  tokenContractAddress(): string {
    return this.appService.tokenContractAddress();
  }

  @Get('ballot-contract-address')
  ballotContractAddress(): string {
    return this.appService.ballotContractAddress();
  }


  @Get('get-participants-balance')
  async getParticipantsBalance() {
    return await this.appService.getParticipantsBalance();
  }

  @Post('claim-tokens')
  claimTokens(@Body() body :claimTokenPostClass){
    return this.appService.claimTokens(body)
  }
}
