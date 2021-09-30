import { useCallback, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import StarRatings from "react-star-ratings";
import "./Task.scss";

const Task = ({ theme, locale }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [rating, setRating] = useState(3.35);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const { id } = useParams();

  return (
    <div className={"task__wrapper task__wrapper-" + theme}>
      <div className={"task__container task__container-" + theme}>
        <h3>
          {locale.task.task} №{id}. {task.title}
        </h3>
        <p className="task__theme">{task.theme}</p>
        <div className="task__tags">
          {task.tags.map((tag) => (
            <Badge className="task__tag" bg="success">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="task__description">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </div>
        <div className="task__images">
          {task.images.map((image, index) => (
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
              src={task.images}
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
            changeRating={( newRating, name )=>setRating((rating+newRating)/2)}
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
            <Form.Control placeholder="Enter comment..."></Form.Control>
          </div>
          <Comments comments={comments} theme={theme} />
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
          <p className="comments__commentAuthor">{comment.author}:</p>
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
        <p className="comments__commentText">{comment.text}</p>
      </div>
    ))}
  </div>
);

const task = {
  title: "Algorithm",
  theme: "Math",
  tags: ["math", "algorithm", "bio"],
  description: `# A demo of "react-markdown"

  "react-markdown" is a markdown component for React.
  
  👉 Changes are re-rendered as you type.
  
  👈 Try writing some markdown on the left.
  
  ## Overview
  
  * Follows [CommonMark](https://commonmark.org)
  * Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
  * Renders actual React elements instead of using "dangerouslySetInnerHTML"
  * Lets you define your own components (to render "MyHeading" instead of "h1")
  * Has a lot of plugins`,
  images: [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/1920/1080/nature",
    "http://placeimg.com/1500/500/nature",
  ],
};

const comments = [
  { id: 5, author: "Kto to", text: "Nice work!!!", likes: 256, dislikes: 20 },
  {
    id: 6,
    author: "Mamkin Programmer",
    text: `SyntaxError: /home/viacheslav/WebP/Itransition/MathSandbox/client/src/pages/Task/index.js: Unexpected token, expected "," (121:2)`,
    likes: 25,
    dislikes: 2,
  },
  { id: 7, author: "Ghost", text: "Nice!!!", likes: 2560, dislikes: 0 },
];

export default Task;
