import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  deleteTask,
  getMyTasksFetch,
  getNumberOfCompletedTask,
} from "../../api";
import "./MyPage.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const MyPage = ({ theme, locale }) => {
  const user = useSelector((store) => store.user);
  const [completedTask, setCompletedTask] = useState({ count: 0 });
  const [myTasks, setMyTasks] = useState({ count: 0, tasks: [] });
  const [page, setPage] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getNumberOfCompletedTask(user.username).then((res) =>
      setCompletedTask(res)
    );
    getMyTasksFetch(user.username, page * 10, 10).then((res) =>
      setMyTasks(res)
    );
  }, [user.username, myTasks]);

  return (
    <div
      className={
        "mypage__wrapper" + (theme === "dark" ? " mypage__wrapper-dark" : "")
      }
    >
      <div
        className={
          "mypage__container" +
          (theme === "dark" ? " mypage__container-dark" : "")
        }
      >
        <h2>{user.username}</h2>
        <div className="mypage__taskcounter">
          <p>
            {completedTask.count} {locale.mypage.completed}
          </p>
          <p>
            {myTasks.count} {locale.mypage.mytasks}
          </p>
        </div>
        <hr />
        <div className="mypage__tablelabel">
          <p>{locale.mypage.mytask}</p>
          <Link to="/taskeditor">
            <Button variant={theme === "dark" ? "secondary" : "success"}>
              {locale.mypage.newtask}
            </Button>
          </Link>
        </div>
        <div className={"mypage__table mypage__table-" + theme}>
          <BootstrapTable
            keyField="id"
            filter={filterFactory()}
            data={myTasks.tasks.map((item) => {
              item.edit = editbar(
                item.task_id,
                locale,
                user,
                setMyTasks,
                myTasks,
                history
              );
              return item;
            })}
            columns={columns(locale)}
          />
          <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={myTasks.count/10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e)=>setPage(e.selected)}
          containerClassName={"paginate__pagination paginate__pagination--" + theme}
          activeClassName={"paginate__active paginate__active--" + theme}
        />
        </div>
      </div>
    </div>
  );
};

const editbar = (id, locale, user, setMyTasks, myTasks, history) => (
  <div
    style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
  >
    <Button variant="warning" onClick={() => history.push(`/taskeditor/${id}`)}>
      {locale.mypage.edit}
    </Button>
    <Button
      variant="danger"
      onClick={() => {
        deleteTask({
          type: user.type,
          user_name: user.username,
          token: user.token,
          password: user.password,
          task_id: id,
        });
        setMyTasks(myTasks);
      }}
    >
      {locale.mypage.del}
    </Button>
  </div>
);

const columns = (locale) => [
  {
    dataField: "task_id",
    text: locale.mypage.taskid,
    headerStyle: { width: "20%" },
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "task_name",
    text: locale.mypage.task,
    headerStyle: { width: "70%" },
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "edit",
    text: "",
    headerStyle: { width: "150px" },
  },
];

export default MyPage;
