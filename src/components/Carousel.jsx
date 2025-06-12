import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { styled } from "styled-components";

const StyledH3 = styled.h3`
  opacity: 0.6;
`;

const CarouselComp = ({ photoArray, albumData, showModal, setShowModal }) => {
  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{albumData.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Carousel>
          {photoArray.map((photo, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={photo.imageURL}
                alt={`Slide ${index + 1}`}
                style={{width:"47.9em", height:"33.515em"}}
              />
              <Carousel.Caption>
                <StyledH3>{photo.name}</StyledH3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarouselComp;
