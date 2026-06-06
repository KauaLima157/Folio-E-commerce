import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hook/authHook";

import style from "../styles/auth/profile.module.css";

export function ProfileMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className={style.navRight}>
      <div className={style.profileContainer}>
        <button
          className={style.profileBtn}
          onClick={() => setOpenModal(!openModal)}
        >
          <img
            src="https://c.saavncdn.com/346/Giga-Chad-English-2022-20230623063017-500x500.jpg"
            alt="User"
          />

          <div className={style.profileInfo}>
            <span className={style.name}>
              {user?.email?.split("@")[0]}
            </span>

            <span className={style.email}>
              {user?.email}
            </span>
          </div>
        </button>

        <div
          className={`${style.profileModal} ${
            openModal ? style.active : ""
          }`}
        >
          <div className={style.modalHeader}>
            <img
              src="https://c.saavncdn.com/346/Giga-Chad-English-2022-20230623063017-500x500.jpg"
              alt="User"
            />

            <div>
              <h3>
                {user?.email?.split("@")[0]}
              </h3>

              <p>{user?.email}</p>
            </div>
          </div>

          <div className={style.modalOptions}>
                <button
                    className={style.modalButton}
                    onClick={() => navigate("/profile")}
                >
                    Meu Perfil
                </button>

                <button
                    className={style.modalButton}
                    onClick={() => navigate("/settings")}
                >
                    Configurações
                </button>

                <button
                    className={`${style.modalButton} ${style.logout}`}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}