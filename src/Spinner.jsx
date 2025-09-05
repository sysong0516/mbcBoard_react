import Spinner from 'react-bootstrap/Spinner';

function spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Spinner animation="border" role="status" style={{ width: '5rem', height: '5rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default spinner;