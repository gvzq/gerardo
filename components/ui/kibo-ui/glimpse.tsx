"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Glimpse = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
));
Glimpse.displayName = "Glimpse";

const GlimpseTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("cursor-pointer", className)} {...props} />
));
GlimpseTrigger.displayName = "GlimpseTrigger";

const GlimpseContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md",
      "opacity-0 invisible transition-all duration-200",
      "group-hover:opacity-100 group-hover:visible",
      "pointer-events-none group-hover:pointer-events-auto",
      className
    )}
    {...props}
  />
));
GlimpseContent.displayName = "GlimpseContent";

const GlimpseTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
GlimpseTitle.displayName = "GlimpseTitle";

const GlimpseDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-2", className)}
    {...props}
  />
));
GlimpseDescription.displayName = "GlimpseDescription";

const GlimpseImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...props }, ref) => (
  <Image
    ref={ref}
    alt={alt ?? ""}
    className={cn("w-full h-32 object-cover rounded-md mt-2", className)}
    width={320}
    height={128}
    {...(props as any)}
  />
));
GlimpseImage.displayName = "GlimpseImage";

export {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
};
