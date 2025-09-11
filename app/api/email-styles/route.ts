import { NextResponse } from 'next/server';

export async function GET() {
  const email = "gerardo@fctolabs.com";
  
  // Split email into chunks and randomize order for obfuscation
  const chunks = [
    { text: email.slice(0, 3), order: 1 },     // "ger"
    { text: email.slice(3, 6), order: 2 },     // "ard"
    { text: email.slice(6, 7), order: 3 },     // "o"
    { text: email.slice(7, 8), order: 4 },     // "@"
    { text: email.slice(8, 11), order: 5 },    // "fct"
    { text: email.slice(11, 14), order: 6 },   // "ola"
    { text: email.slice(14, 17), order: 7 },   // "bs"
    { text: email.slice(17), order: 8 }        // ".com"
  ];
  
  // Create random class names for each chunk
  const emailParts = chunks.map((chunk) => ({
    text: chunk.text,
    order: chunk.order,
    className: `ep-${Math.random().toString(36).substring(2, 9)}`
  }));
  
  // Generate CSS using flexbox ordering for reliable positioning
  const css = `
    .email-container {
      display: inline-flex;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
    }
    
    ${emailParts.map((part) => `
    .${part.className}::before {
      content: '${part.text}';
      order: ${part.order};
    }
    `).join('')}
    
  `;
  
  return new NextResponse(css, {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}