import { FormRegister } from "../components/Form.js";
import style from "../styles/auth/register.module.css";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function Register() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      
      <button
        className={style.backButton}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <div className={`${style.left} ${style.fadeUp}`}>
        <FormRegister />

        <div className={style.loginRedirect}>
          <span>Já possui uma conta?</span>

          <button onClick={() => navigate("/auth/login")}>
            Fazer login
          </button>
        </div>
      </div>

      <div className={`${style.right} ${style.fadeDown}`}>
        <img
          className={style.imageRegister}
          src="/assets/auth/register.svg"
          alt="imagem do menino lendo livro"
        />
      </div>
    </div>
  );
}