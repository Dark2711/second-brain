import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true,
        },
        tags: [{
            type: mongoose.Types.ObjectId,
            ref: "Tag"
        }],
        type: {
            type: String,
            enum: ['image', 'video', 'article', 'audio' ],
            required: true
        },
        userID: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }
)

export const Content = mongoose.model("Content", contentSchema)