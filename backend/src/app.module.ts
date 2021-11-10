import { Module } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mySqlConfig } from './config/app.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './collections/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(mySqlConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
