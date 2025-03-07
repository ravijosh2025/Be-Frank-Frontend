import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons"; // Ant Design Icon
import { Drawer, Button } from "antd"; // Ant Design Drawer for Mobile Menu
import Modal from "../../components/Modals/Model";
import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../store/Auth/authSlice";
import {useLogoutMutation} from "../../store/Auth/authApi"
import { getToken, getUserRole } from "../../utils/authHelpers";
import Donations from "../Donations/Index";

export default function Header() {
  const dispatch = useDispatch();
  const [logout, {isLoading, error}] =useLogoutMutation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = getToken();
  const role = getUserRole().toLowerCase();
  const LogInClose=()=>{
    console.log("Login Closed");
    setIsLoginOpen(false)
  }
  const RegistrationClose=()=>{
    console.log("Registration Closed");
    setIsRegisterOpen(false)
  }

  const handleLogOut=async()=>{
      const response = await logout();
      dispatch(logoutUser());
      console.log("Header   "+ response.message);   
  }
  const toggleForms = () => {
    setIsLoginOpen((prev) => !prev);
    setIsRegisterOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-white shadow sticky z-50 top-0 w-full">
        <nav className="px-4 lg:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="h-12"
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-lg font-medium px-4 py-2 transition ${
                  isActive ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-700 hover:text-orange-700"
                }`
              }
            >
              Home
            </NavLink>
            {["Events", "About", "Contact","Donations"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-lg font-medium px-4 py-2 transition ${
                    isActive ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-700 hover:text-orange-700"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
            {role==="admin" && <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `text-lg font-medium px-4 py-2 transition ${
                  isActive ? "text-orange-700 border-b-2 border-orange-700" : "text-gray-700 hover:text-orange-700"
                }`
              }
            >
              Admin
            </NavLink>}
          </div>
            

          {/* Authentication Buttons (Desktop) */}
          <div className="hidden lg:flex space-x-4">
            { token?(
              <Button type="default" onClick={handleLogOut}>
              Logout
            </Button>
            ):(
              <>
          <Button type="default" onClick={() => setIsLoginOpen(true)}>
            Log in
          </Button>
          <Button   
              type="ghost" 
              style={{
              color: "#FA541C",
              border: "1px solid #FA541C",
              }}
              onClick={() => setIsRegisterOpen(true)}
              >
            Register
          </Button>
          </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuOutlined style={{ fontSize: "24px" }} />
          </button>
        </nav>

        {/* Mobile Drawer (Ant Design) */}
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={() => setMobileMenuOpen(false)}
          visible={mobileMenuOpen}
        >
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block px-4 py-2 transition ${
                    isActive ? "text-orange-700 border-l-4 border-orange-700" : "text-gray-700 hover:text-orange-700"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            {["Events", "About", "Contact", "Donations"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition ${
                      isActive ? "text-orange-700 border-l-4 border-orange-700" : "text-gray-700 hover:text-orange-700"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
            { role==="admin" &&
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block px-4 py-2 transition ${
                    isActive ? "text-orange-700 border-l-4 border-orange-700" : "text-gray-700 hover:text-orange-700"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </NavLink>
            </li>}
            {/* Mobile Authentication Buttons */}
          <div className="hidden lg:flex space-x-4">
            { token? (
              <Button type="default" onClick={handleLogOut}>
              Logout
            </Button>
            ):(
              <>
          <Button type="default" onClick={() => setIsLoginOpen(true)}>
            Log in
          </Button>
          <Button   
              type="ghost" 
              style={{
              color: "#FA541C",
              border: "1px solid #FA541C",
              }}
              onClick={() => setIsRegisterOpen(true)}
              >
            Register
          </Button>
          </>
            )}
          </div>
          </ul>
        </Drawer>
      </header>

      {/* Modals */}
      {isLoginOpen && (
        <Modal isOpen={isLoginOpen} onClose={LogInClose}>
          <LoginForm onClose={setIsLoginOpen} openRegistartion={toggleForms} />
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal isOpen={isRegisterOpen} onClose={RegistrationClose}>
          <RegisterForm onClose={() => setIsRegisterOpen(false)} opneLogin={toggleForms} />
        </Modal>
      )}
    </>
  );
}
