import style from "../styles/components/submit.module.css";

type SubmitProps = {
  value: string;
  loading?: boolean;
  disabled?: boolean;
};

export function Submit({
  value,
  loading = false,
  disabled,
}: SubmitProps) {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        type="submit"
        disabled={disabled || loading}
      >
        {loading ? "Carregando..." : value}
      </button>
    </div>
  );
}