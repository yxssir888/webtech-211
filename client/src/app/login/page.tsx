import Image from "next/image";
import Header from "../../../component/Header";

export default function Login() {
  return (
    <div>
      <main>
        {/* Préchargement de l'image de fond */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"
        />
            
        {/* SECTION PRINCIPALE */}
        <div
          className="bg-cover bg-center min-h-screen flex items-center justify-center inset-0 bg-black/30 backdrop-blur-md "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000')",
          }}
        >
          
          <div className="flex flex-col items-center space-y-8">
            {/* LOGO */}

            {/* FORMULAIRE */}
            <div className="w-80 rounded-2xl bg-white p-8 shadow-lg shadow-black/30">
              <h1 className="mb-4 text-center text-3xl font-bold text-black drop-shadow-md">
                Welcome To page Admin
              </h1>

              {/* INPUTS */}
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder-black shadow-md focus:outline-none focus:ring-2 focus:ring-[#34180a]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-[#E9EFF6] p-2.5 text-black placeholder-black shadow-md focus:outline-none focus:ring-2 focus:ring-[#34180a]"
                />
              </div>

              {/* MOT DE PASSE OUBLIÉ */}
              <div className="mb-4 pt-2 text-right">
                <span className="cursor-pointer text-[10px] text-[#228CE0] hover:underline">
                  Forget Password?
                </span>
              </div>

              {/* BOUTON DE CONNEXION */}
              <div className="mb-4 flex justify-center">
                <button className="h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-[#3b23055d] to-[#b69506] text-white font-semibold shadow-md hover:opacity-90 transition">
                  Sign In
                </button>
              </div>

              {/* INSCRIPTION */}
              <div className="text-center text-sm text-[#969696]">
                Don&apos;t have an account?{" "}
                <span className="cursor-pointer text-[#7337FF] font-medium hover:underline">
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
