import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        //Так мы получаем пропсы через функцию getStaticProps. Поскольку ее задача и есть дать нам эти пропсы сюда для пререндера после fetch на сервере. Раскладываем объект meetupData, полученный с сервака
        // image={props.meetupData.image}
        // title={props.meetupData.title}
        // address={props.meetupData.address}
        // description={props.meetupData.description}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

//getStaticPaths используется в сочетании с getStaticProps для ДИНАМИЧЕСКИХ страниц(синтаксис в квадратных скобках, как здесь [meetupId] - страница покажется при любом значении). Через getStaticPaths мы передаем, какие параметры нужны для статического отображения вариантов этих страниц. Поскольку фактически получить значение [meetupId] мы можем уже после того как юзер открыл страницу с динамическим URL, Next'у для пререндера страниц нужны эти значения [meetupId] заранее. В paths передаются параметры, а в fallback -
export async function getStaticPaths() {
  //Конкретно тут мы используем написанные руками параметры, обычно они тянутся через fetch из API
  // const client = await MongoClient.connect(
  //   "mongodb+srv://admin:5097979@cluster0.lhijkpj.mongodb.net/meetups"
  // );

  // const database = client.db();

  // const meetupCollection = db.collection("meetups");

  //Используем тут в ПЕРВОМ аргументе пустой объект, чтобы собрать ВСЕ данные. Обычно в этот объект передаются значения для фильтрации, если нам все не нужны.
  //Во ВТОРОМ аргументе мы добавляем объект, который фильтрует, какие именно данные в каждом собранном объекте должны быть получены. Опять-таки, оставляем пустым, если нужны все. Конкретно тут мы фетчим все объекты, но внутри них только айдишники для формирования путей пререндера. А потом переводим в массив
  // const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  // client.close();

  return {
    //MongoDB ver. Зафетченные данные из монго в виде массива мы проходим через map и создаем такую же структуру объектов как ниже
    // paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
    //если поставить false, все пути, которых нет в списке getStaticPaths будут выдавать 404 страницу. Next сбилдит только эти пути из списка. Если поставить true, когда юзер попадет на страницу, которой нет в списке getStaticPaths, Next покажет ему fallback страничку прогрузки. А потом уже выведет саму страницу
    fallback: false,
  };
}

export async function getStaticProps(context) {
  //context параметр в функции getStaticProps возвращает параметры запроса. В том числе данные о том, какое значение в URL имеет [meetupId], прописанный в pages. Поскольку такой синтаксис предполагает, что страница откроется при любом значении вместо [meetupId], мы можем поймать его через функцию getStaticProps и параметр context уже по факту прогрузки страницы(поскольку useRouter использовать тут нельзя, для этих целей используется context)
  const meetupId = context.params.meetupId;

  //fetch data for a single meetup

  // const client = await MongoClient.connect(
  //   "mongodb+srv://admin:5097979@cluster0.lhijkpj.mongodb.net/meetups"
  // );

  // const database = client.db();

  // const meetupCollection = db.collection("meetups");

  //MongoDB испульзует findOne для поиска одного документа в коллекции. В аргумент мы передаем объект с критериями поиска(например, по айдишнику). Здесь по логике наш meetupId будет равен айдишнику из базы данных монгоДБ, поскольку изначально оттуда тянутся все объекты для рендера. ObjectId нужен, чтобы прочитать полученный айдишник из монгоДб - он выглядит как ObjectId там.
  // const selectedMeetup = await meetupCollection.findOne({
  //   _id: ObjectId(meetupId),
  // });

  // client.close();

  return {
    props: {
      //для монгоДБ. Этот объект мы получаем из базы данных в том же виде, что и ниже
      // meetupData: { id: selectedMeetup._id.toString(), title: selectedMeetup.title, address: selectedMeetup.address, image: selectedMeetup.image, description: selectedMeetup.description }

      meetupData: {
        image:
          "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/lighting.jpg",
        title: "Название встречи",
        address: "Адрес встречи",
        description: "Описание встречи",
        id: meetupId,
      },
    },
  };
}

export default MeetupDetails;
