import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'
import Image from "next/image"
import LogoutButton from "@/components/LogoutButton"


export default function RootLayout({ children }: { children: ReactNode }) {
  return (

    <html lang="pt-br">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
        />

      </head>

      <body className="bg-[#01050c] bg-no-repeat bg-center bg-cover h-dvh">

        <header className="text-white p-4">

          <div className="container mx-auto flex justify-between items-center ">

            <div className='flex '>
              <Link href='/'>
                <Image className= " img w-[80px] h-[60px] object-contain" src="/assets/logo.png" alt="Logo" width={300} height={300} />
              </Link>
              <div className='logo ml-1 mt-2 '>
                <p className='text-lg' >Calculadora Do</p>
                <p className='text-center text-lg'>Primeiro Milhão</p>
              </div>
            </div>

            <nav className="flex gap-6">

              <Link href="/" className='px-4 py-2 text-sm font-medium rounded-full hover:bg-[#00ff5e46] transition '>
                Inicio
              </Link>

              <Link href="/calculadora" className=' calc px-4 py-2 text-sm font-medium rounded-full hover:bg-[#00ff5e46] transition '>
                Calculadora
              </Link>

              <Link href="/historico" className='px-4 py-2 text-sm font-medium rounded-full hover:bg-[#00ff5e46] transition '>
                Histórico
              </Link>

              <Link href="/login" className=" login px-4 py-2 text-sm font-medium rounded-full  hover:bg-[#00ff5e46] transition ">
                Login
              </Link>

              <Link href="/signup" className="login px-4 py-2 text-sm font-medium rounded-full hover:bg-[#00ff5e46] transition">
                Cadastre-se
              </Link>

              <LogoutButton />
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
