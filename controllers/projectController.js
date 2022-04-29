import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    project.owner = req.user._id;
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error.message);
  }
};

export const readProjects = async (req, res) => {
  try {
    const projects = await Project.find().where('owner').equals(req.user);
    res.status(200).json(projects);
  } catch (error) {
    console.log(error.message);
  }
};

export const readProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      const tasks = await Task.find().where('project').equals(project._id);
      return res.status(200).json({
        project,
        tasks
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      project.name = req.body.name || project.name;
      project.description = req.body.description || project.description;
      project.deadline = req.body.deadline || project.deadline;
      project.customer = req.body.customer || project.customer;
      const savedProject = await project.save();
      return res.status(200).json(savedProject);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      await project.deleteOne();
      return res.status(200).json({
        message: 'Proyecto eliminado'
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addDeveloper = async (req, res) => { };

export const removeDeveloper = async (req, res) => { };

export const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project === null) {
      const error = new Error('Datos incorrectos');
      return res.status(404).json({
        message: error.message
      });
    } else if (project.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida');
      return res.status(401).json({
        message: error.message
      });
    } else {
      const tasks = await Task.find().where('project').equals(id);
      return res.status(200).json(tasks);
    }
  } catch (error) {
    console.log(error.message);
  }
};
