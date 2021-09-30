import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Tasks.scss";

const Tasks = ({ theme, locale }) => {
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
          tasks={tasksMock}
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
      <Link to={`/task/${task.number}`} style={{ textDecoration: "none" }}>
        <div className={"tasks__task tasks__task-" + theme}>
          <h6>
            Task #{task.number}. {task.category}
          </h6>
          <p className="tasks__task__theme">Math</p>
          <p className="tasks__description">{task.description}</p>
        </div>
      </Link>
    ))}
  </div>
);

const themes = ["Math", "Geo", "Bio"];
const tasksMock = [
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the dummy text of the printing and typesetting industry.  Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
];

export default Tasks;
