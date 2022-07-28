/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, Find, Todo } from "../../types";
// import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const collectiongroupid = req.body.collectionid;
  const todoid = req.body.todoid;
  // console.log(token);
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);

  const secret = process.env.JWT_SECRET;

  const token2 = await getToken({ req, secret });

  if (token2 == null) {
    return res.status(200).send({
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

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      // console.log(user);
      const findCollection: Find<Collection> = (collection) =>
        collection.groupid === collectiongroupid;
      const findTodo: Find<Todo> = (todo) => todo.itemid === todoid;
      const collections = user.collections as Collection[];
      const collection = collections !== [] && collections.find(findCollection);
      const todos = collection ? collection.todos : [];
      const todo = todos !== [] && todos.find(findTodo);

      if (collection === undefined || collection === false) {
        return res.status(200).send({
          status: "Todo not found",
          todo: null,
        });
      }
      if (todo === undefined || todo === false) {
        return res.status(200).send({
          status: "Todo not found",
          todo: null,
        });
      }
      return res.status(201).send({
        status: "Todo found",
        todo: todo,
      });
    } else {
      return res.status(200).send({
        status: "Todo not found",
        todo: null,
      });
    }
  } else {
    return res.status(200).send({
      status: "Todo not found",
      todo: null,
    });
  }
}
