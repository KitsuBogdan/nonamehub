// src/components/Brand.tsx
import Link from "next/link";
import Image from "next/image";

export default function Brand({
  size = 32,
  asLink = true,
}: {
  size?: number;
  asLink?: boolean;
}) {
  const content = (
    <>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="brand-logo"
        priority
      />
      <span>
        NoName<span className="brand-accent">Hub</span>
      </span>
    </>
  );

  if (asLink) {
    return (
      <Link className="brand" href="/" aria-label="NoNameHub home">
        {content}
      </Link>
    );
  }

  return <span className="brand">{content}</span>;
}