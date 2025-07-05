interface DecorativeAreaProps {
  text?: string;
  className?: string;
}

export default function DecorativeArea({
  text = 'More photos coming soon...',
  className = 'col-span-2 row-span-1',
}: DecorativeAreaProps) {
  return (
    <div
      className={`${className} rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200`}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">📸</div>
        <p className="text-gray-500 text-sm font-medium">{text}</p>
      </div>
    </div>
  );
}
