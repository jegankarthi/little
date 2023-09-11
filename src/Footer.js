import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="social-media-icons">
        <a href="https://www.facebook.com/">
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com/">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram />
        </a>
      </div>
      <p className="footer-text">
        Follow us on social media for updates and news!
      </p>
    </footer>
  );
};

export default Footer;
