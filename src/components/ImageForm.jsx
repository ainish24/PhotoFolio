import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addNewPhoto, editPhoto } from "../script.js/App";
import { useEffect } from "react";

const ImageForm = ({
  setShowImageForm,
  imageUrl,
  imageName,
  setImageName,
  setImageUrl,
  albumData,
  showPhotoFunctionParams,
  editMode,
  setEditMode,
  currentImage,
  setCurrentImage,
}) => {

  //To prefill the form with the current image data when in edit mode
  useEffect(()=>{
    if(editMode && currentImage && Object.keys(currentImage).length > 0) {
      setImageName(currentImage.name);  
      setImageUrl(currentImage.imageURL);
    }
  },[editMode, currentImage]);

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
            setEditMode(false);
            setCurrentImage({});
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
              setCurrentImage({});
            }}
          >
            Clear
          </Button>
          <Button
            variant="info"
            style={{color: "white"}}
            onClick={() => {
              {editMode? (editPhoto(setImageName, setImageUrl, setCurrentImage, setEditMode, currentImage, imageName, imageUrl, showPhotoFunctionParams)
             ) :(addNewPhoto(
                imageName,
                imageUrl,
                albumData,
                showPhotoFunctionParams
              ))}
              setImageName("");
              setImageUrl("");
              setShowImageForm(false);
            }}
          >
            { editMode? "Edit" : "Submit"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ImageForm;
