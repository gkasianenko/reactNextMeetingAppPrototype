import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Реакт встречи</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Все встречи</Link>
          </li>
          <li>
            <Link href="/new-meetup">Добавить встречу</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
