import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { register} from '../../services/authService';
import './Auth.css';

export default function Register() {
 const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok');
      return;
    }

    try {
      // anggap email = username + "@mail.com"
      const email = `${formData.username}@mail.com`;

      const res = await register(formData.username, email, formData.password);

      if (!res.success) {
        alert(res.message);
        return;
      }

      localStorage.setItem('token', res.token || '');
      localStorage.setItem('user', JSON.stringify(res.user));

      navigate('/memories-bakery/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        {/* FIX gambar */}
        <img src="/memories-bakery/images/5f0f80d4e5eea.jpg" alt="Kenangan Bakery" />
        <div className="auth-image-overlay"></div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-logo">
            {/* FIX logo */}
            <img src="/memories-bakery/images/logo.png" alt="Kenangan Bakery Logo" />
            <h1 className="auth-logo-title">Kenangan Bakery</h1>
            <p className="auth-logo-subtitle">Setiap Rasa Memiliki Kenangan</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="input-field"
                  required
                />
              </div>
            </div>

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

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi Password"
                  className="input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>
                Saya menyetujui <a href="#">Syarat & Ketentuan</a> dan <a href="#">Kebijakan Privasi</a>
              </span>
            </label>

            <button type="submit" className="auth-button primary">
              DAFTAR
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Sudah punya akun?{' '}
              {/* FIX link */}
              <Link to="/memories-bakery/login" className="auth-link">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
