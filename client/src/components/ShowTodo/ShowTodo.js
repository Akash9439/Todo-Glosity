import React,{useState,useEffect} from 'react'
import './ShowTodo.css'
import { Button, Input, DatePicker, Select , Card , Skeleton} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/en-au'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const {TextArea}=Input
moment.locale('en-us');

const ShowTodo = () => {
  const [todos, setTodos] = useState([])
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [date, setDate] = useState('')
  const [status,setStatus]=useState(null)
  const [editMode,setEditMode]=useState(false)
  const [editId,setEditId]=useState(null)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    axios.get('http://localhost:8000/api/todos')
      .then((res)=>setTodos(res.data))
      .catch((err)=>console.log(err))
  },[])

  function handleSubmit(e){
    e.preventDefault();
    if(editMode){
      axios.put(`http://localhost:8000/api/todos/${editId}`, { title, description, status, date })
        .then(() => {
          setTitle('')
          setDescription('')
          setStatus('')
          setDate(null)
          setEditMode(false)
          setEditId(null)
          axios.get('http://localhost:8000/api/todos')
            .then(response => {
              toast.success("Task updated successfully")
              setTodos(response.data)
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    }else{
      axios.post('http://localhost:8000/api/todos', { title, description, status, date })
        .then(() => {
          setTitle('')
          setDescription('')
          setStatus('')
          setDate(null)
          axios.get('http://localhost:8000/api/todos')
            .then((response) => {
              if(response.status===200){
                toast.success("Task created successfully")
              }
              setTodos(response.data)
            })
            .catch((error) => console.log(error))
        })
        .catch(error => {
          toast.error("Failed to create the task")
          console.error(error)
        });
    }
  }
  function handleEdit(todo){
    setTitle(todo.title)
    setDescription(todo.description)
    setStatus(todo.status)
    setDate(todo.date)
    setEditMode(true)
    setEditId(todo._id)
  }
  function handleDelete(id){
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(() => {
        axios.get('http://localhost:8000/api/todos')
          .then(response => {
            if(response.status===200){
              toast.error("Task deleted successfully")
            }
            setTodos(response.data)
          })
          .catch(error => console.error(error));
      })
      .catch(error => {
        console.error(error)
      });
    
  }

  function handleDateChange(date,dateString){
    setDate(dateString)
  }

  return (
    <div className='ShowTodo'>
       <form>
         <center><h1>TO-DO APP</h1></center>
          <div style={{marginBottom: '1rem'}}>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <TextArea
              rows={4}
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div style={{marginBottom:'1rem'}}>
            <Select
              placeholder="Status"
              style={{ width: 120 }}
              value={status}
              onChange={value => setStatus(value)}
              options={[
                { value: 'To be Done', label: 'To be Done' },
                { value: 'Done', label: 'Done' },
              ]}
            />
          </div>
            <div style={{marginBottom:'1rem'}}>
              <DatePicker
                placeholder="Date"
                value={date ? moment(date) : null}
                onChange={handleDateChange}
              />
          </div>
          <Button onClick={handleSubmit} type="primary">
            {editMode ? 'Update Todo' : 'Add Todo'}
          </Button>
          <ToastContainer />
       </form>


      {todos.map((todo)=>(
        <div className='box' key={todo._id}>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <EditOutlined key="edit" onClick={()=>handleEdit(todo)}/>,
              <DeleteOutlined key="delete" onClick={()=>handleDelete(todo._id)}/>
            ]}
          >
            <Skeleton loading={loading} active>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
              <p>{todo.status}</p>
              <p>{todo.date}</p>
            </Skeleton>
          </Card>
        </div>
      ))}
       
    </div>
  )
}

export default ShowTodo