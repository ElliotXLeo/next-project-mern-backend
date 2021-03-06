import { Router } from "express";
import { addDeveloper, createProject, deleteProject, getTask, readProject, readProjects, removeDeveloper, searchDeveloper, updateProject } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const projectRouter = Router();

projectRouter.route('/')
  .post(checkAuth, createProject)
  .get(checkAuth, readProjects);

projectRouter.route('/:id')
  .get(checkAuth, readProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, deleteProject);

projectRouter.get('/developers/:email', checkAuth, searchDeveloper);
projectRouter.post('/developers/:id', checkAuth, addDeveloper);
projectRouter.delete('/developers/:id', checkAuth, removeDeveloper);

projectRouter.get('/tasks/:id', checkAuth, getTask);

export default projectRouter;