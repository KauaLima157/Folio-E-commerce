import { useNavigate } from "react-router-dom";
import { ArrowLeft} from "lucide-react";

import { FormLogin } from "../components/Form.js";
import style from "../styles/auth/login.module.css";

export function Login() {
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
        <FormLogin />

        <div className={style.registerRedirect}>
          <span>Ainda não tem uma conta?</span>

          <button onClick={() => navigate("/auth/register")}>
            Criar conta
          </button>
        </div>
      </div>

      <div className={`${style.right} ${style.fadeDown}`}>
        <img
          className={style.imageLogin}
          src="/assets/auth/login.svg"
          alt="imagem da menina do livro"
        />
      </div>
    </div>
  );
}