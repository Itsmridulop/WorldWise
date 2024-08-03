import styles from './style/Button.module.css'

function Button({type, onClick, children}) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
