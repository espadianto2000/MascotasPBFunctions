import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Use a service account in production
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Explicitly type as Promise<void>
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return; // Stop further execution, but do not return a value
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Invalid token format" });
      return; // Stop further execution, but do not return a value
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
    return; // Stop further execution, but do not return a value
  }
};
