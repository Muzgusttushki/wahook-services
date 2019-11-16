import { Module, HttpModule } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetSchema } from './schemas/db/sheets';
import { AddressSchema, PostalSchema } from './schemas/db/address';
import { WidgetSchema } from './schemas/db/widget';
import { genderSchema } from './schemas/db/gender';

const SheetsCollection = MongooseModule.forFeature([{ name: 'sheets', schema: SheetSchema }]),
    WidgetsCollection = MongooseModule.forFeature([{ name: 'buyers', schema: WidgetSchema }]),
    AddressesCollection = MongooseModule.forFeature([{ name: 'addresses', schema: AddressSchema }]),
    PostalsCollection = MongooseModule.forFeature([{ name: 'postals', schema: PostalSchema }]),
    GendersCollection = MongooseModule.forFeature([{ name: 'genders', schema: genderSchema }])


@Module({
    controllers: [EntriesController],
    providers: [EntriesService],
    imports: [SheetsCollection,
        WidgetsCollection,
        AddressesCollection,
        PostalsCollection,
        GendersCollection,
        HttpModule]
})
export class EntriesModule { }
