
import api from '../lib/api';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ onSuccess }) => {
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      // Envia o token para o backend
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential,
      });
      // res.data deve conter os dados do usuário autenticado
      onSuccess(res.data);
    } catch (err) {
      alert('Erro ao autenticar no backend');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar com Google</h2>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert('Erro ao autenticar com Google');
          }}
        />
      </div>
    </div>
  );
};

export default Login;
