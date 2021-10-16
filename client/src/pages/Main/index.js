import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getPopularTaskFetch, getNewTaskFetch, getPopularTagsFetch } from "../../api";
import "./Main.scss";

const MainPage = ({ theme, locale }) => {
  const [popularTasks, setPopularTasks] = useState([]);
  const [newTasks, setNewTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPopularTaskFetch().then((res) => setPopularTasks(res));
    getNewTaskFetch().then((res) => setNewTasks(res));
    getPopularTagsFetch().then(res=>setTags(res.tags));
  }, []);

  return (
    <div
      className={
        "mainpage__wrapper" +
        (theme === "dark" ? " mainpage__wrapper-dark" : "")
      }
    >
      <div
        className={
          "mainpage__container" +
          (theme === "dark" ? " mainpage__container-dark" : "")
        }
      >
        <TagsBlock tags={tags} theme={theme} history={history} />
        <div className="mainpage__maincontent">
          <TaskBlock
            title={locale.mainpage.new}
            tasks={newTasks}
            locale={locale}
            theme={theme}
          />
          <TaskBlock
            title={locale.mainpage.popular}
            tasks={popularTasks}
            theme={theme}
            locale={locale}
          />
        </div>
        <Link to="/tasks">
        <Button
          variant={theme === "dark" ? "secondary" : "success"}
          className="mainpage__more"
        >
          {locale.mainpage.more}
        </Button></Link>
      </div>
    </div>
  );
};

const TaskBlock = ({ title, tasks, theme, locale }) => (
  <div
    className={
      "taskblock__wrapper" +
      (theme === "dark" ? " taskblock__wrapper-dark" : "")
    }
  >
    <h5 style={{ marginBottom: "20px" }}>{title}</h5>
    {tasks.map((task) => (
      <Link to={`/task/${task.task_id}`} style={{ textDecoration: "none" }}>
        <div
          className={
            "taskblock__task" +
            (theme === "dark" ? " taskblock__task-dark" : "")
          }
        >
          <h6>
            {locale.task.task} #{task.task_id}. {task.task_name}
          </h6>
          <p className="taskblock__description">{task.task_condition.slice(0, 300)}...</p>
        </div>
      </Link>
    ))}
  </div>
);

const TagsBlock = ({ tags, theme, history }) => (
  <div className="tagsblock__wrapper">
    {tags.map((tag) => (
      <Badge
        bg={theme === "dark" ? "secondary" : "success"}
        className="tagsblock__tag"
        onClick={()=>history.push(`/tasks?search=${tag}`)}
      >
        {tag}
      </Badge>
    ))}
  </div>
);

export default MainPage;
