import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

//useRouter вызывает объект router, который в том числе используется при программируемой переадресации страниц
function MeetupItem(props) {
  const router = useRouter();

  //По написанной логике, MeetupItem'ы рендерятся по массиву с объектами из MeetupList с пропсами для каждого айтема. Из такого объекта мы и берем props.id для передачи в URL через router
  function showDetailsHandler() {
    router.push(`/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Подробнее</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
