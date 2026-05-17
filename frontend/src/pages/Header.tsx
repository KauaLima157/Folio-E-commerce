import { Link } from "react-router-dom";
import { useState } from "react";
import { ProfileMenu } from "../components/ProfileMenu";
import style from "../styles/header.module.css";
import { useAuth } from "../hook/authHook";

// header 01
export function Header() {

  const { user } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleEventClick = () => {
      setIsActive(true);
  }
  const handleCloseCart = () => {
      setIsActive(false);
  }

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
        <Link to="/" className="nav-link-pill active">
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
          <button className={style.buttonCart} onClick={handleEventClick}>
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

       {isActive && (
          <div className={style.cartOverlay} onClick={handleCloseCart}>
            <div className={style.cartModal}>

              <div className={style.cartHeader}>
                <div>
                  <span className={style.cartSubtitle}>
                    Minha sacola
                  </span>

                  <h2>Seus Livros</h2>
                </div>

                <button
                  className={style.closeBtn}
                  onClick={handleCloseCart}
                >
                  ✕
                </button>
              </div>

              <div className={style.cartItems}>

                <div className={style.cartItem}>
                  <div className={`${style.bookCover} ${style.blue}`} />

                  <div className={style.bookContent}>
                    <span className={style.category}>
                      Literatura
                    </span>

                    <h3>Dom Casmurro</h3>

                    <p>Machado de Assis</p>

                    <div className={style.itemFooter}>
                      <strong>R$ 39,90</strong>

                      <div className={style.quantity}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className={style.cartFooter}>

                <div className={style.summary}>
                  <div>
                    <span>Subtotal</span>
                    <strong>R$ 39,90</strong>
                  </div>

                  <div>
                    <span>Entrega</span>
                    <strong>Grátis</strong>
                  </div>
                </div>

                <div className={style.total}>
                  <span>Total</span>
                  <h3>R$ 39,90</h3>
                </div>

                <button className={style.checkoutBtn}>
                  Finalizar compra →
                </button>

              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// header 02
export function Header02() {

  const { user } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleEventClick = () => {
      setIsActive(true);
  }
  const handleCloseCart = () => {
      setIsActive(false);
  }

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
        <Link to="/" className="nav-link-pill2 active">
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
              className="nav-btn-primary2"
            >
              Criar conta →
            </Link>
          </>
        )}

        <div className="cart-icon2">
          <button className={style.buttonCart} onClick={handleEventClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F0EDE6"
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

       {isActive && (
          <div className={style.cartOverlay} onClick={handleCloseCart}>
            <div className={style.cartModal}>

              <div className={style.cartHeader}>
                <div>
                  <span className={style.cartSubtitle}>
                    Minha sacola
                  </span>

                  <h2>Seus Livros</h2>
                </div>

                <button
                  className={style.closeBtn}
                  onClick={handleCloseCart}
                >
                  ✕
                </button>
              </div>

              <div className={style.cartItems}>

                <div className={style.cartItem}>
                  <div className={`${style.bookCover} ${style.blue}`} />

                  <div className={style.bookContent}>
                    <span className={style.category}>
                      Literatura
                    </span>

                    <h3>Dom Casmurro</h3>

                    <p>Machado de Assis</p>

                    <div className={style.itemFooter}>
                      <strong>R$ 39,90</strong>

                      <div className={style.quantity}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className={style.cartFooter}>

                <div className={style.summary}>
                  <div>
                    <span>Subtotal</span>
                    <strong>R$ 39,90</strong>
                  </div>

                  <div>
                    <span>Entrega</span>
                    <strong>Grátis</strong>
                  </div>
                </div>

                <div className={style.total}>
                  <span>Total</span>
                  <h3>R$ 39,90</h3>
                </div>

                <button className={style.checkoutBtn}>
                  Finalizar compra →
                </button>

              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// header 03
export function Header03() {

  const { user } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleEventClick = () => {
      setIsActive(true);
  }
  const handleCloseCart = () => {
      setIsActive(false);
  }

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
        <Link to="/" className="nav-link-pill3 active">
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

        <div className="cart-icon2">
          <button className={style.buttonCart} onClick={handleEventClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
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

       {isActive && (
          <div className={style.cartOverlay} onClick={handleCloseCart}>
            <div className={style.cartModal}>

              <div className={style.cartHeader}>
                <div>
                  <span className={style.cartSubtitle}>
                    Minha sacola
                  </span>

                  <h2>Seus Livros</h2>
                </div>

                <button
                  className={style.closeBtn}
                  onClick={handleCloseCart}
                >
                  ✕
                </button>
              </div>

              <div className={style.cartItems}>

                <div className={style.cartItem}>
                  <div className={`${style.bookCover} ${style.blue}`} />

                  <div className={style.bookContent}>
                    <span className={style.category}>
                      Literatura
                    </span>

                    <h3>Dom Casmurro</h3>

                    <p>Machado de Assis</p>

                    <div className={style.itemFooter}>
                      <strong>R$ 39,90</strong>

                      <div className={style.quantity}>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className={style.cartFooter}>

                <div className={style.summary}>
                  <div>
                    <span>Subtotal</span>
                    <strong>R$ 39,90</strong>
                  </div>

                  <div>
                    <span>Entrega</span>
                    <strong>Grátis</strong>
                  </div>
                </div>

                <div className={style.total}>
                  <span>Total</span>
                  <h3>R$ 39,90</h3>
                </div>

                <button className={style.checkoutBtn}>
                  Finalizar compra →
                </button>

              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
