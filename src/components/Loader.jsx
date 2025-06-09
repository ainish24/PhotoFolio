import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <HashLoader
        className="loader"
        color="#212529"
        size={50}
        speedMultiplier={1.5}
        cssOverride={{
          display: "block",
          margin: "16em auto",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loader