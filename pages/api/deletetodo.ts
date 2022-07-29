/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Collection,
  CollectionID,
  Find,
  RequestBody,
  Subtodo,
  SubtodoID,
  Todo,
  TodoID,
} from "../../types";
// import { getSession } from "next-auth/react";
type RequestBodyDelete = RequestBody & CollectionID & TodoID & SubtodoID;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { session, token, todoid, collectionid, subtodoid }: RequestBodyDelete =
    req.body;
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  console.log("passou aqui");
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);

  const secret = process.env.JWT_SECRET as string;

  const token2 = (await getToken({ req, secret })) as JWT;

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
      user: null,
    });
  }

  if (!session) {
    return res.status(200).send({
      status: "Unauthorized",
      user: null,
    });
  }

  if (req.method === "POST") {
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });
    if (user) {
      const findCollection: Find<Collection> = (collection) =>
        collection.groupid === collectionid;
      const collection: number = user.collections.findIndex(findCollection);
      const findItemFunction: Find<Todo> = (todos) => todos.itemid === todoid;
      const findItem: number =
        user.collections[collection].todos.findIndex(findItemFunction);
      if (findItem <= -1) {
        console.log("Item not found");
        return res.status(200).send({
          status: "Todo not found",
          user: null,
        });
      }
      if (subtodoid != null || subtodoid != undefined) {
        const findTodo = user.collections[collection].todos[findItem];
        const findSubItemFunction: Find<Subtodo> = (subtodo) =>
          subtodo.subtodoid === subtodoid;
        const findSubItem: number =
          findTodo.subtodo.findIndex(findSubItemFunction);
        if (findSubItem <= -1) {
          console.log("Subtodo not found");
          return res.status(200).send({
            status: "Subtodo not found",
            user: null,
          });
        }
        await db.collection("users").updateOne(
          { email: session.user.email },
          {
            $unset: {
              [`collections.${collection}.todos.${findItem}.subtodo.${findSubItem}`]:
                subtodoid,
            },
          }
        );
        await db.collection("users").updateOne(
          { email: session.user.email },
          {
            $pull: {
              [`collections.${collection}.todos.${findItem}.subtodo`]: null,
            },
          }
        );
        return res.status(201).send({
          status: "Removed subtodo",
          user: user.collections[collection].todos[findItem].subtodo,
        });
      } else {
        await db.collection("users").updateOne(
          { email: session.user.email },
          {
            $unset: {
              [`collections.${collection}.todos.${findItem}`]: 1,
            },
          }
        );
        await db.collection("users").updateOne(
          { email: session.user.email },
          {
            $pull: {
              [`collections.${collection}.todos`]: null,
            },
          }
        );
        return res.status(201).send({
          status: "Removed todo",
          user: user.collections[collection].todos,
        });
      }
    }
  } else {
    console.log("user not found");
  }
}
