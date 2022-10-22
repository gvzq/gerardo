import React from 'react';
import { Footer } from 'flowbite-react';

export default function Foot() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <span className="self-center whitespace-nowrap text-xl font-black dark:text-white">
            GERA.
          </span>
          <Footer.LinkGroup>
            <Footer.Link href="/about">
              About
            </Footer.Link>
            {/* <Footer.Link href="/contact">
                            Contact
                        </Footer.Link> */}
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="/"
          by="Gerardo Vazquez™"
          year={2022}
        />
      </div>
    </Footer>
  );
}
