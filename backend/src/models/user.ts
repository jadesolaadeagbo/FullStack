import mongoose,{ Schema, Document, ObjectId, Model } from "mongoose";

export interface IUser extends Document{
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    googleAuth: boolean;
    
}

const UserSchema:Schema<IUser> = new Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: { 
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: true,
        unique:true,
        lowercase: true,
        trim:true
    },
    phone: {
        type: String, 
        required: function(this: any){
            return !this.googleAuth;
        }
    },
    password: { 
        type: String, 
        required: function(this: any){
            return !this.googleAuth;
        }
    },
    googleAuth: { type: Boolean, default: false },

})

export const User:Model<IUser> = mongoose.model<IUser>("User", UserSchema)


