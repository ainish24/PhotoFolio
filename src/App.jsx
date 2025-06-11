import { useState, useEffect } from "react";
import { componentMounting } from "./script.js/App.js";
import { ToastContainer} from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader.jsx";
import NavbarComponent from "./components/Navbar";
import AlbumsList from "./components/AlbumsList.jsx";
import AlbumForm from "./components/AlbumForm.jsx";
function App() {
  const [albums, setAlbums] = useState([]); //To store the name of the albums
  const [loading, setLoading] = useState(true); //To show the loading spinner while fetching data
  const [showAlbumForm, setShowAlbumForm] = useState(false); //To show the form to add a new album
  // const [shouldRenderForm, setShouldRenderForm] = useState(false); //To control the rendering of the form component so as to delay the rendering a bit and add transition effect to it
  const [newAlbum, setNewAlbum] = useState(""); //To store the name of the new album to be added
  useEffect(() => {
    componentMounting(setAlbums, setLoading);
  }, []);
  return (
    <>
      <NavbarComponent />
      {loading && <Loader />}
      <ToastContainer 
        limit={1}
      />
      {showAlbumForm && (
        <AlbumForm
          newAlbum={newAlbum}
          setNewAlbum={setNewAlbum}
          setShowAlbumForm={setShowAlbumForm}
          setAlbums={setAlbums}
          setLoading={setLoading}
        />
      )}
      <AlbumsList albums={albums} setShowAlbumForm={setShowAlbumForm} setAlbums={setAlbums} setLoading={setLoading} />
    </>
  );
}

export default App;
