import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
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
    state: {
      type: Boolean,
      default: false,
      required: true
    },
    deadline: {
      type: Date,
      default: Date.now(),
      required: true
    },
    priority: {
      type: String,
      enum: ['Baja', 'Media', 'Alta'],
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('task', taskSchema);
export default Task;