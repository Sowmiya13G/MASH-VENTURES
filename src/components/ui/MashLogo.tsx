import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface MashLogoProps {
  variant?: "full" | "icon" | "letters" | "banner";
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  href?: string;
  priority?: boolean;
}

export default function MashLogo({
  variant = "full",
  size = "md",
  className,
  href,
  priority = false,
}: MashLogoProps) {
  // Select extracted asset based on uploaded branding
  let src = "/mash-logo-transparent.png";
  let width = 962;
  let height = 302;
  let aspectRatio = "962 / 302";

  if (variant === "letters") {
    src = "/mash-letters-transparent.png";
    width = 962;
    height = 209;
    aspectRatio = "962 / 209";
  } else if (variant === "icon") {
    src = "/mash-icon-transparent.png";
    width = 265;
    height = 209;
    aspectRatio = "265 / 209";
  } else if (variant === "banner") {
    src = "/mash-ventures-banner.jpg";
    width = 1024;
    height = 584;
    aspectRatio = "1024 / 584";
  }

  // Size preset classes
  const sizeClasses = {
    sm: variant === "icon" ? "w-8 h-auto" : "w-32 sm:w-36 h-auto",
    md: variant === "icon" ? "w-10 sm:w-11 h-auto" : "w-36 sm:w-44 md:w-52 h-auto",
    lg: variant === "icon" ? "w-14 sm:w-16 h-auto" : "w-64 sm:w-72 md:w-80 h-auto",
    hero: variant === "icon" ? "w-20 sm:w-24 h-auto" : "w-full max-w-[580px] h-auto",
  }[size];

  const content = (
    <div className={clsx("relative select-none inline-block", className)}>
      <Image
        src={src}
        alt="MASH VENTURES - Engineered To Impress"
        width={width}
        height={height}
        priority={priority}
        className={clsx("block object-contain", sizeClasses)}
        style={{ aspectRatio }}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="MASH VENTURES Home" className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
