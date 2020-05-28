import React from 'react';
import { PageContext, TopMenuWidgetModel } from 'common/models';
import { Image, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink } from 'react-bootstrap';
import { PageStructureContext, PageStructureContextInterface } from 'page-structure';
import './styles.scss';
import { WidgetProps } from '../../widget-props';

export const TopMenuWidget: React.FunctionComponent<WidgetProps<TopMenuWidgetModel>> = () => (
  <PageStructureContext.Consumer>
    {(context?: PageStructureContextInterface) => {
      const model = (context as PageContext).topMenuModel;
      return (
        <React.Fragment>
          <Navbar expand="sm">
            <NavbarBrand>
              <a href={'/'}>
                <Image src="/img/quantum_logo.png" alt="quantum_logo" />
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
                  ),
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </React.Fragment>
      );
    }}
  </PageStructureContext.Consumer>
);
