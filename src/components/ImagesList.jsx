import CarouselComp from "./Carousel.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { styled } from "styled-components";
import Image from "./Image.jsx";
import Button from "react-bootstrap/esm/Button.js";
import { addNewPhoto } from "../script.js/App.js";
import ImageForm from "./ImageForm.jsx";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledH3 = styled.h3`
  margin-top: 0.2em;
`;

const StyledButton = styled.button`
  margin-left: 1em;
  border: none;
  background: none;
  padding: 0;
  width: 2.5em;
`;

function ImagesList({ ImagesListProps }) {
  const {
    photoArray,
    albumData,
    showModal,
    setShowModal,
    setShowImagesList,
    setShowAlbumList,
    showImageForm,
    setShowImageForm,
    imageName,
    setImageName,
    imageUrl,
    setImageUrl,
    setPhotoArray,
    setLoading,
    setAlbumData,
    editMode,
    setEditMode,
    currentImage,
    setCurrentImage,
  } = ImagesListProps;

  //To pass the paramters to the addNewPhoto function to re-render photos after adding a new photo
  const showPhotoFunctionParams = {
    albumId: albumData.id,
    setPhotoArray,
    setLoading,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList,
  };

  return (
    <>
      <StyledDiv>
        <StyledButton
          onClick={() => {
            setShowImagesList(false);
            setShowModal(false);
            setShowAlbumList(true);
          }}
        >
          <IoMdArrowRoundBack />
        </StyledButton>
        {photoArray.length < 0 ? (
          <StyledH3>No Photos Found!</StyledH3>
        ) : (
          <StyledH3>{albumData.name}</StyledH3>
        )}
        <Button
          variant="dark"
          className="me-2 mt-1"
          onClick={() => {
            setShowImageForm(true);
          }}
        >
          Add new
        </Button>
      </StyledDiv>
      {showImageForm && (
        <ImageForm
          setShowImageForm={setShowImageForm}
          imageName={imageName}
          setImageName={setImageName}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          albumData={albumData}
          showPhotoFunctionParams={showPhotoFunctionParams}
          editMode={editMode}
          setEditMode={setEditMode}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      )}
      {showModal && (
        <CarouselComp
          photoArray={photoArray}
          albumData={albumData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 p-3">
        {photoArray.length > 0 ? (
          photoArray.map((photo, index) => (
            <Image
              key={index}
              photo={photo}
              showPhotoFunctionParams={showPhotoFunctionParams}
              setShowImageForm={setShowImageForm}
              setEditMode={setEditMode}
              setCurrentImage={setCurrentImage}
            />
          ))
        ) : (
          <p>No photos available in this album.</p>
        )}
      </div>

      {photoArray.length > 0 && <Button
        className="btn btn-dark opacity-50 border-0 shadow-none btn-sm rounded-circle"
        style={{ width: "50px", height: "50px", padding: "0.2em", position: "fixed", bottom: "1em", left: "1em" }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Modal
      </Button>}
    </>
  );
}

export default ImagesList;
