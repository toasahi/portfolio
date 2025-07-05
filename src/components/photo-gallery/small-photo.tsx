import { CldImage } from 'next-cloudinary';

interface SmallPhotoProps {
  src: string;
  alt: string;
}

export default function SmallPhoto({ src, alt }: SmallPhotoProps) {
  return (
    <div className="col-span-1 row-span-1 overflow-hidden rounded-lg bg-gray-100">
      <CldImage
        src={src}
        width={300}
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
