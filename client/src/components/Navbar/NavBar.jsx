import { Link, NavLink } from 'react-router-dom';

import './navbar.less';
import { useRef } from 'react';

const NavBar = () => {
   const backdropRef = useRef(null);

   const moveBackdrop = (event) => {
      const { x, width, height, top } = event.target.getBoundingClientRect();

      if (backdropRef.current) {
         backdropRef.current.style.setProperty('--x-pos', `${x}px`);
         backdropRef.current.style.setProperty('--width', `${width}px`);
         backdropRef.current.style.setProperty('--height', `${height}px`);
         backdropRef.current.style.setProperty('--top', `${top}px`);

         backdropRef.current.style.opacity = '1';
         backdropRef.current.style.visibility = 'visible';
      }
   };

   const hideBackdrop = () => {
      if (backdropRef.current) {
         backdropRef.current.style.opacity = '0';
         backdropRef.current.style.visibility = 'hidden';
      }
   };

   return (
      <nav className='navbar' id='navbar'>
         <div className='logo'>
            <Link to={'/'}>
               Recipe<span>Explorer</span>
            </Link>
         </div>
         <ul className='nav-links'>
            <li
               className='nav-link'
               onMouseEnter={moveBackdrop}
               onMouseLeave={hideBackdrop}
            >
               <NavLink to='/home'>Home</NavLink>
            </li>
            <li
               className='nav-link'
               onMouseEnter={moveBackdrop}
               onMouseLeave={hideBackdrop}
            >
               <NavLink to='/recipes'>Recipes</NavLink>
            </li>
            <li
               className='nav-link'
               onMouseEnter={moveBackdrop}
               onMouseLeave={hideBackdrop}
            >
               <NavLink to='/about'>About</NavLink>
            </li>
         </ul>

         <div className='nav-right'>
            <div
               className='nav-link'
               onMouseEnter={moveBackdrop}
               onMouseLeave={hideBackdrop}
            >
               <NavLink to='/login'>Login</NavLink>
            </div>
         </div>

         <div
            className='nav-link-backdrop'
            id='navLinkBackdrop'
            ref={backdropRef}
         />
      </nav>
   );
};

export default NavBar;
