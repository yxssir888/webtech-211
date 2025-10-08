import Image from "next/image";
import Header from "../component/Header";

export default function Article() {
  return (
    <div>
   <main>
      <Header></Header>
      <div className="flex flex-col items-center gap-8">HELLO Article</div>
      
   </main>
    </div>
  );
}