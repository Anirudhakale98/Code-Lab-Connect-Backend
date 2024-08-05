import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignments",
      required: [true, "Assignment ID is required"],
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student ID is required"],
    },
    submission: {
      type: {
        code: String,
        input: String,
        output: String,
      },
    },
    marks: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Submissions = mongoose.model("Submissions", submissionSchema);
