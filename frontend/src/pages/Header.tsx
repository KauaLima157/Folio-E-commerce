import { Link } from "react-router-dom";
import { useState } from "react";
import { ProfileMenu } from "../components/ProfileMenu";
import style from "../styles/header.module.css";
import { useAuth } from "../hook/authHook";

// header 01
export function Header({ onOpenCart }: { onOpenCart?: () => void }) {

  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="hero-header">
      <div className="header-logo">
        <span className="folio-text">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 4L4 14L26 24L48 14L26 4Z"
              stroke="var(--color-primary)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 24L26 34L48 24"
              stroke="var(--color-primary)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 34L26 44L48 34"
              stroke="var(--color-primary)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)}></div>}

      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
          &times;
        </button>

        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <Link
              to="/auth/login"
              className="btn-login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="nav-btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              Criar conta →
            </Link>
          </>
        )}

        <div className="cart-icon desktop-only">
          <button className={style.buttonCart} onClick={onOpenCart}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="21"
                  r="1"
                />
                <circle
                  cx="20"
                  cy="21"
                  r="1"
                  />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

// header 02
export function Header02({ onOpenCart }: { onOpenCart?: () => void }) {

  const { user } = useAuth();

  return (
    <header className="hero-header2">
      <div className="header-logo2">
        <span className="folio-text2">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 4L4 14L26 24L48 14L26 4Z"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 24L26 34L48 24"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 34L26 44L48 34"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <nav className="header-nav2">

        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <Link
              to="/auth/login"
              className="btn-login2"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="nav-btn-primary2"
            >
              Criar conta →
            </Link>
          </>
        )}

        <div className="cart-icon2">
          <button className={style.buttonCartDark} onClick={onOpenCart}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="21"
                  r="1"
                />
                <circle
                  cx="20"
                  cy="21"
                  r="1"
                  />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

// header 03
export function Header03({ onOpenCart }: { onOpenCart?: () => void }) {

  const { user } = useAuth();

  return (
    <header className="hero-header3">
      <div className="header-logo3">
        <span className="folio-text3">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 52 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 4L4 14L26 24L48 14L26 4Z"
              stroke="#000000"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 24L26 34L48 24"
              stroke="#000000"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M4 34L26 44L48 34"
              stroke="#000000"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <nav className="header-nav3">

        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <Link
              to="/auth/login"
              className="btn-login3"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="nav-btn-primary"
            >
              Criar conta →
            </Link>
          </>
        )}

        <div className="cart-icon2">
          <button className={style.buttonCart} onClick={onOpenCart}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="21"
                  r="1"
                />
                <circle
                  cx="20"
                  cy="21"
                  r="1"
                  />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
