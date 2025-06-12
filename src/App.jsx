import { useState, useEffect } from "react";
import { componentMounting } from "./script.js/App.js";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader.jsx";
import NavbarComponent from "./components/Navbar";
import AlbumsList from "./components/AlbumsList.jsx";
import AlbumForm from "./components/AlbumForm.jsx";
import ImagesList from "./components/ImagesList.jsx";
function App() {
  const [albums, setAlbums] = useState([]); //To store the name of the albums
  const [showAlbumList, setShowAlbumList] = useState(true); //To toggle the display of the list of albums
  const [albumData, setAlbumData] = useState(""); //To store the name of the album to be displayed
  const [loading, setLoading] = useState(true); //To show the loading spinner while fetching data
  const [showAlbumForm, setShowAlbumForm] = useState(false); //To show the form to add a new album
  const [newAlbum, setNewAlbum] = useState(""); //To store the name of the new album to be added
  const [photoArray, setPhotoArray] = useState([]); //To store the photos of the album
  const [showModal, setShowModal] = useState(false); // To control the visibility of the Modal conatining carousel
  const [showImagesList, setShowImagesList] = useState(false); // To control the visibility of the Images List
  const [showImageForm, setShowImageForm] = useState(false); // To control the visibility of the Image Form
  const [imageName, setImageName] = useState(""); // To store the name of the image to be added
  const [imageUrl, setImageUrl] = useState(""); // To store the URL of the image to be added
  useEffect(() => {
    componentMounting(setAlbums, setLoading);
  }, []);

  const AlbumListProps = {
    albums,
    setShowAlbumForm,
    setAlbums,
    setLoading,
    setPhotoArray,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList,
  };

  const ImagesListProps = {
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
  };

  return (
    <>
      <NavbarComponent />
      {loading && <Loader />}
      <ToastContainer limit={1} />
      {showAlbumForm && (
        <AlbumForm
          newAlbum={newAlbum}
          setNewAlbum={setNewAlbum}
          setShowAlbumForm={setShowAlbumForm}
          setAlbums={setAlbums}
          setLoading={setLoading}
        />
      )}
      {showAlbumList && <AlbumsList AlbumListProps={AlbumListProps} />}
      {showImagesList && <ImagesList ImagesListProps={ImagesListProps} />}
    </>
  );
}

export default App;
