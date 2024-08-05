import mongoose, { Schema } from "mongoose";

const assignmentsSchema = new Schema(
  {
    description: {
      // question description
      type: String,
      required: [true, "Description is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    exmple: {
      type: {
        Input: String,
        Output: String,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

export const Assignments = mongoose.model("Assignments", assignmentsSchema);
