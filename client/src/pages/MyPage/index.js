import BootstrapTable from "react-bootstrap-table-next";
import "./MyPage.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Button } from "react-bootstrap";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";

const MyPage = ({ theme, locale }) => {
  const username = "Valeriy Leontev";

  const products = [
    { id: 5, label: "B", edit: editbar(5, locale) },
    { id: 8, label: "C", edit: editbar(8, locale) },
    { id: 6, label: "Av", edit: editbar(6, locale) },
  ];

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
        <h2>{username}</h2>
        <div className="mypage__taskcounter">
          <p>10 {locale.mypage.completed}</p>
          <p>15 {locale.mypage.mytasks}</p>
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
            data={products}
            columns={columns(locale)}
          />
        </div>
      </div>
    </div>
  );
};

const editbar = (id, locale) => (
  <div
    style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
  >
    <Button variant="warning" onClick={() => console.log(id)}>
      {locale.mypage.edit}
    </Button>
    <Button variant="danger" onClick={() => console.log(id)}>
      {locale.mypage.del}
    </Button>
  </div>
);

const columns = (locale) => [
  {
    dataField: "id",
    text: locale.mypage.taskid,
    headerStyle: { width: "20%" },
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "label",
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
