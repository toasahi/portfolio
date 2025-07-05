import { FaGithub, FaTwitter } from 'react-icons/fa';
import { SiZenn } from 'react-icons/si';

export default function SnsNavigation() {
  return (
    <div className="flex space-x-4 mb-12">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
      >
        <FaTwitter className="text-blue-400 text-lg" />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
      >
        <FaGithub className="text-gray-900 text-lg" />
      </a>
      <a
        href="https://zenn.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
      >
        <SiZenn className="text-blue-400 text-lg" />
      </a>
    </div>
  );
}
