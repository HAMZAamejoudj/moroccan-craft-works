import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MoroccanLogoProps {
  className?: string;
  variant?: "gold" | "white";
  layout?: "full" | "horizontal" | "icon";
  width?: number;
  height?: number;
}

export const MoroccanLogo: React.FC<MoroccanLogoProps> = ({
  className = "",
  variant = "gold",
  layout = "horizontal",
  width,
  height,
}) => {
  const isWhite = variant === "white";
  const src = isWhite
    ? "/MoroccanCraftWorks_Logo_FIXED_White.svg"
    : "/MoroccanCraftWorks_Logo_FIXED.svg";

  // Native aspect ratio of the SVG is 258 / 188 ≈ 1.372
  const defaultHeight = layout === "icon" ? 44 : layout === "full" ? 80 : 68;
  const computedHeight = height || defaultHeight;
  const computedWidth = width || Math.round(computedHeight * (258 / 188));

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none transition-transform duration-200 hover:opacity-95 ${className}`}
      aria-label="Moroccan Craft Works"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: computedWidth, height: computedHeight }}
      >
        <Image
          src={src}
          alt="Moroccan Craft Works Logo"
          width={computedWidth}
          height={computedHeight}
          className="object-contain w-full h-full filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          priority
          unoptimized
        />
      </div>
    </Link>
  );
};

