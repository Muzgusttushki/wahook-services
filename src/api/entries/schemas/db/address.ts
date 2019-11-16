import * as mongoose from 'mongoose'

declare interface IAddress extends mongoose.Document {
    address: string,

    city: string,
    country: string,
    district: string,

    timezone: string,
    zip: number
    region: string,
}

const AddressSchema = new mongoose.Schema({
    address: String,

    city: String,
    country: String,
    region: String,
    district: String,

    timezone: String,
    zip: Number
})

declare interface IPostal extends mongoose.Document {
    zip: number,
    regionType: string,
    federal: string,
}

const PostalSchema = new mongoose.Schema({
    zip: Number,
    regionType: String,
    federal: String,
});


export { IAddress, AddressSchema, IPostal, PostalSchema }