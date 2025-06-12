import { set } from "mongoose";
import Album from "./Album";

const AlbumsList = ({ AlbumListProps }) => {
  const {
    albums,
    setShowAlbumForm,
    setAlbums,
    setLoading,
    photoArray,
    setPhotoArray,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList,
  } = AlbumListProps;
  const albumProps = {
    setShowAlbumForm,
    setAlbums,
    setLoading,
    photoArray,
    setPhotoArray,
    setShowAlbumList,
    setAlbumData,
    setShowModal,
    setShowImagesList,
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {albums.map((album, index) => (
          <Album
            key={index}
            albumId={album.id}
            albumName={album.name}
            albumProps={albumProps}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumsList;
