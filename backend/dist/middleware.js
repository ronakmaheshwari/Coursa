import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./index.js";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if ("userId" in decoded) {
            req.userid = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if ("adminId" in decoded) {
            req.adminId = decoded.adminId;
            next();
        }
        else {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
export { authMiddleware, adminMiddleware };
