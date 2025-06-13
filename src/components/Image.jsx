import Card from "react-bootstrap/Card";
import { MdDelete, MdEdit } from "react-icons/md";
import { deletePhoto, showEditPhotoForm } from "../script.js/App.js";

const Image = ({ photo, showPhotoFunctionParams, setShowImageForm, setEditMode, setCurrentImage }) => {

  return (
    <>
      <Card style={{ width: "15em" }} className="image-card">
        <Card.ImgOverlay className="d-flex justify-content-between">
          <MdEdit
          className="img-button"
            onClick={() => {
              showEditPhotoForm(setShowImageForm, setEditMode);
              setCurrentImage({...photo});
              console.log({...photo})
            }}
          />
          <MdDelete
          className="img-button"
            onClick={() => {
              deletePhoto(photo, showPhotoFunctionParams);
            }}
          />
        </Card.ImgOverlay>
        <Card.Img
          variant="top"
          src={photo.imageURL}
          style={{ width: "14.9em", height: "10.425em" }}
          className="album-img"
        />
        <Card.Body className="p-0 text-center" style={{backgroundColor: "#212529", borderRadius: "0 0 5px 5px"}}>
          <Card.Text style={{color:"white"}}>{photo.name}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Image;
