import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./LoginForm.scss";

const LoginForm = ({ locale, theme, closeWindow }) => {
  return (
    <div className="loginform__wrapper">
      <div className="loginform__exitblock" onClick={() => closeWindow()} />
      <div
        className={
          "loginform__formContainer" +
          (theme === "dark" ? " loginform__formContainer-dark" : "")
        }
      >
        <h1>{locale.loginform.login}</h1>
        <Form className="loginform__form">
          <GoogleLogin
            clientId="156449094191-fhtrksghovt2bg56l07fp9gqtjh599du.apps.googleusercontent.com"
            onSuccess={(response) => console.log(response)}
            render={(renderProps) => (
              <Button
                variant={theme === "light" ? "success" : "secondary"}
                className="loginform__loginWithButton"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {locale.loginform.signinwith + "Google"}
              </Button>
            )}
          />
          <FacebookLogin
            appId="855345331816971"
            callback={(res) => console.log(res)}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                variant={theme === "light" ? "success" : "secondary"}
                className="loginform__loginWithButton"
              >
                {locale.loginform.signinwith + "Facebook"}
              </Button>
            )}
          />
          <Form.Group controlId="username" className="loginform__formGroup">
            <Form.Label>{locale.loginform.username}</Form.Label>
            <Form.Control placeholder={locale.loginform.usernamePlaceholder} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{locale.loginform.password}</Form.Label>
            <Form.Control
              type="password"
              placeholder={locale.loginform.passwordPlaceholder}
            />
          </Form.Group>
          <div className="loginform__buttonContainer">
            <Button
              variant={theme === "light" ? "primary" : "light"}
              type="submit"
            >
              {locale.loginform.login}
            </Button>
            {locale.loginform.or}
            <Button variant={theme === "light" ? "primary" : "light"}>
              {locale.loginform.signup}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
