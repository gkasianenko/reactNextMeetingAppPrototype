

// /api/new-meetup
// POST /api/new-meetup


//В папке api в pages мы здесь пишем API к конкретной странице. Поэтому название api должно совпадать с названием страницы, для которой пишем. Создается одна функция и экспортится default.
//handler функция предполагает получение запроса и результата - req, res. Из них мы можем получить все нужные данные через деструктуризацию.
async function handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body;

//     const client = await MongoClient.connect(
//       "mongodb+srv://admin:5097979@cluster0.lhijkpj.mongodb.net/meetups"
//     );

//     const database = client.db();

//     const meetupCollection = db.collection("meetups");

//     //тут метод монго добавит объект в коллекцию и вернет промис
//     const result = await meetupsCollection.insertOne(data);

//     console.log(result);

//     client.close();

//     //так в Next передается результат запроса
//     res.status(201).json({ message: "Meetup inserted" });
//   }
}

export default handler;
