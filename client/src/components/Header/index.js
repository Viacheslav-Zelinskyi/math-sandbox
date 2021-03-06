import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../../redux/reducers/user";
import { LoginForm } from "../index";
import "./Header.scss";

const Header = ({ setLanguage, setTheme, theme, locale, loggedIn }) => {
  const [isOpenedLogin, setIsOpenedLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const searchTasks = (e) => {
    if (e.code === "Enter") {
      history.push(`/tasks?search=${e.target.value}`);
      e.target.value = "";
    }
  };

  return (
    <div className="header">
      <Navbar bg={theme} variant={theme} expand="md">
        <Container>
          <Navbar.Brand>MathSandbox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user.is_admin ? (
                <Nav.Link onClick={() => history.push("/administration")}>
                  {locale.navbar.administration}
                </Nav.Link>
              ) : null}
              <Nav.Link onClick={() => history.push("/")}>
                {locale.navbar.home}
              </Nav.Link>
              <Nav.Link onClick={() => history.push("/tasks")}>
                {locale.navbar.tasks}
              </Nav.Link>
              <NavDropdown title={locale.navbar.account}>
                {!loggedIn ? (
                  <NavDropdown.Item onClick={() => setIsOpenedLogin(true)}>
                    {locale.navbar.login}
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item onClick={() => history.push("/mypage")}>
                      {locale.navbar.mypage}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => dispatch(logOut())}>
                      {locale.navbar.logout}
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              <FormControl
                className="navbar__search"
                size="sm"
                placeholder={locale.navbar.searchPlaceholder}
                onKeyDown={searchTasks}
              ></FormControl>
              <NavDropdown title={locale.navbar.language}>
                <NavDropdown.Item onClick={() => setLanguage("en")}>
                  {locale.navbar.english}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setLanguage("ru")}>
                  {locale.navbar.russian}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={locale.navbar.theme}>
                <NavDropdown.Item onClick={() => setTheme("light")}>
                  {locale.navbar.light}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTheme("dark")}>
                  {locale.navbar.dark}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isOpenedLogin ? (
        <LoginForm
          locale={locale}
          theme={theme}
          closeWindow={() => setIsOpenedLogin(false)}
        />
      ) : null}
    </div>
  );
};

export default Header;
