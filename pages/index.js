import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY__MEETUPS = [
  {
    id: "m1",
    title: "Москва тудэй",
    image:
      "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg",
    address: "Кантемировская, 5a",
    description: "Покушать принесли",
  },
  {
    id: "m2",
    title: "Волгоград тумороу",
    image:
      "https://cdn.photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg",
    address: "Кастанаевская, 13b",
    description: "Только не это",
  },
];

//Next рендерит страницу в два цикла - сначала происходит пререндер на сервере, а потом уже сайдэффекты. Поэтому складывается ситуация, когда сама страница прогрузилась, но без контента внутри, который тянется с сервера через fetch. Происходит так, потому что сначала next выдает пререндер ,а потом в него включается реакт и он уже делает свои действия на втором цикле. Все сайдэффекты грузятся во вторый цикл. Эта проблема влияет на индексирование страницы в поисковиках ,потому что поисковики получают страницу из первого рендера, а там еще пусто вместо контента. Поэтому next'у надо сказать, что он должен подождать контент прежде чем рендерить на серваке первый(пререндер) страницы.
//Head компонент - часть Next'a. Внутрь него можно поместить всю необходимую информацию, которую помещают в head документа.

function HomePage(props) {
  //----------- ЕСЛИ БЕЗ getStaticProps ----------
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   //отправка запроса и получение данных..
  //   setLoadedMeetups(DUMMY__MEETUPS);
  // }, [DUMMY__MEETUPS]);

  //----- getStaticProps загрузил данные в props.meetups --------
  return (
    <Fragment>
      <Head>
        <title>Встречи по реакту - прототип</title>
        <meta name="description" content="Лучшие встречи по реакту" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

//Эта функция getStaticProps(это название будет искать Next) сработает во время процесса пререндера. По сути эта функция подготавливает пропсы для страницы перед пререндером. То есть Next сначала вызовет эту функцию ,а уже потом вызовет компоненты страницы.
//Код в этой функции по сути работает как бэкенд, поскольку он никогда не сработает на стороне клиента, а только в процессе построения пререндера.
//getStaticProps ВСЕГДА должна возвращать объект. Внутри него props c данными. Экспорт  и импорт этой функции работает только в пределах папки pages(rонцепция очень похожа на лоадеры из react router 6.4).
//revalidate отображает, через сколько секунд будет обновляться страница. C этим свойством Next перерендерит страницу  сначала с первым запросом, а потом каждые 10 сек(в нашем случае). Грубо говоря, revalidate делает данные на странице не старее 10 сек.
export async function getStaticProps(context) {
  //fetch from API
  // MongoClient.connect();

  // const client = await MongoClient.connect(
  //   "mongodb+srv://admin:5097979@cluster0.lhijkpj.mongodb.net/meetups"
  // );

  // const database = client.db();

  // const meetupCollection = db.collection("meetups");

  // //Собираем все данные и делаем и зних массив (с помощью find и toArray)
  // const meetups = await meetupCollection.find().toArray();

  // client.close();

  return {
    props: {
      meetups: DUMMY__MEETUPS,
    },
    revalidate: 10,
  };
}

//getServerSideProps используется вместо getStaticProps, если важны частые обновления на каждый КАЖДЫЙ запрос. Отличается тем, что работает не во время билда, а на серваке, уже после деплоя, отвечая на каждый запрос. Тут можно использовать данные, которые не надо отображать в клиенте, поскольку работает на сервак
//Используется, если нужен доступ к объекту запроса или если реально данные страницы часто меняются и нужно часто обновлять

// export async function getServerSideProps(context){

//   console.log(context)
//   //возвращает сам запрос. Заголовки, тело и т.д.
//   const req = context.req;

//   //сюда возвращается результат запроса
//   const res = context.res;

//   //fetch from API
//    return {
//     props: {
//       meetups: DUMMY__MEETUPS,
//     }
//    }
// }

export default HomePage;
