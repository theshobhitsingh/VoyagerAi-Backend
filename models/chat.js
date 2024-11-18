import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a model for the "chats" collection
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
