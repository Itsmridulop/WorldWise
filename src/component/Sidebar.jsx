import styles from './style/Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { NavLink, Outlet } from 'react-router-dom'
 
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <NavLink to='/' ><Logo/></NavLink>
      <AppNav/>
      <Outlet/>
      <footer className={styles.footer}><p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p></footer>
    </div>
  )
}

export default Sidebar
