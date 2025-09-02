'use client';

import React from 'react';
import Image from 'next/image';
import ImageCard from '@/components/imageCard';
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/marquee';

export default function About() {
  const clients = [
    { name: 'Brand Besties', logo: '/clients/brandbesties-square.webp', alt: 'Brand Besties Logo', website: 'https://brandbesties.com' },
    { name: 'Gramercy', logo: '/clients/gramercy-square.jpg', alt: 'Gramercy Logo', website: 'https://mygramercycounseling.com/' },
    { name: 'Jale', logo: '/clients/jale-square.webp', alt: 'Jale Logo', website: 'https://www.work4workers.com/' },
    { name: 'Palm Venture Studios', logo: '/clients/palm-venture-studios-square.jpeg', alt: 'Palm Venture Studios Logo', website: 'https://palmventurestudios.com' },
    { name: 'Swoovy', logo: '/clients/swoovy-square.jpeg', alt: 'Swoovy Logo', website: 'https://swoovy.com' },
    { name: 'Tap', logo: '/clients/tap-square.svg', alt: 'Tap Logo', website: 'https://www.tapintegration.com/' },
  ];

  const addUtmParams = (url: string, clientName: string) => {
    const utmParams = new URLSearchParams({
      utm_source: 'fctolabs.com',
      utm_medium: 'referral',
      utm_campaign: 'client-showcase',
      utm_content: clientName.toLowerCase().replace(/\s+/g, '-')
    });
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${utmParams.toString()}`;
  };

  return (
    <div className="h-full">
      <ImageCard enableName />
      
      {/* Clients Section */}
      <div className="container mx-auto px-4 py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Clients</h2>
          <p className="text-gray-600">Trusted by innovative companies</p>
        </div>
        
        <Marquee className="py-4">
          <MarqueeContent speed={25} pauseOnHover={true} autoFill={false} gradient={false}>
            {clients.map((client, index) => (
              <MarqueeItem key={index} className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mx-12">
                <a
                  href={addUtmParams(client.website, client.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={100}
                    height={100}
                    className="object-contain w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    priority={false}
                  />
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
}
