import mongoose, { Schema } from "mongoose";

const classroomSchema = new Schema(
  {
    classroomId: {
      type: String,
      unique: true,
      required: [true, "Classroom ID is required"],
    },
    classroomName: {
      type: String,
      required: [true, "Classroom name is required"],
    },
    cretedBy: {
      // teacher name
      type: String,
      required: [true, "Created by is required"],
    },
    students: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    assignments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
    },
    submissions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    },
  },
  { timestamps: true }
);

export const Classroom = mongoose.model("Classroom", classroomSchema);
