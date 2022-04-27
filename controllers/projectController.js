import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = new Project(req.body);
  project.owner = req.user._id;
  try {
    const savedProject = await project.save();
    res.json(savedProject);
    console.log(savedProject);
  } catch (error) {
    console.log(error.message);
  }
};

export const readProjects = async (req, res) => { };

export const readProject = async (req, res) => { };

export const updateproject = async (req, res) => { };

export const deleteproject = async (req, res) => { };

export const addDeveloper = async (req, res) => { };

export const removeDeveloper = async (req, res) => { };

export const getTasks = async (req, res) => { };
