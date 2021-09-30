import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage, MyPage, TaskEditor, Task, Tasks } from "./pages";
import { Header } from "./components";
import languages from "./languages/languages.json";
import "./App.scss";

function App() {
  const [loggedIn, setLogIn] = useState(false);
  const [theme, setTheme] = useState("light"); // light || dark
  const [language, setLanguage] = useState("en"); // en || ru

  useEffect(() => {
    const defaultTheme = localStorage.getItem("theme");
    const defaultLanguage = localStorage.getItem("language");
    if (defaultTheme) setTheme(defaultTheme);
    if (defaultLanguage) setLanguage(defaultLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <Header
        setLanguage={setLanguage}
        setTheme={setTheme}
        theme={theme}
        locale={languages[language]}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route path="/mypage">
          <MyPage theme={theme} locale={languages[language]}></MyPage>
        </Route>
        <Route path="/taskeditor">
          <TaskEditor theme={theme} locale={languages[language]} />
        </Route>
        <Route path="/task/:id">
          <Task theme={theme} locale={languages[language]} />
        </Route>
        <Route path="/tasks">
          <Tasks theme={theme} locale={languages[language]} />
        </Route>
        <Route path="/">
          <MainPage theme={theme} locale={languages[language]}></MainPage>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
