
import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {  Nav, Image, Navbar, Dropdown, Container } from 'react-bootstrap';
import { auth } from '../services/firebaseConfig';
import { signOut } from "firebase/auth";

const NavbarComponent = (props) => {
  const {email} = useSelector(state => state.membersSlice);
  const onSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("_u");
      props.history.push("/login");
    })
  }

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 mb-3">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={`${process.env.PUBLIC_URL}/images/user-flat.svg`} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{email}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold" onClick={() => onSignOut()}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavbarComponent);