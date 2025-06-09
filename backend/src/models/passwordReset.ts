import mongoose, { ObjectId, Schema } from "mongoose";

interface IPasswordReset extends Document{
    userId : ObjectId
    resetCode: string;
    expiresAt: Date;  
    used: Boolean
}

const PasswordResetSchema = new Schema<IPasswordReset>({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    resetCode: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        required: true 
    },
    used: {
        type: Boolean,
        default: false,
      },
})

export const PasswordReset = mongoose.model<IPasswordReset>('PasswordReset', PasswordResetSchema);
