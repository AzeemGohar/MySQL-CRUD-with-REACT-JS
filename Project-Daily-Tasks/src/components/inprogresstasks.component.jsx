import { Fragment, useState, useEffect } from "react";
import CompletedTasks from "./completedTasks.component";
import EditTask from "./edittask.component";
import Axios from "axios";

const InProgressTask = ({ Response }) => {
  const [taskList, setTaskList] = useState([]);
  const [notify, setnotify] = useState("");

  //Fetching All the tasks
  const getAllTasks = () => {
    Axios.get("http://localhost:3001/tasks").then((response) => {
      const { data } = response;
      setTaskList(data);
    });
  };

  //Deleting A Task
  const deleteTask = async (taskId) => {
    Axios.delete(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    }).then((response) => {
      setnotify(() => {
        return response;
      });
    });
  };

  //Using UseEffect to render on click
  useEffect(() => {
    getAllTasks();
  }, [Response, notify]);

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="border border-1 w-75 ">
          <h1 className="text-center my-4">In Progress</h1>
          <div className="d-flex justify-content-center">
            <table className="table table-bordered mx-2">
              <thead>
                <tr>
                  <th scope="colSpan">Task #</th>
                  <th scope="colSpan">Task</th>
                  <th scope="colSpan">Assigned To</th>
                  <th scope="colSpan">Due Date</th>
                  <th scope="colSpan">Edit</th>
                  <th scope="colSpan">Delete</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((tasks) => {
                  return (
                    <tr key={tasks.task_id}>
                      <td>{tasks.task_id}</td>
                      <td>{tasks.taskname}</td>
                      <td>{tasks.assignto}</td>
                      <td>{tasks.duedate}</td>
                      <td>
                        <EditTask tasks={tasks} func={getAllTasks} />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTask(tasks.task_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CompletedTasks />
    </Fragment>
  );
};
export default InProgressTask;
