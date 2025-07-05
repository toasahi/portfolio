import { CldImage } from 'next-cloudinary';

interface TallPhotoProps {
  src: string;
  alt: string;
}

export default function TallPhoto({ src, alt }: TallPhotoProps) {
  return (
    <div className="col-span-1 row-span-2 overflow-hidden rounded-lg bg-gray-100">
      <CldImage
        src={src}
        width={300}
        height={600}
        crop="fill"
        quality="auto"
        format="auto"
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
