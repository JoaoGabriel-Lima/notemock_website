/* eslint-disable require-jsdoc */
import axios from "axios";
import { connectToDatabase } from "../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const collectiongroupid = req.body.collectionid;

  const itemcontent = req.body.itemcontent;
  const itemtime = req.body.itemtime;

  // console.log(token);
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  if (token != rt) {
    return res.status(200).send({
      status: "Unauthorized",
      collection: null,
    });
  }
  if (!session) {
    return res.status(200).send({
      status: "Unauthorized",
      collection: null,
    });
  }

  async function checkitemid(itemid2) {
    // console.log(itemid2);
    await axios
      .post("https://notemock-website.vercel.app/api/subtodo", {
        session: session,
        token: token,
        collectionid: collectiongroupid,
        todoid: itemid2,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.todo != null) {
          console.log("Creating new ItemId for this new ToDo in production");
          itemid = getRandomNumberBetween(10000, 99999);
          checkitemid(itemid);
        } else {
          console.log(
            "Ok, we don't need a new ItemId for this new ToDo in production"
          );
        }
      });
  }

  let itemid = getRandomNumberBetween(10000, 99999);
  checkitemid(itemid);

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      // console.log(user);
      function findCollection(collection) {
        return collection.groupid === collectiongroupid;
      }
      const collection = user.collections.findIndex(findCollection);
      if (collection === undefined) {
        return res.status(200).send({
          status: "Collection not found",
          collection: null,
        });
      }

      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $push: {
            [`collections.${collection}.todos`]: {
              itemcontent: itemcontent,
              itemtime: itemtime,
              checked: false,
              subtodo: [],
              itemid: itemid,
            },
          },
        }
      );
      console.log("Todo added");
      return res.status(201).send({
        status: "Todo added",
        todo: {
          itemcontent: itemcontent,
          itemtime: itemtime,
          checked: false,
          subtodo: [],
          itemid: itemid,
        },
      });
    } else {
      return res.status(200).send({
        status: "Collection not found",
        collection: null,
      });
    }
  } else {
    return res.status(200).send({
      status: "Unauthorized",
      collection: null,
    });
  }
}
