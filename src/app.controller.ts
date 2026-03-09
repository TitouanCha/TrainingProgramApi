import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { start } from 'repl';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('planning')
  @UseGuards(JwtAuthGuard)
  async getUserPlanning(@Query("startDate") startDate: string, @Query("endDate") endDate: string, @Req() req, ){
    const userId = req.user.userId
    return this.appService.getUserTraining([startDate, endDate], userId)
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
