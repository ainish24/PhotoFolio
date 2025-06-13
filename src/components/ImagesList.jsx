import CarouselComp from "./Carousel.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { styled } from "styled-components";
import Image from "./Image.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ImageForm from "./ImageForm.jsx";
import FormControl from "react-bootstrap/FormControl";
import { searchPhoto, clearSearch } from "../script.js/App.js";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledH3 = styled.h3`
  margin-top: 0.2em;
  transform: ${(props)=>(props.isSearchActive ? "translateX(3em)" : "translateX(0.85em)")};
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
    searchField,
    setSearchField,
    searchResults,
    setSearchResults,
    isSearchActive,
    setIsSearchActive,
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
      <Form
        inline
        style={{ position: "absolute", top: "1em", right: "1em", zIndex: 1000 }}
      >
        <InputGroup size="sm" className="input-container">
          <FormControl
            type="text"
            placeholder="Search"
            className="form-control search-input-field"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            className="bg-white border-0 search-btn-light"
            type="button"
            onClick={() => {
              searchPhoto(
                searchField,
                setSearchField,
                photoArray,
                setSearchResults,
                setIsSearchActive
              );
            }}
          >
            🔍
          </Button>
        </InputGroup>
      </Form>
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
        {photoArray.length <= 0 ? (
          <StyledH3 isSearchActive={isSearchActive}>No Photos Found!</StyledH3>
        ) : (
          <StyledH3 isSearchActive={isSearchActive}>{albumData.name}</StyledH3>
        )}
        <div>
          {isSearchActive && (
            <Button
              variant="dark"
              className="me-2 mt-1"
              onClick={() => {
                clearSearch(
                  setSearchField,
                  setSearchResults,
                  setIsSearchActive
                );
              }}
            >
              Clear Search
            </Button>
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
        </div>
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
        {(isSearchActive ? searchResults : photoArray).length > 0 ? (
          (isSearchActive ? searchResults : photoArray).map((photo, index) => (
            <Image
              key={index}
              photo={photo}
              showPhotoFunctionParams={showPhotoFunctionParams}
              setShowImageForm={setShowImageForm}
              setEditMode={setEditMode}
              setCurrentImage={setCurrentImage}
            />
          ))
        ) : !isSearchActive ? (
          <p>No photos available in this album.</p>
        ) : (
          <p>No search results found.</p>
        )}
      </div>

      {(photoArray.length > 0 && !isSearchActive) && (
        <Button
          className="btn btn-dark opacity-50 border-0 shadow-none btn-sm rounded-circle"
          style={{
            width: "50px",
            height: "50px",
            padding: "0.2em",
            position: "fixed",
            bottom: "1em",
            left: "1em",
          }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Modal
        </Button>
      )}
    </>
  );
}

export default ImagesList;
