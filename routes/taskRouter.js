import { Router } from "express";
import { changeTaskStatus, createTask, deleteTask, readTask, updateTask } from "../controllers/taskController.js";
import checkAuth from "../middleware/checkAuth.js";

const taskRouter = Router();

taskRouter.route('/')
  .post(checkAuth, createTask)

taskRouter.route('/:id')
  .get(checkAuth, readTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

taskRouter.post('/state/:id', checkAuth, changeTaskStatus);

export default taskRouter;