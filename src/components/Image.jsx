import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Image = ({photo}) => {
  return (
    <>
    <Card style={{ width: '15em'}}>
      <Card.Img variant="top" src={photo.imageURL} style={{ width: '14.9em', height:"10.425em"}}/>
      <Card.Body className='p-0 text-center'>
        <Card.Text>
            {photo.name}
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default Image