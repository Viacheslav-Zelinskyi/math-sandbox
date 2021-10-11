import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./LoginForm.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logInFetch } from "../../api";
import { logIn } from "../../redux/reducers/user";

const LoginForm = ({ locale, theme, closeWindow }) => {
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch();

  const logInStandart = (e) => {
    e.preventDefault();
    const username = e.target[2].value;
    const password = e.target[3].value;
    logInFetch({
      type: isRegister ? "register" : "auth",
      user_name: username,
      password: password,
    }).then((res) => {
      if (res.loggedIn || res.isUserCreated) {
        dispatch(
          logIn({ type: "native", username: username, password: password })
        );
        closeWindow();
      } else alert(res?.error);
    });
  };

  const logInSocial = (
    { tokenId, profileObj, name, id, accessToken },
    type
  ) => {
    logInFetch({
      type: type,
      user_name: profileObj?.name || name,
      user_social_id: profileObj?.googleId || id,
      token: tokenId || accessToken,
    }).then((res) => {
      if (res.loggedIn) {
        dispatch(
          logIn({
            type: type,
            username: profileObj?.name || name,
            token: tokenId || accessToken,
          })
        );
        closeWindow();
      } else console.log(res?.error);
    });
  };

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
        <Form className="loginform__form" onSubmit={logInStandart}>
          <GoogleLogin
            clientId="156449094191-fhtrksghovt2bg56l07fp9gqtjh599du.apps.googleusercontent.com"
            onSuccess={(response) => logInSocial(response, "google")}
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
            callback={(response) => logInSocial(response, "facebook")}
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
              onClick={() => setIsRegister(false)}
            >
              {locale.loginform.login}
            </Button>
            {locale.loginform.or}
            <Button
              variant={theme === "light" ? "primary" : "light"}
              type="submit"
              onClick={() => setIsRegister(true)}
            >
              {locale.loginform.signup}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
