import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllUsersFetch,
  deleteUserFetch,
  changeAdminStatusFetch,
  changeBlockedStatusFetch,
} from "../../api";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "./AdminPanel.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Link } from "react-router-dom";

const AdminPanel = ({ theme, locale }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    getAllUsersFetch().then((res) =>
      setUsers(
        res.filter(
          (item) => item.user_name.replace(/\s/g, "") !== user.username
        )
      )
    );
  }, []);

  const userSelect = {
    mode: "checkbox",
    onSelect: (row, isSelect) =>
      setSelectedUsers(
        isSelect
          ? [...selectedUsers, row.user_id]
          : selectedUsers.filter((user) => user !== row.user_id)
      ),
    onSelectAll: (isSelect) =>
      setSelectedUsers(isSelect ? users.map((item) => item.user_id) : []),
  };

  const deleteUser = () => {
    deleteUserFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      users_id: selectedUsers,
    });
  };

  const changeAdminStatus = (is_admin) => {
    changeAdminStatusFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      is_admin: is_admin,
      users_id: selectedUsers,
    }).then((res) => console.log(res));
  };

  const changeBlockedStatus = (is_blocked) => {
    changeBlockedStatusFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      is_blocked: is_blocked,
      users_id: selectedUsers,
    }).then((res) => console.log(res));
  };

  return (
    <div className={"adminPanel__wrapper adminPanel__wrapper-" + theme}>
      <div className={"adminPanel__container adminPanel__container-" + theme}>
        <h2 style={{ marginBottom: "20px" }}>{locale.adminPanel.users}</h2>
        <div className="adminPanel__buttonsBlock">
          <Button variant="success" onClick={() => changeBlockedStatus(false)}>
            {locale.adminPanel.unblock}
          </Button>
          <Button variant="warning" onClick={() => changeBlockedStatus(true)}>
            {locale.adminPanel.block}
          </Button>
          <Button variant="success" onClick={() => changeAdminStatus(true)}>
            {locale.adminPanel.appointAdmin}
          </Button>
          <Button variant="warning" onClick={() => changeAdminStatus(false)}>
            {locale.adminPanel.deleteAdmin}
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            {locale.adminPanel.delete}
          </Button>
        </div>
        <div className={"adminPanel__table adminPanel__table-" + theme}>
          <BootstrapTable
            selectRow={userSelect}
            keyField="user_id"
            filter={filterFactory()}
            data={users}
            columns={columns(locale, Link)}
          />
        </div>
      </div>
    </div>
  );
};

const columns = (locale, Link) => [
  {
    dataField: "user_id",
    text: "ID",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "user_name",
    text: locale.adminPanel.username,
    sort: true,
    filter: textFilter(),
    formatter: (cell, row) => <Link to={"/user/" + row.user_id}>{cell}</Link>,
  },
  {
    dataField: "is_admin",
    text: locale.adminPanel.administrator,
    sort: true,
    filter: textFilter(),
    formatter: (cell) => locale.adminPanel[cell ? "yes" : "no"],
  },
  {
    dataField: "is_blocked",
    text: locale.adminPanel.blocked,
    sort: true,
    filter: textFilter(),
    formatter: (cell) => locale.adminPanel[cell ? "yes" : "no"],
  },
];

export default AdminPanel;
