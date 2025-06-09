import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
  return (
    <>
      <Navbar className='bg-dark'>
        <Container>
          <Navbar.Brand href="#home" className="text-white pt-1 fw-bold d-flex">
            <img
              alt=""
              src="/SnapShelf.png"
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
            />{' '}
            <div>SnapShelf</div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;