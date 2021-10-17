import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllTaskFetch, getThemesFetch, searchTaskFetch } from "../../api";
import "./Tasks.scss";

const Tasks = ({ theme, locale }) => {
  const [tasks, setTasks] = useState({ tasks: [], taskNumber: 0 });
  const [themes, setThemes] = useState([]);
  const defaultSearchString = useQuery().get("search");
  const [searchString, setSearchString] = useState(defaultSearchString);
  const [searchTheme, setSearchTheme] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getThemesFetch().then((res) => setThemes(res));
    if (defaultSearchString)
      searchTaskFetch(searchString, searchTheme, page * 10, 10).then((res) =>
        setTasks(res)
      );
    else getAllTaskFetch(0, 10).then((res) => setTasks(res));
  }, []);

  useEffect(() => {
    getAllTaskFetch(page * 10, 10).then((res) => setTasks(res));
  }, [page]);

  useEffect(() => {
    if (!searchString && !searchTheme) {
      getAllTaskFetch(page * 10, 10).then((res) => setTasks(res));
    } else {
      searchTaskFetch(searchString, searchTheme, page * 10, 10).then((res) =>
        setTasks(res)
      );
    }
  }, [searchString, searchTheme, page]);

  useEffect(() => {
    setSearchString(defaultSearchString);
  }, [defaultSearchString]);

  return (
    <div className={"tasks__wrapper tasks__wrapper-" + theme}>
      <div className={"tasks__container tasks__container-" + theme}>
        <div className="tasks__search">
          <div className="tasks__selecttheme">
            <Form.Select onChange={(e) => setSearchTheme(e.target.value)}>
              <option value="">{locale.tasks.all}</option>
              {themes.map((item) => (
                <option value={item}>{locale.themes[item]}</option>
              ))}
            </Form.Select>
          </div>
          <Form.Control
            placeholder={locale.tasks.searchplaceholder}
            value={searchString}
            defaultValue={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          ></Form.Control>
        </div>
        <TaskBlock
          setPage={setPage}
          title={locale.tasks.result}
          tasks={tasks.tasks}
          taskNumber={tasks.tasksNumber}
          locale={locale}
          theme={theme}
        />
      </div>
    </div>
  );
};

const TaskBlock = ({ title, tasks, theme, locale, taskNumber, setPage }) => (
  <div className={"tasks__block tasks__block-" + theme}>
    <h5 style={{ marginBottom: "20px" }}>{title}</h5>
    {tasks.map((task) => (
      <Link to={`/task/${task.task_id}`} style={{ textDecoration: "none" }}>
        <div className={"tasks__task tasks__task-" + theme}>
          <h6>
            {locale.task.task} #{task.task_id}. {task.task_name}
          </h6>
          <p className="tasks__task__theme">
            {locale.themes[task.task_theme.replace(/\s/g, "")]}
          </p>
          <p className="tasks__description">
            {task.task_condition.slice(0, 300)}...
          </p>
        </div>
      </Link>
    ))}
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={taskNumber / 10}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(e) => setPage(e.selected)}
      containerClassName={"paginate__pagination paginate__pagination--" + theme}
      activeClassName={"paginate__active paginate__active--" + theme}
    />
  </div>
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default Tasks;
