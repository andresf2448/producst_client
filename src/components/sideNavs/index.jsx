"use client";

import NavLinks from '@/src/components/navLinks';
import Image from "next/image";
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

const SideNav = () => {
  const router = useRouter();
  const accessToken = sessionStorage.getItem("accessToken");
  
  const handleIcon = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (accessToken) {
      sessionStorage.removeItem("accessToken");
      router.push('/login'); // Redirige al usuario a la página de login
    } else{
      router.push('/login');
    }
  };

  return (
    <div className='bg-orange-400 flex h-full flex-col px-3 py-4 md:px-2'
    style={{ position: "relative" }}>
      <div style={{
          height: "60%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}>
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form style={{ position: "absolute", bottom: 20, right: 0, left: 0 }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" onClick={handleIcon}>
            {accessToken ? (
                <>
                  <PowerIcon className="w-6" height={40} />
                  <div className="hidden md:block">Sign Out</div>
                </>
              ) : (
                <>
                  <PowerIcon className="w-6" height={40} />
                  <div className="hidden md:block">Sign In</div>
                </>
              )
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default SideNav;