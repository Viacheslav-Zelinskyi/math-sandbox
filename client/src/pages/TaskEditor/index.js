import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import "./TaskEditor.scss";

const NewTask = ({ locale, theme }) => {
  const [tags, setTags] = useState([]);
  const themes = ["Math", "Bio", "C++"];
  return (
    <div className={"taskeditor__wrapper taskeditor__wrapper-" + theme}>
      <div className={"taskeditor__container taskeditor__container-" + theme}>
        <div className="taskeditor__form">
          <div className="taskeditor__formHeader">
            <h3>{locale.newtask.title}</h3>
            <p>{locale.newtask.titleparagraph}</p>
          </div>
          <Form.Label>{locale.newtask.entertaskname}</Form.Label>
          <Form.Control
            placeholder={locale.newtask.tasknameplaceholder}
          ></Form.Control>
          <Form.Label style={{ marginTop: "20px" }}>
            {locale.newtask.selecttheme}
          </Form.Label>
          <Form.Select placeholder="Select theme">
            {themes.map((item) => (
              <option>{item}</option>
            ))}
          </Form.Select>
          <Form.Label style={{ marginTop: "20px" }}>
            {locale.newtask.entertaskcondition}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder={locale.newtask.taskconditionplaceholder}
          ></Form.Control>
          <Form.Label style={{ marginTop: "20px" }}>
            {locale.newtask.addtags}
          </Form.Label>
          <InputTags values={tags} onTags={(value) => setTags(value.values)} />
          <Button
            variant={theme === "dark" ? "secondary" : "primary"}
            className="taskeditor__createBtn"
          >
            {locale.newtask.create}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
