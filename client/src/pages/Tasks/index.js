import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllTaskFetch } from "../../api";
import "./Tasks.scss";

const Tasks = ({ theme, locale }) => {
  const [tasks, setTasks] = useState({tasks: [], taskNumber: 0});

  useEffect(() => {
    getAllTaskFetch(0, 10).then((res) => setTasks(res));
  }, []);
  
  return (
    <div className={"tasks__wrapper tasks__wrapper-" + theme}>
      <div className={"tasks__container tasks__container-" + theme}>
        <div className="tasks__search">
          <div className="tasks__selecttheme">
            <Form.Select>
              <option>{locale.tasks.all}</option>
              {themes.map((item) => (
                <option>{item}</option>
              ))}
            </Form.Select>
          </div>
          <Form.Control placeholder={locale.tasks.searchplaceholder}></Form.Control>
        </div>
        <TaskBlock
          title={locale.tasks.result}
          tasks={tasks.tasks}
          locale={locale}
          theme={theme}
        />
      </div>
    </div>
  );
};

const TaskBlock = ({ title, tasks, theme, locale }) => (
  <div className={"tasks__block tasks__block-" + theme}>
    <h5 style={{marginBottom: "20px"}}>{title}</h5>
    {tasks.map((task) => (
      <Link to={`/task/${task.task_id}`} style={{ textDecoration: "none" }}>
        <div className={"tasks__task tasks__task-" + theme}>
          <h6>
            {locale.task.task} #{task.task_id}. {task.task_name}
          </h6>
          <p className="tasks__task__theme">{task.task_theme}</p>
          <p className="tasks__description">{task.task_condition.slice(0, 300)}...</p>
        </div>
      </Link>
    ))}
  </div>
);

const themes = ["Math", "Geo", "Bio"];

export default Tasks;
