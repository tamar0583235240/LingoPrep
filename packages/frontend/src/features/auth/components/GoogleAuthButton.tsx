import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthWithGoogleMutation } from '../../../shared/api/userApi';
import { loginFailure, loginSuccess } from '../store/authSlice';

const clientId = process.env.CLIENT_ID || '953970619581-k1a6eb1lg0eh0j6ea46rktpelhvfnd3d.apps.googleusercontent.com';

const GoogleAuthButton = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authWithGoogle] = useAuthWithGoogleMutation();

  const onSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;

    authWithGoogle(token)
      .unwrap()
      .then((res) => {
        dispatch(loginSuccess({ user: res.user, token }));
        navigate('/home');
      })
      .catch((error: any) => {
        dispatch(loginFailure(error?.data?.message || 'שגיאה בהתחברות עם Google'));
        console.error('Google auth error:', error);
        MySwal.fire({
          title: 'שגיאה',
          text: 'התחברות נכשלה',
          icon: 'error',
          confirmButtonText: 'אישור',
        });
      });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          MySwal.fire({
            title: 'שגיאה',
            text: 'לא ניתן להתחבר עם חשבון Google',
            icon: 'error',
            confirmButtonText: 'אישור',
          });
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
