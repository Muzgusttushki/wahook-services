import * as mongoose from 'mongoose'

declare interface ISheet extends mongoose.Document {
    analytics: {
        google: String,
        yandex: String,
        facebook: String
    }

    os: {
        name: String,
        arch: String
    },

    browser: {
        name: String,
        version: String
    },

    product: String,

    date: Date,
    address: String,
    source: String
    sourceDetails: String
}

const SheetSchema = new mongoose.Schema({
    analytics: {
        google: String,
        yandex: String,
        facebook: String
    },

    os: {
        name: String,
        arch: String
    },

    browser: {
        name: String,
        version: String
    },

    product: String,

    date: Date,
    address: String,
    source: String,
    sourceDetails: String
})

export { SheetSchema, ISheet }