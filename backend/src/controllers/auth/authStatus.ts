import { Request, Response } from "express";
import { User } from "../../models/user";


export default async function authStatus(req: Request, res: Response){
    // @ts-ignore
    const userId = req.session.userId;

    if (!userId) {
         res.status(401).json({
            status: "401",
            message: "Not logged in",
        });
        return;
      }

      try {
        const user = await User.findById(userId).select("-password");
    
        if (!user) {
           res.status(404).json({
            status: "404",
            message: "User not found",
          });
          return;
        }
    
         res.status(200).json(user);
      } catch (err) {
        console.error("Error in authStatus:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    
}