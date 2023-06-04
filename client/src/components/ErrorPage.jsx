import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ErrorPage = ({ error }) => {
  return (
    <div className="errorContainer">
      <h2 style={{ marginBottom: '30px' }}>{error}</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
};
export default ErrorPage;
