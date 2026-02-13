import Image from "next/image";
import Button from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center font-sans bg-[#0B0F14]">   
      
        <a href=""><Button variant="primary">Ligas</Button></a>
      </div>
    </div>
    
  );
}
