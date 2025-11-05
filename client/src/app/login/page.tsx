'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage('Erreur inscription: ' + error.message);
    else setMessage('Inscrit ! Connecte-toi.');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage('Erreur connexion: ' + error.message);
    else window.location.href = '/menu';
  };

  return (
    <div>
      <main>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
        />
            
        <div
          className="bg-cover bg-center min-h-screen flex items-center justify-center inset-0 bg-black/30 backdrop-blur-md"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000')"
          }}
        >
          <div className="flex flex-col items-center space-y-8">
            <div className="w-80 rounded-2xl bg-white p-8 shadow-lg shadow-black/30">
              <h1 className="mb-4 text-center text-3xl font-bold text-black drop-shadow-md">
                Welcome To page Admin
              </h1>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder-black shadow-md focus:outline-none focus:ring-2 focus:ring-[#34180a]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder-black shadow-md focus:outline-none focus:ring-2 focus:ring-[#34180a]"
                />
              </div>

              <div className="mb-4 pt-2 text-right">
                <span className="cursor-pointer text-[10px] text-[#228CE0] hover:underline">
                  Forget Password?
                </span>
              </div>

              <div className="mb-4 flex justify-center">
                <button 
                  onClick={handleLogin}
                  className="h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-[#3b23055d] to-[#b69506] text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center text-sm text-[#969696]">
                Don&apos;t have an account?{" "}
                <span 
                  onClick={handleSignup}
                  className="cursor-pointer text-[#7337FF] font-medium hover:underline"
                >
                  Sign up
                </span>
              </div>

              {message && (
                <p className="mt-4 text-center text-sm text-red-500">{message}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}