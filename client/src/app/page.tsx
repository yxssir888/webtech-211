import Image from "next/image";
import Link from "next/link";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div>
      
       <Header></Header>
          <div className="relative h-screen w-full">
              <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" className="object-cover object-center w-full h-full" />
              <img src="" alt="Background Image" className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1 className="text-4xl text-white font-bold">Hello, World!</h1>
                  <p className="text-xl text-white mt-4">This is a my fist LAB for Nextjs</p>
              </div>
          </div>

    
      <Footer></Footer>
  
    </div>
  );
}
