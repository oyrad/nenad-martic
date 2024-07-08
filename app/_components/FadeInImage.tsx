'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FadeInImage({
  src,
  alt,
  className = '',
}: FadeInImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleImageLoad();
    }
  }, []);

  return (
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, zIndex: -1 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onLoad={handleImageLoad}
      className={className}
    >
      <Image src={src} alt={alt} priority={true} width={800} height={800} />
    </motion.div>
  );
}
