import React from 'react';
import { useRouter } from 'next/router';
import { NavbarDesktop } from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';
import { usePathname } from 'next/navigation';

export interface IMenuRoute {
  label: string;
  path: string
}

interface INavbar {
  route: IMenuRoute[];
}

export const Navbar = ({ route }: INavbar) => {
  return (
    <div>
      <NavbarDesktop className="hidden" route={route} />
      <NavbarMobile className="block md:hidden" route={route} />
    </div>
  );
};
