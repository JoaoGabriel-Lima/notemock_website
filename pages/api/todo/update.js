/* eslint-disable require-jsdoc */

import { connectToDatabase } from "../../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const newTodo = req.body.newTodo;
  const collectionid = req.body.collectionid;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;

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

  await delay(100);

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      function findCollection(collection) {
        return collection.groupid === collectionid;
      }
      function findTodo(todo) {
        return todo.itemid === newTodo.itemid;
      }
      const collection = user.collections.findIndex(findCollection);
      const collectiondata = user.collections[collection];
      const todo = collectiondata.todos.findIndex(findTodo);
      //   const tododata = collectiondata.todos[todo];

      if (collection <= -1) {
        return res.status(200).send({
          status: "Collection not found",
          user: null,
        });
      }

      if (todo <= -1) {
        return res.status(200).send({
          status: "Todo not found",
          user: null,
        });
      }

      const finatodo = await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            [`collections.${collection}.todos.${todo}`]: {
              itemcontent: newTodo.itemcontent,
              itemtime: newTodo.itemtime,
              checked: newTodo.checked,
              subtodo: newTodo.subtodo,
              itemid: newTodo.itemid,
            },
          },
        }
      );
      return res.status(201).send({
        status: "ToDo Updated",
        collection: finatodo,
      });
    } else {
      return res.status(200).send({
        status: "User not found",
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
