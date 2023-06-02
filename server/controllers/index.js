import Todo from '../models/schema.js'

export const getTodo=(req,res)=>{
    Todo.find()
    .then((todos)=>res.json(todos))
    .catch((err) => res.status(400).json('Error'+err));
}

export const createTodo=(req,res)=>{
    const {title, description, status, date} = req.body
    const newTodo = new Todo({
        title,
        description,
        status,
        date,
    });
    newTodo.save()
    .then(() => res.json('Todo added successfully!'))
    .catch((err) => res.status(400).json('Error'+err))
}

export const updateTodo=(req,res)=>{
    const {id} = req.params;
    const {title, description, status, date} = req.body;
    Todo.findByIdAndUpdate(id, { title, description, status, date })
      .then(() => res.json('Todo updated successfully!'))
      .catch((err) => res.status(400).json('Error'+err))
}

export const deleteTodo=(req,res)=>{
    const {id} = req.params;
    Todo.findByIdAndDelete(id)
        .then(() => res.json('Todo deleted successfully!'))
        .catch((err) => res.status(400).json('Error'+err));
}

