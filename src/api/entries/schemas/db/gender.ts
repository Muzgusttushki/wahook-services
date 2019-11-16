import { Types } from "mongoose";
import * as mongoose from 'mongoose'

interface IGender extends mongoose.Document {
    _id: Types.ObjectId,
    Name: String,
    Sex: Number,
    PeoplesCount: Number
}


const genderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Name: String,
    Sex: Number,
    PeoplesCount: Number
})

export { genderSchema, IGender }