import express from 'express'
import {getTodo,createTodo,updateTodo,deleteTodo} from '../controllers/index.js'

const userRouter=express.Router();

userRouter.get('/api/todos',getTodo)
userRouter.post('/api/todos',createTodo)
userRouter.put('/api/todos/:id',updateTodo)
userRouter.delete('/api/todos/:id',deleteTodo)

export default userRouter;