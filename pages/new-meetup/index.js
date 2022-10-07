import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  //Этот запрос будет на внутренний адрес нашего сервера, то есть на URL адрес api папки. Запрос будет выполнять handler из этого файла по URL
  //Ниже мы передаем в тело запроса полностью аргумент, потому что в логике этот объект собирается в компоненте NewMeetupForm
  async function addMeetupHandler(meetupData) {
    // const response = await fetch("/api/new-meetup", {
    //   method: "POST",
    //   body: JSON.stringify(meetupData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // console.log(data);
    // router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Создайте новую встречу - монгоДБ</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
