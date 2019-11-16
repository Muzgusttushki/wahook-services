import { Module } from '@nestjs/common';
import { EntriesModule } from './api/entries/entries.module';
import { MongooseModule } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { format } from 'util';


const url =
  'mongodb://localhost:27017/db1';
const options = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const url_r = format(
  'mongodb://%s:%s@%s/db1?replicaSet=%s&authSource=%s&ssl=true',
  'collector',
  '180477QwE',
  [
    'rc1b-obsi4apyngb4yppx.mdb.yandexcloud.net:27018'
  ].join(','),
  'rs01',
  'db1'
)

const options_r = {
  useNewUrlParser: true,
  replicaSet: {
    sslCA: readFileSync(
      '/usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt')
  },
  useUnifiedTopology: true
}

@Module({
  imports: [
    EntriesModule,
    MongooseModule.forRoot(url_r, options_r)
  ]
})
export class AppModule { }
