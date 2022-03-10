import { GoogleLogin } from "react-google-login";

const clientId =
  "728833144528-jnqafjlf2ogq6p7r7qn7lmkf22iulvs9.apps.googleusercontent.com";

function Login({ onSuccess, onFailure }) {
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
