import { NavLink } from 'react-router-dom'
import styles from './style/PageNav.module.css'
import Logo from './Logo'

function PageNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to='/'><Logo/></NavLink>
      <ul>
        <li><NavLink to='/pricing'>pricing</NavLink></li>
        <li><NavLink to='/product'>product</NavLink></li>
        <li><NavLink to='/login' className={styles.ctaLink}>login</NavLink></li>
      </ul>
    </nav>
  )
}

export default PageNav
