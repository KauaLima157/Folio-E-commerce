import { Link } from "react-router-dom";

import { ProfileMenu } from "../components/ProfileMenu";

import { useAuth } from "../hook/authHook";

export function Header() {

  const { user } = useAuth();

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

      <nav className="header-nav">

        <Link
          to="/"
          className="nav-link-pill active"
        >
          Home
        </Link>

        {user ? (
          <ProfileMenu />
        ) : (
          <>

            <Link
              to="/auth/login"
              className="nav-link-pill"
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

        <div className="cart-icon">

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

        </div>

      </nav>
    </header>
  );
}