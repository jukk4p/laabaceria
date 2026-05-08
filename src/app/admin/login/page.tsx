'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>LA ABACERÍA</h1>
          <p>Panel de Administración</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@laabaceria.es"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Acceder al Panel'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem;
          background: #111;
          border: 1px solid #c5a05933;
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-header h1 {
          font-family: 'Cinzel', serif;
          color: #c5a059;
          letter-spacing: 4px;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: #888;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #c5a059;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        input {
          width: 100%;
          padding: 0.8rem;
          background: #1a1a1a;
          border: 1px solid #333;
          color: white;
          outline: none;
          transition: border 0.3s;
          border-radius: 2px;
        }

        input:focus {
          border-color: #c5a059;
        }

        .error-msg {
          color: #ff4444;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        button {
          width: 100%;
          padding: 1rem;
          background: #c5a059;
          color: black;
          border: none;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 1rem;
        }

        button:hover:not(:disabled) {
          background: #d4b475;
          transform: translateY(-2px);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
