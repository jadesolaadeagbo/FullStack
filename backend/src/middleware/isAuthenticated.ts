import { Request, Response, NextFunction } from "express";

export default function isAuthenticated (req: Request, res:Response, next:NextFunction){
    if(req.session.userId){
        next();
    }
    else{
        return res.status(401).json({ 
            status: "401",
            message: "You are unauthorized to make this action. Please log in!" 
        });

    }
}