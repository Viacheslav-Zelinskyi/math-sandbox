import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LoginForm } from "../index";
import "./Header.scss";

const Header = ({ setLanguage, setTheme, theme, locale, loggedIn }) => {
  const [isOpenedLogin, setIsOpenedLogin] = useState(false);
  const history = useHistory();
  return (
    <div className="header">
      <Navbar bg={theme} variant={theme} expand="md">
        <Container>
          <Navbar.Brand>MathSandbox</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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
                    <NavDropdown.Item>{locale.navbar.logout}</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              <FormControl
                className="navbar__search"
                size="sm"
                placeholder={locale.navbar.searchPlaceholder}
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
