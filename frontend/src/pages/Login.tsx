import { FormLogin } from "../components/Form.js";
import style from '../styles/auth/login.module.css';

export function Login() {

    return (
    <div className={style.container}>
      <div className={style.left}>
        <FormLogin />
      </div>

      <div className={style.right}>
        <img className={style.imageLogin} src="/assets/auth/login.svg" alt="imagem da menina do livro" />
      </div>
    </div>
    )
}