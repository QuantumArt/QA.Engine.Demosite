import React, { MouseEvent } from 'react';
import { WidgetProps } from 'common/components/widget-props';
import { PageContext, TopMenuWidgetModel } from 'common/models';
import { Button, Image, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink } from 'react-bootstrap';
import { PageStructureContext, PageStructureContextInterface } from 'page-structure';
import './styles.scss';

// import NavbarOffcanvas from 'react-bootstrap-navbar-offcanvas';

interface TopMenuWidgetState {
  offCanvasMenuOpened: boolean;
}

export class TopMenuWidget extends React.Component<WidgetProps<TopMenuWidgetModel>, TopMenuWidgetState> {
  constructor(props: WidgetProps<TopMenuWidgetModel>) {
    super(props);
    this.state = { offCanvasMenuOpened: false };
  }

  toggleMenuClick = (event: MouseEvent<Button | HTMLDivElement>): void => {
    console.log('toggleMenuClick');
    event.preventDefault();
    this.setState({ offCanvasMenuOpened: !this.state.offCanvasMenuOpened });
  };

  render(): JSX.Element {
    // let {widget} = this.props;
    return (
      <PageStructureContext.Consumer>
        {(context?: PageStructureContextInterface) => {
          const model = (context as PageContext).topMenuModel;
          return (
            <React.Fragment>
              {/*<Sticky enabled={true}>*/}
              <Navbar expand="sm">
                <NavbarBrand>
                  <a href={'/'}>
                    <Image
                      src="/img/quantum_logo.png"
                      alt="quantum_logo"
                      // style={{ paddingTop: '13px' }}
                      // className="img-responsive"
                    />
                  </a>
                </NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Nav className="ml-auto justify-content-end">
                    {model?.items.map(item =>
                      item.children.length === 0 ? (
                        <NavItem key={item.id}>
                          <NavLink href={item.href} key={item.href}>
                            {item.title}
                          </NavLink>
                          {/*{item.title}*/}
                        </NavItem>
                      ) : (
                        <NavDropdown title={item.title} id={item.alias} key={`${item.href}-navdropdown`}>
                          <NavDropdown.Item href={item.href} key={item.href}>
                            {item.title}
                          </NavDropdown.Item>

                          {item.children.map(childItem => (
                            <NavDropdown.Item as={NavLink} key={childItem.href} href={childItem.href}>
                              {childItem.title}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                        // <NavDropdown
                        //   key={item.id}
                        //   title={item.title}
                        //   id={`nav-dropdown-${item.id}`}
                        //   eventKey={item.id}
                        //   href={item.href}
                        // >
                        //   {/*{item.title}*/}
                        //   {item.children.map(childItem => (
                        //     <NavDropdown.Item
                        //       // eventKey={childItem.id}
                        //       href={childItem.href}
                        //       key={childItem.id}
                        //       className={classNames({ active: childItem.isActive })}
                        //     >
                        //       {childItem.title}
                        //     </NavDropdown.Item>
                        //   ))}
                        // </NavDropdown>
                      ),
                    )}
                  </Nav>
                </Navbar.Collapse>

                {/*<Button className="btn menu-toggle-btn" bsClass="stub" onClick={this.toggleMenuClick}>*/}
                {/*  <FontAwesomeIcon icon={faBars} /> Меню*/}
                {/*</Button>*/}

                {/*<NavbarOffcanvas side="right">*/}
                {/*<Nav className="justify-content-end">*/}
                {/*</Nav>*/}
              </Navbar>
              {/*</Sticky>*/}
              {/*<div className={classNames('off-canvas-menu', { 'menu-open': this.state.offCanvasMenuOpened })}>*/}
              {/*  <Button className="off-canvas-menu--close-btn" bsClass="stub" onClick={this.toggleMenuClick}>*/}
              {/*    <FontAwesomeIcon icon={faTimes} />*/}
              {/*  </Button>*/}
              {/*  <div className="off-canvas-menu-logo">*/}
              {/*    <a href="/">*/}
              {/*      <Image src="/img/quantum_logo.png" alt="" className="img-responsive center-block" />*/}
              {/*    </a>*/}
              {/*  </div>*/}
              {/*  <Nav bsStyle={'pills'} stacked>*/}
              {/*    {model?.items.map(item =>*/}
              {/*      item.children.length === 0 ? (*/}
              {/*        <NavItem*/}
              {/*          href={item.href}*/}
              {/*          eventKey={item.id}*/}
              {/*          className={classNames({ active: item.isActive, open: some(item.children, x => x.isActive) })}*/}
              {/*          key={item.id}*/}
              {/*        >*/}
              {/*          {item.title}*/}
              {/*        </NavItem>*/}
              {/*      ) : (*/}
              {/*        <NavDropdown*/}
              {/*          key={item.id}*/}
              {/*          title={item.title}*/}
              {/*          id={`nav-dropdown-${item.id}`}*/}
              {/*          eventKey={item.id}*/}
              {/*          href={item.href}*/}
              {/*          className={classNames('dropdown-toggle', {*/}
              {/*            active: item.isActive,*/}
              {/*            opened: item.hasActiveChild,*/}
              {/*          })}*/}
              {/*        >*/}
              {/*          {item.children.map(childItem => (*/}
              {/*            <MenuItem*/}
              {/*              eventKey={childItem.id}*/}
              {/*              href={childItem.href}*/}
              {/*              key={childItem.id}*/}
              {/*              className={classNames({ active: childItem.isActive })}*/}
              {/*            >*/}
              {/*              <FontAwesomeIcon icon={faAngleRight} fixedWidth />*/}
              {/*              {childItem.title}*/}
              {/*            </MenuItem>*/}
              {/*          ))}*/}
              {/*        </NavDropdown>*/}
              {/*      ),*/}
              {/*    )}*/}
              {/*  </Nav>*/}
              {/*</div>*/}
              <div className="off-canvas-menu-overlay" onClick={this.toggleMenuClick} />
            </React.Fragment>
          );
        }}
      </PageStructureContext.Consumer>
    );
  }
}
