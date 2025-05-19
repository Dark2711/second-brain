import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
    {
        hash: {
            type: String,
            required: true,
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }
)

export const Link = mongoose.model("Link", linkSchema)