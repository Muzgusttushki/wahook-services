import * as mongoose from 'mongoose'

interface IWidget extends mongoose.Document {
    session: string,
    address: string,
    v1: boolean,

    addressInfo: {
        city: string,
        country: string,
        zip: string,
        timezone: string,
        region: string
    },

    analytics: {
        google: string,
        yandex: string,
        facebook: string,
        vis: string,
    },

    trash: {
        discount: {
            type: String,
            value: Number,
        },

        price: Number,
        tariff: String,
        quantity: Number,
        promocode: String,
        variant: String
    }[],

    url: string,
    tickets: {
        discount: {
            type: String,
            value: Number,
        },

        price: Number,
        tariff: String,
        quantity: Number,
        promocode: String,
        variant: String
    }[],

    date: Date,

    os: {
        name: string,
        arch: string
    },

    browser: {
        name: string,
        version: string
    },

    product: string,
    source: string,
    status: string,
    event: {
        name: string,
        id: number,
        date: Date
    },

    buyer: {
        name: string,
        phone: string,
        gender: number,
        email: string
    },

    orderId: Number,
    payment: string,
    utm: object
}

const WidgetSchema = new mongoose.Schema({
    v1: Boolean,
    session: String,
    address: String,
    url: String,
    product: String,
    isSheet: Boolean,

    addressInfo: {
        city: String,
        country: String,
        zip: String,
        timezone: String,
        region: String
    },

    analytics: {
        google: String,
        yandex: String,
        facebook: String,
        vis: String,
    },

    trash: Array<{
        discount: {
            type: String,
            value: Number,
        },

        price: Number,
        tariff: String,
        quantity: Number,
        promocode: String,
        variant: String
    }>(),
    tickets: Array<{
        discount: {
            type: String,
            value: Number,
        },

        price: Number,
        tariff: String,
        quantity: Number,
        promocode: String,
        variant: String
    }>(),

    date: Date,

    os: {
        name: String,
        arch: String
    },

    browser: {
        name: String,
        version: String
    },

    source: String,
    status: String,
    event: {
        name: String,
        id: Number,
        date: Date
    },

    buyer: {
        name: String,
        phone: String,
        gender: Number,
        email: String
    },

    orderId: Number,
    payment: String,
    utm: Object
})

export { WidgetSchema, IWidget }
