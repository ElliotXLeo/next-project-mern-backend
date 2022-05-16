import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    deadline: {
      type: Date,
      default: Date.now(),
      required: true
    },
    customer: {
      type: String,
      trim: true,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
      }
    ],
    developers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('project', projectSchema);
export default Project;