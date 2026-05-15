import { FormRegister } from "../components/Form.js";
import style from "../styles/auth/register.module.css";

export function Register() {

  return (
    <div className={style.container}>

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