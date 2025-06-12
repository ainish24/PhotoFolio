import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addNewPhoto } from "../script.js/App";

const ImageForm = ({
  setShowImageForm,
  imageUrl,
  imageName,
  setImageName,
  setImageUrl,
  albumData,
  showPhotoFunctionParams,
}) => {
  return (
    <>
      <Form
        style={{
          width: "50%",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f8f9fa",
          position: "relative",
        }}
      >
        <button
          style={{
            border: "none",
            background: "none",
            position: "absolute",
            right: "1em",
            top: "1em",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowImageForm(false);
            setImageName("");
            setImageUrl("");
          }}
        >
          ❌
        </button>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name for image"
            value={imageName}
            onInput={(e) => {
              setImageName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onInput={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-around">
          <Button
            variant="danger"
            onClick={() => {
              setImageName("");
              setImageUrl("");
            }}
          >
            Clear
          </Button>
          <Button
            variant="info"
            onClick={() => {
              addNewPhoto(
                imageName,
                imageUrl,
                albumData,
                showPhotoFunctionParams
              );
              setImageName("");
              setImageUrl("");
              setShowImageForm(false);
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ImageForm;
