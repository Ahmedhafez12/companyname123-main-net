import { useState } from 'react';

/**
 * White plate that shows a brand logo. Falls back to the brand name when the
 * (often third-party hosted) logo fails to load.
 */
export default function LogoPlate({
  name,
  logo,
  className = '',
  imgClassName = 'max-h-[55%] max-w-[72%]',
}: {
  name: string;
  logo: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`flex items-center justify-center bg-white ${className}`}>
      {failed ? (
        <span className="font-sans font-bold text-[#002C3D] text-sm sm:text-base text-center px-3 leading-tight">{name}</span>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`object-contain ${imgClassName}`}
        />
      )}
    </div>
  );
}
