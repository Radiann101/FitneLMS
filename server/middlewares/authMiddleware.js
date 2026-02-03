import { clerkClient } from "@clerk/express";

// Middleware (Protect Admin route)
export const protectAdmin = async (req, res, next) => {
    try {
        // Change from req.auth.userId to req.auth()
        const { userId } = req.auth(); 

        if (!userId) {
            return res.json({ success: false, message: 'Unauthorized Access: No Session' });
        }

        const response = await clerkClient.users.getUser(userId);

        if (response.publicMetadata.role !== 'admin') {
            return res.json({ success: false, message: 'Unauthorized Access: Admin role required' });
        }

        next();

    } catch (error) {
        // If getUser fails (e.g. user deleted in Clerk but session still active)
        res.json({ success: false, message: error.message });
    }
}