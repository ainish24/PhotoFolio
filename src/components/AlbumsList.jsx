import Album from "./Album"

const AlbumsList = ({albums, setShowAlbumForm, setAlbums, setLoading}) => {
  return (
    <>
    <div style={{display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px", justifyContent: "center"}}>
    {albums.map((album, index)=>(
      <Album
        key={index}
        albumId={album.id}
        albumName={album.name}
        setShowAlbumForm={setShowAlbumForm}
        setAlbums={setAlbums}
        setLoading={setLoading}
      />
    ))}
    </div>
    </>
  )
}

export default AlbumsList