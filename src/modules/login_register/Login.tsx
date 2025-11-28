import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../../services/authService';
import './Auth.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(formData.username, formData.password);

      if (!res.success) {
        alert(res.message);
        return;
      }

      // Simpan token dan user
      localStorage.setItem('isLoggedIn', 'true')
      console.log(res.token)
      localStorage.setItem('token', res.token || '');
      
      localStorage.setItem('user', JSON.stringify(res.user));

      navigate('/memories-bakery/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login gagal');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        {/* FIX: gambar pakai base prefix */}
        <img src="/memories-bakery/images/5f0f80d4e5eea.jpg" alt="Kenangan Bakery" />
        <div className="auth-image-overlay"></div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-logo">
            {/* FIX: logo */}
            <img src="/memories-bakery/images/logo.png" alt="Kenangan Bakery Logo" />
            <h1 className="auth-logo-title">Kenangan Bakery</h1>
            <p className="auth-logo-subtitle">Setiap Rasa Memiliki Kenangan</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-button primary">
              LOGIN
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Belum memiliki akun?{' '}
              {/* FIX: Link pakai base prefix */}
              <Link to="/memories-bakery/register" className="auth-link">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
