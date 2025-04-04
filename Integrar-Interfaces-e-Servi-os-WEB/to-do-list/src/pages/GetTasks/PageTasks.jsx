import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./style.css";
import api from '../../services/api.js'

function PageTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function getTasks() {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data); // Certifique-se que está recebendo um array
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return(
    <div className="container">
      <h1>Lista de Tarefas</h1>
      
      <div className="buttonPage">
        <button onClick={() => navigate('/')} className="button">
          Voltar para Home
        </button>
      </div>
      
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div className="card" key={task._id || task.id}>
            <div>
              <p>Título: {task.title}</p>
              <p>Situação: {task.finished ? "Finalizada" : "Pendente"}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-tasks">Nenhuma tarefa encontrada</p>
      )}
    </div>
  )
}

export default PageTasks;