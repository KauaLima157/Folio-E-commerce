import { useNavigate } from "react-router-dom";
import { FormRegister } from "../components/Form.js";
import style from "../styles/auth/register.module.css";

export function Register() {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <button
        onClick={() => navigate("/")}
        className={style.backButton}
      >
        ← Voltar à página anterior
      </button>

      <div className={style.left}>
        <FormRegister />
      </div>

      <div className={style.right}>
        <img
          className={style.imageRegister}
          src="/assets/auth/register.svg"
          alt="imagem do menino lendo livro"
        />
      </div>
    </div>
  );
}