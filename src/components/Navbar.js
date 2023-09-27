import { useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from '../data';
import logo from '../logo.svg';
import style from './Navbar.module.css';
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height + 16}px`
      : '0px',
  };
  return (
    <nav>
      <div className={style.NavCenter}>
        <div className={style.NavHeader}>
          <img src={logo} className={style.Logo} alt="logo" />
          <button className={style.NavToggle} onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>

        <div
          className={style.LinksContainer}
          ref={linksContainerRef}
          style={linkStyles}
        >
          <ul className={style.Links} ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social links */}
        <ul className={style.SocialIcons}>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
