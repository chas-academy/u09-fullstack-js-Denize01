import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between items-center bg-gray-800 text-white w-full py-4 relative z-20 px-4">
      {/* Vänster sida: Trackster App Text */}
      <div className="flex items-center">
        <p className="text-lg font-bold tracking-widest">
          T R A C K S T E R&nbsp;&nbsp;&nbsp;A P P
        </p>
      </div>

      {/* Mitten: Länkar */}
      <div className="flex items-center">
        <ul className="flex items-center space-x-2">
          <li className="text-gray-400">|</li>

          <li className="flex items-center">
            <a
              href="https://www.instagram.com/tracksterapp/profilecard/?igsh=dHIzOXB6Nzk3c2Uw"
              className="hover:text-gray-300 transition duration-300 flex items-center"
            >
              Contact Us
              <svg
                className="w-5 h-5 ml-2"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <radialGradient id="a" cx=".4" cy="1" r="1">
                  <stop offset=".1" stopColor="#fd5" />
                  <stop offset=".5" stopColor="#ff543e" />
                  <stop offset="1" stopColor="#c837ab" />
                </radialGradient>
                <linearGradient id="b" x2=".2" y2="1">
                  <stop offset=".1" stopColor="#3771c8" />
                  <stop offset=".5" stopColor="#60f" stopOpacity="0" />
                </linearGradient>
                <rect id="c" height="512" rx="15%" width="512" />
                <use fill="url(#a)" xlinkHref="#c" />
                <use fill="url(#b)" xlinkHref="#c" />
                <g fill="none" stroke="#fff" strokeWidth="30">
                  <rect height="308" rx="81" width="308" x="102" y="102" />
                  <circle cx="256" cy="256" r="72" />
                  <circle cx="347" cy="165" r="6" />
                </g>
              </svg>
            </a>
          </li>
          <li className="text-gray-400">|</li>
        </ul>
      </div>

      {/* Höger sida: Copyright Information */}
      <div className="flex items-center">
        <p className="text-sm md:text-right">
          © 2024 Trackster App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
