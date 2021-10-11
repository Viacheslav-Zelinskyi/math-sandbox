import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import StarRatings from "react-star-ratings";
import { addCommentFetch, getTaskByIdFetch } from "../../api";
import "./Task.scss";

const Task = ({ theme, locale }) => {
  const [task, setTask] = useState({
    task_name: "",
    task_tags: "",
    task_images: "",
    comments: [],
  });
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [rating, setRating] = useState(3.35);
  const user = useSelector((store) => store.user);
  let { id } = useParams();

  useEffect(() => {
    getTaskByIdFetch(id).then((res) => setTask(res));
  }, [id, task]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const addComment = (comment) => {
    const commentData = {
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      task_id: id,
      comment: comment,
    };
    setTask(task);
    addCommentFetch(commentData);
  };

  return (
    <div className={"task__wrapper task__wrapper-" + theme}>
      <div className={"task__container task__container-" + theme}>
        <h3>
          {locale.task.task} №{id}. {task.task_name}
        </h3>
        <p className="task__theme">{task.task_theme}</p>
        <div className="task__tags">
          {task.task_tags.split(",").map((tag) => (
            <Badge className="task__tag" bg="success">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="task__description">
          <ReactMarkdown>{task.task_condition}</ReactMarkdown>
        </div>
        <div className="task__images">
          {task.task_images?.split(",").map((image, index) => (
            <img
              className="task__image"
              src={image}
              alt={image}
              width="70%"
              onClick={() => openImageViewer(index)}
            />
          ))}
          {isViewerOpen && (
            <ImageViewer
              src={task.task_images}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={(newRating, name) =>
            setRating((rating + newRating) / 2)
          }
          numberOfStars={5}
          name="rating"
          starDimension="40px"
        />
        <div className="task__answer">
          <h4>Answer:</h4>
          <Form.Control as="textarea" row="1"></Form.Control>
          <Button>Send</Button>
        </div>
        <div className="task__comments">
          <h4>Comments</h4>
          <hr></hr>
          <div className="task__addcomment">
            <Form.Control
              placeholder="Enter comment..."
              onKeyDown={(e) => {
                if (e.code === "Enter") addComment(e.target.value);
              }}
            ></Form.Control>
          </div>
          <Comments comments={task.comments} theme={theme} />
        </div>
      </div>
    </div>
  );
};

const Comments = ({ comments, theme }) => (
  <div className="comments__wrapper">
    {comments.map((comment) => (
      <div className={"comments__commentBlock comments__commentBlock-" + theme}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="comments__commentAuthor">{comment.user.user_name}:</p>
          <div className="comments__likesBlock">
            <div className="comments__likeCounter">
              <HandThumbsUp />
              {comment.likes}
            </div>
            <div className="comments__likeCounter">
              <HandThumbsDown />
              {comment.dislikes}
            </div>
          </div>
        </div>
        <p className="comments__commentText">{comment.comment}</p>
      </div>
    ))}
  </div>
);

export default Task;
