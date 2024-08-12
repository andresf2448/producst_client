"use client";

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Products", href: "/products", icon: BookOpenIcon },
  {
    name: "Create Product",
    href: "/products/create",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/", icon: UserGroupIcon },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={'flex h-[48px] grow items-center justify-evenly gap-5 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'}
            style={{background: pathname === link.href ? '#FFFF' : '', borderRadius: '10px', padding: '10px'}}
          >
            <LinkIcon className="w-6" height={40} />
            <p className="hidden md:block text-xl">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;