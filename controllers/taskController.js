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
      existingProject.tasks.push(taskCreated._id);
      await existingProject.save();
      res.status(200).json(taskCreated);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const readTasks = async (req, res) => { };

export const readTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');
    if (task === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      return res.status(200).json(task);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');
    if (task === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.deadline = req.body.deadline || task.deadline;
      task.priority = req.body.priority || task.priority;
      const savedTask = await task.save();
      return res.status(200).json(savedTask);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project').populate('developer');
    if (task === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (
      task.project.owner.toString() !== req.user._id.toString() &&
      task.project.developers.some(element => element._id.toString() === req.user._id.toString()) === false
    ) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      task.state = !task.state;
      task.developer = req.user._id;
      await task.save();
      const savedTask = await Task.findById(id).populate('project').populate('developer');
      return res.status(200).json(savedTask);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project');
    if (task === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (task.project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      const project = await Project.findById(task.project);
      project.tasks.pull(task._id);
      await Promise.allSettled([await project.save(), await task.deleteOne()]);
      return res.status(200).json({
        message: 'Proyecto eliminado'
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};