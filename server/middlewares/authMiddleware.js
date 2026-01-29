import { clerkClient } from "@clerk/express";

//Middleware (Protect Admin route)

export const protectAdmin = async (req, res, next)=>{
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== 'admin'){
            return res.json({success:false, message: 'Unauthorized Access'})
        }

        next()

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}