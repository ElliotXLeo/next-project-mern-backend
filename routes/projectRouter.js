import { Router } from "express";
import { addDeveloper, createProject, deleteProject, getTasks, readProject, readProjects, removeDeveloper, updateProject } from "../controllers/projectController.js";
import checkAuth from "../middleware/checkAuth.js";

const projectRouter = Router();

projectRouter.route('/')
  .post(checkAuth, createProject)
  .get(checkAuth, readProjects);

projectRouter.route('/:id')
  .get(checkAuth, readProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, deleteProject);

projectRouter.post('/add-developer/:id', checkAuth, addDeveloper);
projectRouter.delete('/remove-developer/:id', checkAuth, removeDeveloper);
projectRouter.get('/tasks/:id', checkAuth, getTasks);

export default projectRouter;