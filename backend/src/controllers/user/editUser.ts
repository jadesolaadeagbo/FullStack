import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";


export default async function(req:Request, res: Response, next: NextFunction){
    try {

        const { firstName, lastName, phone } = req.body;

        // @ts-ignore
        const userId = req.session.userId

        if(!userId){
            res.status(401).json({
                status: "401",
                message: "Unauthorized!"
            })
            return;
        }

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
            return;
        }

        res.status(200).json({
            status: "200",
            message:"User details successfully updated!",
            updatedUser
        });


    } catch (error) {
        
    }
}