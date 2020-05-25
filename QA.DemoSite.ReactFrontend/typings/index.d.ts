/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module 'react-bootstrap-navbar-offcanvas' {
  import React from 'react';

  export interface NavbarOffcanvasInterface {
    side: 'left' | 'right';
    // children?: any;
  }
  const NavbarOffcanvas: React.ComponentClass<NavbarOffcanvasInterface>;
  export default NavbarOffcanvas;
  // export default NavbarOffcanvas: React.ComponentClass<NavbarOffcanvasInterface>
}
