import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createNewAlbum } from "../script.js/App.js";

function AlbumForm({ newAlbum, setNewAlbum, setShowAlbumForm, setAlbums, setLoading }) {
  return (
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
        onClick={() => setShowAlbumForm(false)}
      >
        ❌
      </button>
      <h3 className="mt-2 mb-4">Create New Album</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Album Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter New Album Name"
          value={newAlbum}
          onInput={(e) => {
            setNewAlbum(e.target.value);
          }}
        />
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="danger" onClick={() => setNewAlbum("")}>
          Clear
        </Button>
        <Button
          variant="info"
          onClick={() => {
            createNewAlbum(newAlbum, setAlbums, setLoading);
            // Passing setAlbums and setLoading to trigger the componentMounting function in App.js 
            setNewAlbum("");
            setShowAlbumForm(false);
          }}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AlbumForm;
