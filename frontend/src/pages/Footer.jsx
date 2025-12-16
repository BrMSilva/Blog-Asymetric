import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-amber-200 text-gray-700 py-10 mt-0 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Copyright */}
        <div>
          <h3 className="text-lg font-semibold mb-2">© 2025 Bruno Marques da Silva</h3>
          <p className="text-sm text-gray-500">All rights reserved.</p>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contacts</h4>
          <ul className="text-sm space-y-1">
            <li>Email: <a href="mailto:bruno@email.com" className="text-blue-600 hover:underline">brunoms29@Gmail.com</a></li>
            <li>Telephone: <span className="text-gray-600">+351 962136406</span></li>
            <li>Location: Covilhã, Portugal</li> 
          </ul>
        </div>

        {/* Social media */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Social media</h4>
          <div className="flex justify-center md:justify-start space-x-4 text-xl text-gray-600">
            <a href="https://github.com/BrMSilva" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/bruno-marques-691922232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
            target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/marquesdasilvabruno?igsh=MWk0bzJpMHNxMzM1cQ==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="mailto:bruno@gmail.com" className="hover:text-red-600">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}