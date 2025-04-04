import { useState, useEffect, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api.js'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null); // Guarda o ID da tarefa sendo editada
  const inputTitle = useRef();
  const editInputRef = useRef(); // Referência para o input de edição

  const navigate = useNavigate();

  async function getTasks() {
    const token = localStorage.getItem('authToken');
    const responseTask = await api.get('api/tasks',
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    setTasks(responseTask.data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function createTask() {
    await api.post('api/tasks', {
      title: inputTitle.current.value
    });
    getTasks();
    inputTitle.current.value = "";
  }

  async function deleteTask(id) {
    await api.delete(`api/tasks/${id}`);
    getTasks();
  }

  async function updateTask(id, newTitle) {
    await api.put(`api/tasks/${id}`, { title: newTitle });
    setEditingId(null); // Sai do modo edição
    getTasks();
  }


  return (
    <div className="container">
      <form>
        <h1>Cadastro de atividades</h1>
        <input placeholder="Título" name="Título" ref={inputTitle} />
        <button type="button" onClick={createTask}>Cadastrar</button> 
      </form>

      {tasks.map((task) => (
        <div className="card" key={task._id}>
          <div>
            {editingId === task._id ? (
              // Modo edição
              <div>
                <input
                  defaultValue={task.title}
                  ref={editInputRef}
                  autoFocus
                 className="inputEdit"/>
                <button onClick={() => updateTask(task._id, editInputRef.current.value)}>
                  Salvar
                </button>
              </div>
            ) : (
              // Modo visualização
              <>
                <p>Título: {task.title}</p>
                <p>Situação: {task.finished ? "Finalizada" : "Pendente"}</p>
                <button onClick={() => setEditingId(task._id)}>Editar</button>
              </>
            )}
          </div>
          
          <button onClick={() => deleteTask(task._id)}>
            <img src={Trash} alt="Lixeira" />
          </button>
        </div>
      ))}

      <div className="buttonPage">
        <button  onClick={() => navigate('/ListTasks')} className="button">
          Ir para lista de tarefas
        </button>
      </div>
    </div>
  );
}

export default Home;