import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
import Card from "react-bootstrap/Card";
import { deleteAlbum, showPhoto } from "../script.js/App.js";

const styles = {
  cardContainer: {
    width: "14em",
    height: "14em",
    boxContent: "border-box",
    position: "relative",
    cursor: "pointer",
    borderRadius: "2em",
  },
  coverImg: {
    width: "100%",
    height: "auto",
    borderRadius: "2em",
  },
  cardTitle: {
    width: "100%",
    textAlign: "center",
    position: "absolute",
    bottom: "4.5em",
    left: "50%",
    transform: "translateX(-50%)",
    cursor: "pointer",
    color: "#eee6f9",
    textShadow:
      "0 0 5px #c84eff, 0 0 10px #c84eff, 0 0 20px #c84eff, 0 0 40px #8f00ff, 0 0 80px #8f00ff",
    fontWeight: "bold",
  },
  plusIcon: {
    position: "absolute",
    fontSize: "2em",
    bottom: "-0.7em",
    left: "50%",
    padding: "0.25em",
    transform: "translateX(-50%)",
    border: "2px solid #c84eff",
    borderRadius: "50%",
    width: "2em",
    height: "2em",
    boxShadow: "0 0 10px #c84eff, 0 0 20px #8f00ff",
  },
};

const Album = ({ albumName, albumId, albumProps }) => {
  const {
    setShowAlbumForm,
    setAlbums,
    setLoading,
    setPhotoArray,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList,
  } = albumProps;

  const showPhotoFunctionParams={
    albumId,
    setPhotoArray,
    setLoading,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList
  }

  return (
    <>
      <Card
        bg="dark"
        style={styles.cardContainer}
        className="album-card"
        //had to add the onClick with a condition to avoid error when albumName is undefined
        //this is because the albumName is undefined when the user clicks on the plus icon to create a new album
        onClick={ albumName ? () =>
          showPhoto(
            showPhotoFunctionParams
          ) : undefined
        }
      >
        <Card.Img style={styles.coverImg} variant="top" src="/AlbumCover.jpg" />
        {albumName && (
          <button
            className="delete-btn"
            onClick={(e) => deleteAlbum(albumId, setAlbums, setLoading, e)}
          >
            <MdDelete />
          </button>
        )}
        <Card.Body>
          <Card.Title style={styles.cardTitle}>
            {albumName || (
              <div
                style={styles.plusIcon}
                onClick={() => {setShowAlbumForm(true)}}
              >
                +
              </div>
            )}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default Album;
