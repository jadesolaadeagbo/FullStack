import { Request, Response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcrypt"

export default async function signup(req: Request, res: Response):Promise<void>{
    try {
        const {firstName, lastName, email, phone, password} = req.body;

        if(!firstName || !lastName || !email || !phone || !password){
            res.status(400).json({
                status:"400",
                message:"All fields are required!"
            })
            return;
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            res.status(400).json({
                status:"400",
                message:"User already exists!"               
            })
            return;

        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({
            status: "200",
            message: "A new user created."
        })


    } catch (error) {
        console.error("Error in signup controller!", error)
        res.status(500).json({ error: "Internal server error" })
    }
}