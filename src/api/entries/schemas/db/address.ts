import * as mongoose from 'mongoose'

declare interface IAddress extends mongoose.Document {
    address: string,

    city: string,
    country: string,
    district: string,

    timezone: string,
    zip: string,
    region: string,
}

const AddressSchema = new mongoose.Schema({
    address: String,

    city: String,
    country: String,
    region: String,
    district: String,

    timezone: String,
    zip: String,
})

declare interface IPostal extends mongoose.Document {
    zip: string,
    regionType: string,
    federal: string,
}

const PostalSchema = new mongoose.Schema({
    zip: String,
    regionType: String,
    federal: String,
});


export { IAddress, AddressSchema, IPostal, PostalSchema }
