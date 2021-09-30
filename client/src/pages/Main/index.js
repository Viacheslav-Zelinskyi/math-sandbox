import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Main.scss";

const MainPage = ({ theme, locale }) => {
  return (
    <div
      className={
        "mainpage__wrapper" +
        (theme === "dark" ? " mainpage__wrapper-dark" : "")
      }
    >
      <div
        className={
          "mainpage__container" +
          (theme === "dark" ? " mainpage__container-dark" : "")
        }
      >
        <TagsBlock tags={tagsMock} theme={theme} />
        <div className="mainpage__maincontent">
          <TaskBlock
            title={locale.mainpage.new}
            tasks={tasksMock}
            locale={locale}
            theme={theme}
          />
          <TaskBlock
            title={locale.mainpage.popular}
            tasks={tasksMock}
            theme={theme}
          />
        </div>
        <Button
          variant={theme === "dark" ? "secondary" : "success"}
          className="mainpage__more"
        >
          {locale.mainpage.more}
        </Button>
      </div>
    </div>
  );
};

const TaskBlock = ({ title, tasks, theme, locale }) => (
  <div
    className={
      "taskblock__wrapper" +
      (theme === "dark" ? " taskblock__wrapper-dark" : "")
    }
  >
    <h5 style={{marginBottom: "20px"}}>{title}</h5>
    {tasks.map((task) => (
      <Link to={`/task/${task.number}`} style={{ textDecoration: "none" }}>
        <div
          className={
            "taskblock__task" +
            (theme === "dark" ? " taskblock__task-dark" : "")
          }
        >
          <h6>
            Task #{task.number}. {task.category}
          </h6>
          <p className="taskblock__description">{task.description}</p>
        </div>
      </Link>
    ))}
  </div>
);

const TagsBlock = ({ tags, theme }) => (
  <div className="tagsblock__wrapper">
    {tags.map((tag) => (
      <Badge
        bg={theme === "dark" ? "secondary" : "success"}
        className="tagsblock__tag"
      >
        {tag}
      </Badge>
    ))}
  </div>
);

const tasksMock = [
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
  {
    number: 56,
    category: "Math",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...",
  },
];

const tagsMock = ["math", "java", "algebra", "bio", "algorithm"];

export default MainPage;
