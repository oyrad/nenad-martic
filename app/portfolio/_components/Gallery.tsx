"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "next/image";

export default function Gallery() {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
      <Masonry gutter="4px">
        <Image src="/images/2.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/3.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/4.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/6.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/7.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/8.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/9.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/10.jpg" alt="1" width={1000} height={100} />
        <Image src="/images/11.jpg" alt="1" width={1000} height={100} />
      </Masonry>
    </ResponsiveMasonry>
  );
}
