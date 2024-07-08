'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      initial={{ opacity: 0, zIndex: -1 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onLoad={handleImageLoad}
      className={className}
    />
  );
}
