import { Router } from "express";
import { addDeveloper, createProject, deleteproject, getTasks, readProject, readProjects, removeDeveloper, updateproject } from "../controllers/projectController";
import checkAuth from "../middleware/checkAuth";

const projectRouter = Router();

projectRouter.route('/')
  .post(checkAuth, createProject)
  .get(checkAuth, readProjects);

projectRouter.route('/:id')
  .get(checkAuth, readProject)
  .put(checkAuth, updateproject)
  .delete(checkAuth, deleteproject);

projectRouter.post('/add-developer/:id', checkAuth, addDeveloper);
projectRouter.delete('/remove-developer/:id', checkAuth, removeDeveloper);
projectRouter.post('/tasks/:id', checkAuth, getTasks);
export default projectRouter;