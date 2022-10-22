import React from 'react';
import { Navbar, Button } from 'flowbite-react';
import { Telephone } from 'react-bootstrap-icons';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();
  return (
    <Navbar fluid rounded className="p-3 bg-slate rounded border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-black dark:text-white">
          GERA.
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        <Button href="tel:+1(512)200-3641">
          <Telephone className="mr-1" />
          {' '}
          (512) 200-3641
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={router.pathname === '/' ? 'active' : ''}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about" active={router.pathname.startsWith('/about') ? 'active' : ''}>
          About
        </Navbar.Link>
        {/* <Navbar.Link href="#services">
          Services
        </Navbar.Link>
        <Navbar.Link href="#book-time">
          Projects
        </Navbar.Link>
        <Navbar.Link href="#contact">
          Contact
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
