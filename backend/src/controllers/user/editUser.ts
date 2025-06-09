import { Request, Response } from "express";
import { User } from "../../models/user";

export default async function(req:Request, res: Response){
    try {
        const userId = req.session.userId

        if(userId){
            res.status(401).json({
                status: "401",
                message: "Unauthorized!"
            })
        }
        const { firstName, lastName, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(phone && { phone }),
            },
            {new: true, runValidators: true}
        ).select("-password")

        if(!updatedUser){
            res.status(404).json({
                status: "404",
                message: "User not found"
            })
        }

    } catch (error) {
        
    }
}