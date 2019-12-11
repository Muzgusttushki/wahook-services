import { Module } from '@nestjs/common';
import { EntriesModule } from './api/entries/entries.module';
import { MongooseModule } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { format } from 'util';

const url = format(
  'mongodb://%s:%s@%s/db1?replicaSet=%s&authSource=%s&ssl=true',
  'collector',
  '180477QwE',
  [
    'rc1b-obsi4apyngb4yppx.mdb.yandexcloud.net:27018'
  ].join(','),
  'rs01',
  'db1'
);

const DEBUG_MODE = false;
const NEW_VERSION = true;

const options = {
  useNewUrlParser: true,
  replicaSet: {
    sslCA: readFileSync('/usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt')
  },
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const MONGO_URL =
  'mongodb://localhost:27017/db1'

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const MONGO_URL_NEW = 'mongodb://10.129.0.20:27017/db1'
@Module({
  imports: [
    EntriesModule,
    MongooseModule.forRoot(DEBUG_MODE ? MONGO_URL : NEW_VERSION ? MONGO_URL_NEW : url,
      DEBUG_MODE ? MONGO_OPTIONS : NEW_VERSION ? MONGO_OPTIONS : options)
  ]
})
export class AppModule { }
