import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface MashLogoProps {
  variant?: "full" | "icon" | "letters";
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
  // Select extracted asset
  let src = "/mash-logo-transparent.png";
  let width = 915;
  let height = 300;
  let aspectRatio = "915 / 300";

  if (variant === "letters") {
    src = "/mash-letters-transparent.png";
    width = 915;
    height = 205;
    aspectRatio = "915 / 205";
  } else if (variant === "icon") {
    src = "/mash-icon-transparent.png";
    width = 257;
    height = 205;
    aspectRatio = "257 / 205";
  }

  // Size preset classes
  const sizeClasses = {
    sm: variant === "icon" ? "w-8 h-8" : "w-36 h-auto",
    md: variant === "icon" ? "w-11 h-11" : "w-48 sm:w-56 h-auto",
    lg: variant === "icon" ? "w-16 h-16" : "w-72 sm:w-80 h-auto",
    hero: variant === "icon" ? "w-24 h-24" : "w-full max-w-[580px] h-auto",
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
