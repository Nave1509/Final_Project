import { NavLink } from "react-router-dom";
import { useStore } from "../../context/store.context";

const Footer = () => {
  const { user } = useStore();
  return (
    <div className="footer">
      <div id="Icons">
        <ul id="ListIcon">
          <li>
            <a href="https://www.facebook.com">
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li>
            <a href="tel:0505555555">
              <i className="bi bi-telephone-fill"></i>
            </a>
          </li>
          <li>
            <a href="mailto:office@mystore.com">
              <i className="bi bi-envelope-fill"></i>
            </a>
          </li>
        </ul>
      </div>
      <div id="footerAbout">
        <nav className="navbar">
          <div className="navbar-nav navbar-collapse">
            <a className="nav-link" href="/about">
              About
            </a>
          </div>
        </nav>
      </div>
      <div id="footerBottom">
        <p>All Right Reserved to M&N Market.</p>
        <p>Designed and Built by Nave Cohen.</p>
      </div>
    </div>
  );
};
export default Footer;
