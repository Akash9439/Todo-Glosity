import mongoose from "mongoose"

const TodoSchema=new mongoose.Schema({
    title:{
        type:"String",
        required:true,
    },
    description:{
        type:"String",
    },
    date:{
        type:Date,
        default:new Date()
    },
    status:{
        type:"String",
    }
})

const Todo=mongoose.model("todo",TodoSchema)

export default Todo