import './ErrorHandeling.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';

const ErrorHandeling = () => {

  return (
    <div className="redirect-container">
      <h1>Error!</h1>
      <h2>Please go back to the Token Page and login with credentials.</h2>
      <TokenButton position = 'right' />
    </div>
  );
};

export default ErrorHandeling;
