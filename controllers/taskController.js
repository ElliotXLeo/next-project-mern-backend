import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { project } = req.body;
    const existingProject = await Project.findById(project);
    if (existingProject === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (existingProject.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      const taskCreated = await Task.create(req.body);
      res.status(200).json(taskCreated);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const readTasks = async (req, res) => { };

export const readTask = async (req, res) => { };

export const updateTask = async (req, res) => { };

export const deleteTask = async (req, res) => { };

export const changeTaskStatus = async (req, res) => { };