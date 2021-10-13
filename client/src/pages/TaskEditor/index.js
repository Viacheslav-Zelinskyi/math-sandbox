import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  createNewTaskFetch,
  getTaskByIdFetch,
  updateTask,
  uploadImagesFetch,
} from "../../api";
import "./TaskEditor.scss";

const NewTask = ({ locale, theme }) => {
  const [defaultValue, setDefaultValue] = useState({
    task_name: "",
    task_condition: "",
    task_tags: "",
  });
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const themes = ["Math", "Bio", "C++"];
  const { id } = useParams();

  useEffect(() => {
    getTaskByIdFetch(id).then((res) => setDefaultValue(res));
  }, [id]);

  useEffect(() => {
    setTags(defaultValue.task_tags.split(","));
  }, [defaultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskData = {
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      task_id: id,
      task_name: e.target[0].value,
      task_theme: e.target[1].value,
      task_condition: e.target[2].value,
      task_tags: tags.join(","),
      task_answer: e.target[3].value,
      task_images: images.join(),
    };
    console.log(images);
    if (!id) createNewTaskFetch(newTaskData).then(() => history.push("/tasks"));
    if (id) updateTask(newTaskData).then(() => history.push("/tasks"));
  };

  const uploadImage = (e) => {
    uploadImagesFetch(e.target.files).then((res) => setImages(res));
  };

  return (
    <div className={"taskeditor__wrapper taskeditor__wrapper-" + theme}>
      <div className={"taskeditor__container taskeditor__container-" + theme}>
        <div className="taskeditor__form">
          <div className="taskeditor__formHeader">
            <h3>{locale.newtask.title}</h3>
            <p>{locale.newtask.titleparagraph}</p>
          </div>
          <Form
            onSubmit={handleSubmit}
            onKeyPress={(e) => {
              let code = e.keyCode || e.which;
              if (code === 13) {
                e.preventDefault();
                return false;
              }
            }}
          >
            <Form.Label>{locale.newtask.entertaskname}</Form.Label>
            <Form.Control
              defaultValue={defaultValue.task_name}
              placeholder={locale.newtask.tasknameplaceholder}
            ></Form.Control>
            <Form.Label style={{ marginTop: "20px" }}>
              {locale.newtask.selecttheme}
            </Form.Label>
            <Form.Select
              placeholder="Select theme"
              defaultValue={defaultValue.task_theme}
            >
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
              defaultValue={defaultValue.task_condition}
            ></Form.Control>
            <Form.Label style={{ marginTop: "20px" }}>
              {locale.newtask.answer}
            </Form.Label>
            <Form.Control
              defaultValue={defaultValue.task_answer}
              placeholder={locale.newtask.answerplaceholder}
            ></Form.Control>
            <Form.Label style={{ marginTop: "20px" }}>
              {locale.newtask.addtags}
            </Form.Label>
            <InputTags
              values={tags}
              onTags={(value) => setTags(value.values)}
            />
            <Form.Label style={{ marginTop: "20px" }}>
              {locale.newtask.selectimage}
            </Form.Label>
            <Form.Control
              accept="image/png, image/jpeg"
              type="file"
              onChange={uploadImage}
              multiple
            />
            <Button
              variant={theme === "dark" ? "secondary" : "primary"}
              className="taskeditor__createBtn"
              type="submit"
            >
              {id ? locale.newtask.edit : locale.newtask.create}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
