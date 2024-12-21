import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Input } from 'antd';
import toast, { Toaster } from "react-hot-toast";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null); // Initialiser avec null
  const [user, setUser] = useState(null); // Initialiser avec null
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("userId"); // Assurez-vous que `isLoggedIn` est un booléen

  // Charger les todos lors du premier rendu
  useEffect(() => {
    axios
      .get(`http://tdos.kesug.com/backend/api/GetTodoUser.php?userId=${isLoggedIn}`)
      .then((response) => {
        setTodos(response.data);
      });
      axios
      .get(`http://tdos.kesug.com/backend/api/GetUser.php?id=${isLoggedIn}`)
      .then((response) => {
        setUser(response.data[0].username); // Mettre à jour l'état avec le todo récupéré
      });
 
  }, []);

  // Ajouter une tâche
  const addTask = (e) => {
    e.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Vérifier si le champ "task" est vide
    if (!task.trim()) {
      alert("Le titre de la tâche ne peut pas être vide.");
      return; // Ne pas continuer si le titre est vide
    }

    // Ajouter la tâche via l'API
    axios
      .post("http://tdos.kesug.com/backend/api/AddTodo.php", { title: task ,userId:isLoggedIn })
      .then((response) => {
        // Vérifier la réponse pour éviter des tâches vides
        if (response.data) {
          toast.success(response.data.title+" add with success");
          
        }
        // Mettre à jour la liste des tâches avec la nouvelle tâche
        setTodos([...todos, response.data]);
        setTask(""); // Réinitialiser le champ après l'ajout
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la tâche", error);
      });
  };

  // Supprimer une tâche
  const deleteTodo = (id) => {
    // Supprimer la tâche via l'API
    axios
      .delete(`http://tdos.kesug.com/backend/api/DelTodo.php?id=${id}`)
      .then((response) => {
        // Mettre à jour l'état sans la tâche supprimée directement
        setTodos(todos.filter((todo) => todo.id !== id));
        if (response.data) {
          toast.error("deleted");
          return;
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche", error);
      });
  };

  // Récupérer les détails d'un todo
  const getTodo = (id) => {
    axios
      .get(`http://tdos.kesug.com/backend/api/GetTodo.php?id=${id}`)
      .then((response) => {
        setTodo(response.data[0]); // Mettre à jour l'état avec le todo récupéré
      });
  };


  // Fonction pour mettre à jour le todo
  const updateTodo = () => {
    // Make an update request to the API
    axios
      .put("http://tdos.kesug.com/backend/api/UpdateTodo.php", {
        id: todo.id,
        title: todo.title
      })
      .then((response) => {
        // Update only the updated todo item in the state
        toast.success(response.data.message);

        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t.id === todo.id ? { ...t, title: todo.title } : t
          )
        );
        setIsModalOpen(false); // Close the modal after the update
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la tâche", error);
      });
  };
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Fermer le modal
  const handleOk = () => {
    updateTodo(); // Appeler la fonction pour mettre à jour le todo
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <Toaster position="top-center" reverseOrder={false} />

      <Modal
        title="Update Todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Affichage des informations du todo dans le modal */}
        {todo ? (
          <div>
            <p><strong>ID:</strong> {todo.id}</p>
            <p><strong>Title:</strong> {todo.title}</p>
            {/* Vous pouvez ajouter un champ de mise à jour ici si vous souhaitez permettre à l'utilisateur de modifier le todo */}
            <Input
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              placeholder="Update the title"
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">{user}</h4>

                {/* Formulaire d'ajout */}
                <form
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  onSubmit={addTask}
                >
                  <div className="col-12">
                    <div data-mdb-input-init className="form-outline">
                      <input
                        type="text"
                        id="form1"
                        className="form-control"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter a task here"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      data-mdb-button-init
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </form>

                {/* Affichage des tâches */}
                <table className="table mb-4">
                  <thead>
                    <tr key={1}>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((todo, index) => (
                      <tr key={todo.id} >
                        <td scope="row">{index + 1}</td>
                        <td>{todo.title}</td>
                        <td>
                          <button
                            type="button"
                            data-mdb-button-init
                            className="btn btn-danger"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            data-mdb-button-init
                            className="btn btn-success ms-1"
                            onClick={() => {
                              getTodo(todo.id);
                              showModal();
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoApp;
