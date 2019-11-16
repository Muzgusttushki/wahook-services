import { Injectable, Body, HttpModule, HttpService } from '@nestjs/common';
import { SheetObject, WidgetInitObject, WidgetLazyObject, WidgetSeatsObject, WidgetOrder, WidgetConfirmObject, WidgetPaymentObject } from './schemas/sheet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ISheet } from './schemas/db/sheets';
import { Model } from 'mongoose';
import { LoggerService } from '../../utils/logger';
import { IWidget } from './schemas/db/widget';
import { IAddress, IPostal } from './schemas/db/address';
import { ObjectID } from 'bson';
import { IGender } from './schemas/db/gender'

@Injectable()
export class EntriesService {
    constructor(
        @InjectModel('sheets')
        private readonly sheetsSchema: Model<ISheet>,
        @InjectModel('buyers')
        private readonly widgetSchema: Model<IWidget>,
        @InjectModel('addresses')
        private readonly addressSchema: Model<IAddress>,
        @InjectModel('postals')
        private readonly postalsSchema: Model<IPostal>,
        @InjectModel('genders') private readonly genderSchema: Model<IGender>,
        private readonly http: HttpService
    ) { }
    logger: LoggerService = new LoggerService('VIS');

    async sheet(sheet: SheetObject, address: String,
        source: String) {

        await new this.sheetsSchema({
            address,
            sourceDetails: sheet.source,
            analytics: sheet.analytics,
            source,
            os: sheet.os,
            browser: sheet.browser,
            product: sheet.product,
            date: new Date()
        }).save().catch(resolve => {
            this.logger.error(resolve)
        })

        return 'OK'
    }

    async detectGender(name: String) {
        const transliterate = (
            function () {
                const rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
                    eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);

                return function (text, engToRus) {
                    var x;
                    for (x = 0; x < rus.length; x++) {
                        text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                        text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                    }
                    return text;
                }
            }
        )();

        const request = await this.genderSchema.findOne({
            $or: transliterate(name.toLowerCase().replace(/\s\s+/g, ' '), true).split(' ').map(resolve => {
                return { Name: { $regex: resolve, $options: 'i' } }
            })
        }).exec()

        if (request) {
            const { Sex } = request
            return Sex
        }

        return null
    }

    async widgetPayment(widget: WidgetPaymentObject) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            status: 'WIDGET_PAYMENT'
        }).catch(resolve => {
            this.logger.error(resolve)
        })
    }

    async widgetConfirm(widget: WidgetConfirmObject) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            tickets: widget.tickets,
            payment: widget.payment,
            orderId: widget.orderId,
            buyer: {
                ...widget.buyer,
                gender: await this.detectGender(widget.buyer.name)
            },
            status: 'WIDGET_SUCCESS'
        } as IWidget).catch(resolve => {
            this.logger.error(resolve)
        })
    }

    async widgetOrder(widget: WidgetOrder) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            status: 'WIDGET_ORDER'
        }).catch(resolve => {
            this.logger.error(resolve)
        })
    }

    async widgetUnSeat(widget: WidgetSeatsObject) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            $push: {
                trash: {
                    price: widget.price,
                    quantity: widget.quantity,
                    variant: widget.variant
                }
            },
            status: 'WIDGET_UNSEAT'
        }).catch(resolve => {
            this.logger.error(resolve)
        })
    }

    async widgetSeat(widget: WidgetSeatsObject) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            $push: {
                tickets: {
                    price: widget.price,
                    quantity: widget.quantity,
                    variant: widget.variant
                }
            },

            status: 'WIDGET_SEAT'
        }).catch(resolve => {
            this.logger.error(resolve)
        })
    }

    async widgetLazy(widget: WidgetLazyObject) {
        this.widgetSchema.updateOne({
            _id: new ObjectID(widget.session as string)
        }, {
            event: widget.event,

            status: 'WIDGET_LAZY'
        }).catch(resolve => {
            this.logger.error(resolve)
        })

        return 'OK'
    }

    async widgetOpen(widget: WidgetInitObject, source: string, address: string) {
        const addressInfo = await this.getAddressDetails(address)
        const session = await new this.widgetSchema({
            v1: true,
            browser: widget.browser,
            analytics: widget.analytics,
            os: widget.os,
            product: widget.product,
            utm: widget.utm,
            address: address,
            source: source,
            addressInfo,
            status: 'WIDGET_OPEN',
            date: new Date()
        } as IWidget)
            .save()
            .then(resolve => {
                return resolve['_id']
            })
            .catch(resolve => {
                this.logger.error(resolve)
                return null
            })

        return session
    }

    async getAddressDetails(address: string) {
        const access = "82c35ecad84b87"
        return await this.addressSchema.findOne({
            address
        })
            .exec()
            .then(async resolve => {
                if (resolve) {
                    return resolve;
                }

                const info = await this.http.get(`https://ipinfo.io/${address}?token=${access}&lang=ru`).toPromise().then(async resolve => {
                    const { city, region, country, postal, timezone } = resolve.data

                    return await new this.addressSchema({
                        address: address,
                        city,
                        country,
                        zip: postal,
                        timezone,
                        region
                    } as IAddress).save()
                })

                return info
            })
            .catch((error) => {
                this.logger.error(error)
                return {}
            })
    }
}
