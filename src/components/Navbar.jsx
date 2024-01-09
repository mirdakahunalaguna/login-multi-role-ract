// Import React dan beberapa modul dari React ecosystem
import React from "react";
import logo from "../logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

// Deklarasi komponen Navbar
const Navbar = () => {
  // Menggunakan React Hooks untuk mendapatkan dispatch, fungsi navigate, dan data user dari Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Fungsi logout yang akan dipanggil saat tombol logout ditekan
  const logout = () => {
    dispatch(LogOut()); // Memanggil aksi LogOut dari Redux
    dispatch(reset()); // Mereset state menggunakan aksi reset
    navigate("/"); // Melakukan navigasi kembali ke halaman utama ("/")
  };

  // Mengembalikan tampilan JSX untuk komponen Navbar
  return (
    <div>
      {/* Navbar dengan styling menggunakan Bulma CSS */}
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        {/* Bagian brand navbar dengan logo dan navigasi ke halaman dashboard */}
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>

          {/* Tombol burger menu yang digunakan di versi mobile (tidak digunakan di sini) */}
          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* Bagian menu navbar dengan tombol logout */}
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* Tombol logout dengan event handler yang memanggil fungsi logout saat diklik */}
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

// Mendeklarasikan bahwa komponen Navbar dapat diekspor
export default Navbar;
