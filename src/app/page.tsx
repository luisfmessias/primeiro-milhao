import Link from 'next/link'
import './estilos/page.css'
import ParticlesBackground from "@/components/ParticlesBackground"

export default function HomePage() {
  return (

    <div className="flex flex-col items-center justify-center text-center h-100">

      <ParticlesBackground />

      <div className='bola'></div>


      <h1 className=" pageh1 text-shadow-1xs text-4xl md:text-5xl font-extrabold text-white mb-4 mt-5 leading-tight">
        Faça o Seu <span className='text-[#0edb59]'>Primeiro Milhão</span>
      </h1>


      <p className="text-white mb-15  text-shadow-1xs">
        Faça simulações de juros compostos, veja o progresso mês a mês e descubra em quanto
        tempo vai levar para atingir seus objetivos financeiros.
      </p>
      
      <div>
        <Link
          href="/calculadora"
          className="text-white px-4 py-2 font-medium rounded-full hover:bg-[#00ff5e46] transition border"
        >
          Simule Agora <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>

  )
}
