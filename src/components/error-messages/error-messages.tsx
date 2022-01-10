import {ErrorMessagesProps} from './type';

function ErrorMessages({errorMessages}: ErrorMessagesProps): JSX.Element {
  const errorMessagesArr = Object.entries(errorMessages.errors).map(([key, value]) => {
    const joinedValue = value.join(',');
    return `${key} ${joinedValue}`;
  });

  return (
    <ul className="error-messages">
      {errorMessagesArr.map((errorMessage) => (
        <li key={errorMessage} className="ng-binding ng-scope">
          {errorMessage}
        </li>
      ))}

    </ul>
  );
}

export default ErrorMessages;
