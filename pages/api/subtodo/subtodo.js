/* eslint-disable require-jsdoc */
import axios from "axios";
import { connectToDatabase } from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;

  const todogroupid = req.body.todogroupid;
  const collectiongroupid = req.body.collectionid;
  const itemcontent = req.body.itemcontent;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const secret = process.env.JWT_SECRET;

  const token2 = await getToken({ req, secret });

  if (token2 == null) {
    return res.status(400).send({
      status: "Unauthorized",
      user: null,
    });
  }
  if (token2.email != session.user.email) {
    return res.status(200).send({
      status: "Unauthorized",
      user: null,
    });
  }
  // console.log(token);
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  const publicurl = process.env.NEXT_PUBLIC_URL;
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
      .post(`${publicurl}/api/subtodo/subtodoid`, {
        session: session,
        token: token,
        collectionid: collectiongroupid,
        todoid: todogroupid,
        subtodoid: itemid2,
      })
      .then(function (response) {
        if (response.data.todo != null) {
          itemid = getRandomNumberBetween(10000, 99999);
          checkitemid(itemid);
        } else {
          return itemid;
        }
      });
  }

  let itemid = getRandomNumberBetween(10000, 99999);
  await checkitemid(itemid);
  await delay(100);

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      // console.log(user);
      function findCollection(collection) {
        return collection.groupid === collectiongroupid;
      }
      function findTodo(todo) {
        return todo.itemid === todogroupid;
      }
      const collection = user.collections.findIndex(findCollection);
      const todo = user.collections[collection].todos.findIndex(findTodo);

      if (collection == -1) {
        return res.status(200).send({
          status: "Collection not found",
          collection: null,
        });
      }

      if (todo == -1) {
        return res.status(200).send({
          status: "To-do not found",
          collection: null,
        });
      }

      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $push: {
            [`collections.${collection}.todos.${todo}.subtodo`]: {
              itemcontent: itemcontent,
              checked: false,
              subtodoid: itemid,
            },
          },
        }
      );
      return res.status(201).send({
        status: "Subtodo added",
        todo: {
          itemcontent: itemcontent,
          checked: false,
          subtodoid: itemid,
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
