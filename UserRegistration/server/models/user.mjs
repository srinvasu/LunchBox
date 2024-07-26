import mongoose from "mongoose";
const { Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max:10
    },
    address: {
        type: String,
        required: true
    },
    following: [{type: Schema.ObjectId, ref: "LunchBox_User"}],
    followers: [{type: Schema.ObjectId, ref: "LunchBox_User"}],
},{timestamps: true});

export default mongoose.model("user",userSchema);