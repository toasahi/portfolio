import { CldImage } from 'next-cloudinary';

interface WidePhotoProps {
  src: string;
  alt: string;
}

export default function WidePhoto({ src, alt }: WidePhotoProps) {
  return (
    <div className="col-span-2 row-span-1 overflow-hidden rounded-lg bg-gray-100">
      <CldImage
        src={src}
        width={600}
        height={300}
        crop="fill"
        quality="auto"
        format="auto"
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
