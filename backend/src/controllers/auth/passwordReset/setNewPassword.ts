import { Request, Response } from "express";
import { User } from "../../../models/user";
import { PasswordReset } from "../../../models/passwordReset";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

export default async function setNewPassword(req: Request, res: Response){
    try {
        const {email, code, newPassword} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({
                status: "404",
                message: "User not found!"
            })
            return;
        }

        const resetRecord = await PasswordReset.findOne({
            userId: user._id,
            resetCode: code,
            expiresAt: {$gt : new Date()},
            used: false,
        })

        if (!resetRecord){
            res.status(400).json({
                status: "400",
                message: "Invalid reset code"
            })
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

        user.password = hashedPassword;

        resetRecord.used = true;

        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER!,
              pass: process.env.EMAIL_PASS!,
            },
          });

          const mailOptions = {
            from: `"FullStack" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Code",
            text: `Hi ${user.firstName},\n\nYour password was successfully changed. If this wasn’t you, please reset your password again immediately or contact our support.\n\nThanks,\nThe FullStack Team`,
          };
      
          await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: "200",
            message: "Your password has been successfully reset."
        })

    } catch (error) {
        console.error("Error in set-new-password controller", error)

        res.status(500).json({
            status: "500",
            message: "Internal server error"
        })
    }
}
