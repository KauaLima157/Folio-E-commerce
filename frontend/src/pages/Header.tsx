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
      <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
        <span className="folio-text">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 256 235"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m255.7 96.91c1.01-2.77-0.07-4.63-1.77-5.6l-56.13-33.18c1.86-2.08 2.52-5.18 1.33-8.04-0.4-0.99-1.13-1.83-2.04-2.41l-71.27-46.5c-1.03-0.65-2.24-0.99-3.45-0.92l-103.3 15.02c-7.19 0.53-10.08 9.85-10.08 14.52v21.4c0 5.31 2.53 8.57 8.3 11.55l6.45 3.99c-1.25 2.25-1.41 4.33-1.41 6.05v24.7c0 5.75 2.51 8.71 7.94 11.94l19.25 10.88-47.76 34.8c-1.66 1.22-2.18 3.5-1.27 5.42 7.37 15.66 6.67 26.38-0.16 46.32-0.48 1.39-0.3 2.89 0.48 4.06s2.06 1.9 3.44 2.05l125.6 21.16c2.22 0.4 4.62-0.24 6.38-2.03l90.25-62.87c5.96-3.65 6.38-9.96 5.66-19.14l20.57-3.64c1.43-0.28 2.66-1.2 3.3-2.57 0.63-1.41 0.55-3.03-0.14-4.41-6.88-15.88-4.72-28.44-0.1-42.55zm-132.8-89.11 63.33 41.09-91.1 14.95-63.37-41.27 91.14-14.77zm-106.4 43.4v-21.4c0-2.37 1.4-4.66 2.32-5.14l68.22 42.4c-1.76 2.41-2.39 5.33-2.39 8.64l-0.07 19.51-63.61-38.88c-3.55-1.91-4.47-2.47-4.47-5.13zm14.66 43.61v-24.03l58.71 36.63c0.9 0.57 1.95 0.85 3 0.85 0.31 0 0.63-0.03 0.94-0.09l11.26-1.92 14.04 9.23c-3.49 3.01-4.19 7.77-4.19 11.83v25.95l-80.61-50.41c-2.47-1.67-3.15-3.58-3.15-8.04zm102.2 128.6c0 2.12-1.68 2.61-3.29 2.26l-121.9-21.11c5.54-16.93 6.76-27.5 0.69-41.69l120.1 21.09c2.84 0.55 4.42 3.31 4.42 5.7v33.75zm-2.27-46.35-3.9-2.67-114.4-18.95 44.03-30.53 63.06 39.73c1.54 1.13 3.42 1.66 5.31 1.33l20.47-3.31-14.58 14.4zm90.85-13.26-80.17 54.96v-29.49c0-4.59-1.31-8.27-4.21-10.96l26.05-18 60.83-9.6c0.41 6.51 0.32 10.9-2.5 13.09zm-98.42-5.17c-0.74 0.13-1.95-0.91-1.95-2.04v-30.71c0-3.52 1.66-5.71 4.62-6.15l120-17.72c-3.27 11.75-4.58 22.2 0.93 36.99l-123.6 19.63zm4.21-46.7c-0.95 0.16-1.72-0.12-2.46-0.67l-9.14-5.9 79.89-13.12c1.72-0.3 3.16-1.29 3.83-2.83 0.66-1.53 0.59-3.34-0.56-5.18-3.47-5.42-4.24-13.45-3.16-19.02l45.54 29.14-113.9 17.58zm63.26-55.79c-3.3 9.22-3.13 18.92-0.13 28.09l-97.93 17-0.63-0.39v-25.09c0-2.57 1.15-4.24 3.46-4.63l95.23-14.98z"
              fill="var(--color-primary)"
            />
          </svg>
        </div>
      </Link>

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
      <Link to="/" className="header-logo2" style={{ textDecoration: 'none' }}>
        <span className="folio-text2">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 256 235"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m255.7 96.91c1.01-2.77-0.07-4.63-1.77-5.6l-56.13-33.18c1.86-2.08 2.52-5.18 1.33-8.04-0.4-0.99-1.13-1.83-2.04-2.41l-71.27-46.5c-1.03-0.65-2.24-0.99-3.45-0.92l-103.3 15.02c-7.19 0.53-10.08 9.85-10.08 14.52v21.4c0 5.31 2.53 8.57 8.3 11.55l6.45 3.99c-1.25 2.25-1.41 4.33-1.41 6.05v24.7c0 5.75 2.51 8.71 7.94 11.94l19.25 10.88-47.76 34.8c-1.66 1.22-2.18 3.5-1.27 5.42 7.37 15.66 6.67 26.38-0.16 46.32-0.48 1.39-0.3 2.89 0.48 4.06s2.06 1.9 3.44 2.05l125.6 21.16c2.22 0.4 4.62-0.24 6.38-2.03l90.25-62.87c5.96-3.65 6.38-9.96 5.66-19.14l20.57-3.64c1.43-0.28 2.66-1.2 3.3-2.57 0.63-1.41 0.55-3.03-0.14-4.41-6.88-15.88-4.72-28.44-0.1-42.55zm-132.8-89.11 63.33 41.09-91.1 14.95-63.37-41.27 91.14-14.77zm-106.4 43.4v-21.4c0-2.37 1.4-4.66 2.32-5.14l68.22 42.4c-1.76 2.41-2.39 5.33-2.39 8.64l-0.07 19.51-63.61-38.88c-3.55-1.91-4.47-2.47-4.47-5.13zm14.66 43.61v-24.03l58.71 36.63c0.9 0.57 1.95 0.85 3 0.85 0.31 0 0.63-0.03 0.94-0.09l11.26-1.92 14.04 9.23c-3.49 3.01-4.19 7.77-4.19 11.83v25.95l-80.61-50.41c-2.47-1.67-3.15-3.58-3.15-8.04zm102.2 128.6c0 2.12-1.68 2.61-3.29 2.26l-121.9-21.11c5.54-16.93 6.76-27.5 0.69-41.69l120.1 21.09c2.84 0.55 4.42 3.31 4.42 5.7v33.75zm-2.27-46.35-3.9-2.67-114.4-18.95 44.03-30.53 63.06 39.73c1.54 1.13 3.42 1.66 5.31 1.33l20.47-3.31-14.58 14.4zm90.85-13.26-80.17 54.96v-29.49c0-4.59-1.31-8.27-4.21-10.96l26.05-18 60.83-9.6c0.41 6.51 0.32 10.9-2.5 13.09zm-98.42-5.17c-0.74 0.13-1.95-0.91-1.95-2.04v-30.71c0-3.52 1.66-5.71 4.62-6.15l120-17.72c-3.27 11.75-4.58 22.2 0.93 36.99l-123.6 19.63zm4.21-46.7c-0.95 0.16-1.72-0.12-2.46-0.67l-9.14-5.9 79.89-13.12c1.72-0.3 3.16-1.29 3.83-2.83 0.66-1.53 0.59-3.34-0.56-5.18-3.47-5.42-4.24-13.45-3.16-19.02l45.54 29.14-113.9 17.58zm63.26-55.79c-3.3 9.22-3.13 18.92-0.13 28.09l-97.93 17-0.63-0.39v-25.09c0-2.57 1.15-4.24 3.46-4.63l95.23-14.98z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </Link>

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
      <Link to="/" className="header-logo3" style={{ textDecoration: 'none' }}>
        <span className="folio-text3">
          Folio
        </span>
        <div className="logo-books-icon">
          <svg
            width="52"
            height="48"
            viewBox="0 0 256 235"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m255.7 96.91c1.01-2.77-0.07-4.63-1.77-5.6l-56.13-33.18c1.86-2.08 2.52-5.18 1.33-8.04-0.4-0.99-1.13-1.83-2.04-2.41l-71.27-46.5c-1.03-0.65-2.24-0.99-3.45-0.92l-103.3 15.02c-7.19 0.53-10.08 9.85-10.08 14.52v21.4c0 5.31 2.53 8.57 8.3 11.55l6.45 3.99c-1.25 2.25-1.41 4.33-1.41 6.05v24.7c0 5.75 2.51 8.71 7.94 11.94l19.25 10.88-47.76 34.8c-1.66 1.22-2.18 3.5-1.27 5.42 7.37 15.66 6.67 26.38-0.16 46.32-0.48 1.39-0.3 2.89 0.48 4.06s2.06 1.9 3.44 2.05l125.6 21.16c2.22 0.4 4.62-0.24 6.38-2.03l90.25-62.87c5.96-3.65 6.38-9.96 5.66-19.14l20.57-3.64c1.43-0.28 2.66-1.2 3.3-2.57 0.63-1.41 0.55-3.03-0.14-4.41-6.88-15.88-4.72-28.44-0.1-42.55zm-132.8-89.11 63.33 41.09-91.1 14.95-63.37-41.27 91.14-14.77zm-106.4 43.4v-21.4c0-2.37 1.4-4.66 2.32-5.14l68.22 42.4c-1.76 2.41-2.39 5.33-2.39 8.64l-0.07 19.51-63.61-38.88c-3.55-1.91-4.47-2.47-4.47-5.13zm14.66 43.61v-24.03l58.71 36.63c0.9 0.57 1.95 0.85 3 0.85 0.31 0 0.63-0.03 0.94-0.09l11.26-1.92 14.04 9.23c-3.49 3.01-4.19 7.77-4.19 11.83v25.95l-80.61-50.41c-2.47-1.67-3.15-3.58-3.15-8.04zm102.2 128.6c0 2.12-1.68 2.61-3.29 2.26l-121.9-21.11c5.54-16.93 6.76-27.5 0.69-41.69l120.1 21.09c2.84 0.55 4.42 3.31 4.42 5.7v33.75zm-2.27-46.35-3.9-2.67-114.4-18.95 44.03-30.53 63.06 39.73c1.54 1.13 3.42 1.66 5.31 1.33l20.47-3.31-14.58 14.4zm90.85-13.26-80.17 54.96v-29.49c0-4.59-1.31-8.27-4.21-10.96l26.05-18 60.83-9.6c0.41 6.51 0.32 10.9-2.5 13.09zm-98.42-5.17c-0.74 0.13-1.95-0.91-1.95-2.04v-30.71c0-3.52 1.66-5.71 4.62-6.15l120-17.72c-3.27 11.75-4.58 22.2 0.93 36.99l-123.6 19.63zm4.21-46.7c-0.95 0.16-1.72-0.12-2.46-0.67l-9.14-5.9 79.89-13.12c1.72-0.3 3.16-1.29 3.83-2.83 0.66-1.53 0.59-3.34-0.56-5.18-3.47-5.42-4.24-13.45-3.16-19.02l45.54 29.14-113.9 17.58zm63.26-55.79c-3.3 9.22-3.13 18.92-0.13 28.09l-97.93 17-0.63-0.39v-25.09c0-2.57 1.15-4.24 3.46-4.63l95.23-14.98z"
              fill="#000000"
            />
          </svg>
        </div>
      </Link>

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
