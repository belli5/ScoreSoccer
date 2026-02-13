import Button from "@/components/ui/button";
import heroImage from "@/public/Arquiteta_Camila_Castilho-87.webp";
import Image from "next/image";

export default function FirstPage() {
  return (
      <div className="relative w-full h-[60vh]">
        <Image src={heroImage} alt="Imagem do topo" fill priority className="object-cover"/>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className= "absolute inset-0 flex items-center justify-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-blue-500 dark:text-zinc-50 text-center">
            Welcome to the First Page!
          </h1>
        </div>
        
      </div>
    );
}