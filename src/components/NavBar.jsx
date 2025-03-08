import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VarFitLogo from "./VarFitLogo";
import { auth } from "../firebase/firebaseConfig";
import { Logout } from "../firebase/auth";

const Navbar = () => {
    const currentUser = auth.currentUser;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        setIsOpen(false);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md z-20 relative">
            <div className="mx-auto flex justify-between items-center p-4">
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    className="flex items-center z-30"
                >
                    <VarFitLogo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {currentUser ? (
                        <>
                            <NavLink to="/workouts">Workouts</NavLink>
                            <NavLink to="/exercises">Exercises</NavLink>
                            <NavLink to="/plan">Plan</NavLink>
                            <NavLink to="/progress">Progress</NavLink>
                            <NavLink to="/" isButton onClick={() => Logout(auth)}>Logout</NavLink>
                        </>) :
                        (<NavLink to="/login" isButton>
                            Login
                        </NavLink>)}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none z-30"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? (
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>

            {/* Background Overlay (only visible when menu is open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-green-100 bg-opacity-50 z-10"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden bg-white shadow-md absolute top-16 left-0 w-full p-4 space-y-4 z-20`}  // Set z-index to 20 for dropdown
                aria-hidden={!isOpen}
            >
                {currentUser ? (
                    <>
                        <NavLink to="/workouts" onClick={() => setIsOpen(false)} mobile>
                            Workout
                        </NavLink>
                        <NavLink to="/exercises" onClick={() => setIsOpen(false)} mobile>
                            Exercises
                        </NavLink>
                        <NavLink to="/plan" onClick={() => setIsOpen(false)} mobile>
                            Plan
                        </NavLink>
                        <NavLink to="/progress" onClick={() => setIsOpen(false)} mobile>
                            Progress
                        </NavLink>
                        <NavLink to="/" isButton onClick={() => Logout(auth)} mobile>Logout</NavLink>
                    </>) :
                    (<NavLink to="/login" isButton onClick={() => setIsOpen(false)} mobile>
                        Login
                    </NavLink>)}
            </div>
        </nav>
    );
};

/* Custom NavLink Component */
const NavLink = ({ to, children, isButton, onClick, mobile }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`${isButton
                ? "bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
                : "text-gray-700 hover:text-red-600 transition"
                } font-medium ${mobile ? "block text-center py-4" : ""}`}
        >
            {children}
        </Link>
    );
};

export default Navbar;
