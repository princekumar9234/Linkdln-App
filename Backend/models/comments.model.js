import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status_accepted: {
    type: Boolean,
    default: null,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
