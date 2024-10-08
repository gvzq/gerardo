/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/tARI74H2zxN
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { SVGProps } from "react"

export function Appointment() {
  return (
    <div key="1" className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="date-range">
              Select Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full flex justify-between items-center" variant="outline">
                  <span>April 1, 2023 - April 7, 2023</span>
                  <CalendarDaysIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 w-full max-w-[400px]">
                <Calendar initialFocus mode="range" />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-6 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex flex-col items-center justify-center">
              <Avatar>
                <AvatarImage alt="Dr. John Doe" src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <p className="font-medium">Dr. John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pediatrician</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-6 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex flex-col items-center justify-center">
              <Avatar>
                <AvatarImage alt="Dr. Jane Smith" src="/placeholder-user.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <p className="font-medium">Dr. Jane Smith</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cardiologist</p>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-6 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex flex-col items-center justify-center">
              <Avatar>
                <AvatarImage alt="Dr. Michael Johnson" src="/placeholder-user.jpg" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <p className="font-medium">Dr. Michael Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dermatologist</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="time-slots">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>9:00 AM</span>
                  <span>Dr. John Doe</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>9:00 AM</span>
                  <span>Dr. Jane Smith</span>
                </div>
              </div>
              <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-md">
                <div className="flex items-center justify-between">
                  <span>9:30 AM</span>
                  <span>Dr. Michael Johnson</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>10:00 AM</span>
                  <span>Dr. John Doe</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>10:00 AM</span>
                  <span>Dr. Jane Smith</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>10:30 AM</span>
                  <span>Dr. Michael Johnson</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>11:00 AM</span>
                  <span>Dr. John Doe</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>11:00 AM</span>
                  <span>Dr. Jane Smith</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-md cursor-pointer hover:bg-green-200 dark:hover:bg-green-800">
                <div className="flex items-center justify-between">
                  <span>11:30 AM</span>
                  <span>Dr. Michael Johnson</span>
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full">Book Appointment</Button>
        </div>
      </div>
    </div>
  )
}

function CalendarDaysIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}
