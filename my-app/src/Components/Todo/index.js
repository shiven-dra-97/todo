import { FiEdit } from "react-icons/fi";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: null, text: "" });

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const onInputTask = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        text: task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");


      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const updateTask = (taskId) => {

    const taskToUpdate = tasks.find((t) => t.id === taskId);


    setEditedTask({
      id: taskToUpdate.id,
      text: taskToUpdate.text,
    });
  };

  const saveUpdatedTask = () => {

    const updatedTasks = tasks.map((t) =>
      t.id === editedTask.id ? { ...t, text: editedTask.text } : t
    );


    setEditedTask({ id: null, text: "" });


    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {

    const updatedTasks = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);

 
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <h1 className="text-center">Todo List</h1>
      <div className="container">
        <div className="row">
          <div className="mb-3">
            <label htmlFor="task" className="form-label">
              Task
            </label>
            <input
              onChange={onInputTask}
              value={task}
              type="text"
              className="form-control"
              id="task"
              placeholder="Enter Your Task Here"
            />
            <button onClick={addTask} className="btn btn-primary mt-3">
              Add Task
            </button>
          </div>
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="text-center">
                      <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.id === editedTask.id ? (
                          <input
                            type="text"
                            value={editedTask.text}
                            onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                          />
                        ) : (
                          task.text
                        )}
                      </td>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleCompletion(task.id)}
                        />
                      </td>
                      <td>
                        {task.id === editedTask.id ? (
                          <button onClick={saveUpdatedTask} className="btn btn-success">
                            Save
                          </button>
                        ) : (
                          <FiEdit onClick={() => updateTask(task.id)} />
                        )}
                      </td>
                      <td>
                        <button onClick={() => deleteTask(task.id)} className="btn btn-danger">
                          Delete
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
    </>
  );
};

export default Todo;



