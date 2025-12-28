import mongoose, { Document, Schema } from "mongoose";

export interface SessionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema = new Schema<SessionDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        token: { type: String, required: true, unique: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// Indexes
// SessionSchema.index({ token: 1 });
// SessionSchema.index({ userId: 1 });

export const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);
