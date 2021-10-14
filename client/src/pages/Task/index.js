import { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Form } from "react-bootstrap";
import {
  HandThumbsDown,
  HandThumbsDownFill,
  HandThumbsUp,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import StarRatings from "react-star-ratings";
import {
  addCommentFetch,
  addResponseFetch,
  getTaskByIdFetch,
  getCommentsLikes,
  addCommentLikeFetch,
  deleteCommentLikeFetch,
  checkAnswerFetch,
} from "../../api";
import "./Task.scss";

const Task = ({ theme, locale }) => {
  const [task, setTask] = useState({
    task_name: "",
    task_tags: "",
    task_images: "",
    task_theme: "",
    comments: [],
    rating: 0,
  });
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState();
  const user = useSelector((store) => store.user);
  let { id } = useParams();

  useEffect(() => {
    getTaskByIdFetch(id).then((res) => setTask(res));
  }, []);

  useEffect(() => {
    setRating(task.rating || 0);
  }, [task]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const updateTask = () => {
    getTaskByIdFetch(id).then((res) => setTask(res));
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
    addCommentFetch(commentData).then(() => updateTask());
  };

  const addResponse = (newRating) => {
    const commentData = {
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      task_id: id,
      response_ranking: newRating,
    };
    addResponseFetch(commentData).then(() => updateTask());
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    checkAnswerFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      task_id: id,
      answer: e.target[0].value,
    }).then((res) => setIsAnswerTrue(res.isCorrect));
  };

  return (
    <div className={"task__wrapper task__wrapper-" + theme}>
      <div className={"task__container task__container-" + theme}>
        <h3>
          {locale.task.task} №{id}. {task.task_name}
        </h3>
        <p className="task__theme">{locale.themes[task.task_theme.replace(/\s/g, "")]}</p>
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
          disabled={true}
          rating={rating}
          starRatedColor="blue"
          changeRating={user.username ? addResponse : null}
          numberOfStars={5}
          name="rating"
          starDimension="40px"
        />
        {user.username && typeof isAnswerTrue==='undefined' ? (
          <div className="task__answer">
            <h4>{locale.task.answer}:</h4>
            <Form onSubmit={checkAnswer}>
              <Form.Control as="textarea" row="1"></Form.Control>
              <Button type="submit">{locale.task.send}</Button>
            </Form>
          </div>
        ) : null}
        {isAnswerTrue === true ? (
          <Alert variant="success" style={{marginTop: "30px"}}>{locale.task.correct}</Alert>
        ) : isAnswerTrue === false ? (
          <Alert variant="danger" style={{marginTop: "30px"}}>{locale.task.incorrect}</Alert>
        ) : null}
        <div className="task__comments">
          <h4>{locale.task.comments}</h4>
          <hr></hr>
          {user.username ? (
            <div className="task__addcomment">
              <Form.Control
                placeholder={locale.task.commentPlaceholder}
                onKeyDown={(e) => {
                  if (e.code === "Enter") addComment(e.target.value);
                }}
              ></Form.Control>
            </div>
          ) : null}
          <Comments
            comments={task.comments}
            task_id={id}
            theme={theme}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

const Comments = ({ comments, theme, task_id, user }) => {
  const [likes, setLikes] = useState({ likes: [], user_id: null });
  useEffect(() => {
    getCommentsLikes(task_id, user.username).then((result) => setLikes(result));
  }, [task_id, user.username]);

  const updateLikes = () => {
    getCommentsLikes(task_id, user.username).then((result) => setLikes(result));
  };

  const addCommentLike = (is_positive, comment_id) => {
    addCommentLikeFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      comment_id: comment_id,
      is_positive: is_positive,
      task_id: task_id,
    }).then(() => updateLikes());
  };

  const deleteCommentLike = (comment_id) => {
    deleteCommentLikeFetch({
      type: user.type,
      user_name: user.username,
      token: user.token,
      password: user.password,
      comment_id: comment_id,
    }).then(() => updateLikes());
  };

  return (
    <div className="comments__wrapper">
      {comments.map((comment) => (
        <div
          className={"comments__commentBlock comments__commentBlock-" + theme}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="comments__commentAuthor">{comment.user.user_name}:</p>
            <div className="comments__likesBlock">
              <div className="comments__likeCounter">
                {likes.likes.filter(
                  (item) =>
                    item.user_id === likes.user_id &&
                    item.comment_id === comment.comment_id &&
                    item.is_positive === true
                ).length > 0 ? (
                  <HandThumbsUpFill
                    onClick={() =>
                      user.username
                        ? deleteCommentLike(comment.comment_id)
                        : null
                    }
                  />
                ) : (
                  <HandThumbsUp
                    onClick={() =>
                      user.username
                        ? addCommentLike(true, comment.comment_id)
                        : null
                    }
                  />
                )}
                {
                  likes.likes.filter(
                    (item) =>
                      item.comment_id === comment.comment_id && item.is_positive
                  ).length
                }
              </div>
              <div className="comments__likeCounter">
                {likes.likes.filter(
                  (item) =>
                    item.user_id === likes.user_id &&
                    item.comment_id === comment.comment_id &&
                    item.is_positive === false
                ).length > 0 ? (
                  <HandThumbsDownFill
                    onClick={() =>
                      user.username
                        ? deleteCommentLike(comment.comment_id)
                        : null
                    }
                  />
                ) : (
                  <HandThumbsDown
                    onClick={() =>
                      user.username
                        ? addCommentLike(false, comment.comment_id)
                        : null
                    }
                  />
                )}
                {
                  likes.likes.filter(
                    (item) =>
                      item.comment_id === comment.comment_id &&
                      !item.is_positive
                  ).length
                }
              </div>
            </div>
          </div>
          <p className="comments__commentText">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Task;
