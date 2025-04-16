
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth,signOut, signIn  } from '@/auth'
import { LogOut , BadgePlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";


const Navbar = async () => {

  const sesion = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'} >
            <Image src={"/logo.png"} alt='logo' width={144} height={30} ></Image>
        </Link>
{/* 
        <div className='flex items-center gap-5 text-black '>
          {sesion && sesion?.user?(
            <>
                <Link href={"/startup/create"}>
                <span>
                  Create
                </span>
                </Link>
                <form  action = { async () => { 
                  "use server";
                  await signOut( { redirectTo :  '/' })
                  }}>
                  <button type='submit' className='cursor-pointer'> Logout</button>
                </form>
                <Link href={`/user/${sesion?.user?.id}`}>
                {sesion?.user?.name}
                </Link>
            </>
          ) : (
            <form   action = { async () => {
              "use server";
              await signIn('google')}}>
              <button type='submit' className='cursor-pointer'>
                Login with google
              </button>
            </form>
          )}
        </div> */}
        <div className='flex items-center gap-5 text-black '>
          {sesion && sesion?.user?(
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

                <form  action = { async () => { 
                  "use server";
                  await signOut( { redirectTo :  '/' })
                  }}>
                 
                 <button type="submit" className='cursor-pointer'>
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500 " />
                </button>
                </form>
                <Link href={`/user/${sesion?.user?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={sesion?.user?.image || ""}
                    alt={sesion?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>

                </Link>
            </>
          ) : (
            <form   action = { async () => {
              "use server";
              await signIn('github')}}>
              <button type='submit' className='cursor-pointer'>
                Login with github
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )

}

export default Navbar