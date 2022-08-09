/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken, JWT } from "next-auth/jwt";
import {
  Collection,
  CollectionID,
  Todo,
  Subtodo,
  Find,
  RequestBody,
  SubtodoID,
  TodoID,
} from "../../types";
import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
type Checked = {
  checked: boolean;
};
type RequestBodyCheck = RequestBody &
  CollectionID &
  TodoID &
  SubtodoID &
  Checked;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const {
    token,
    session,
    collectionid,
    todoid,
    subtodoid,
    checked,
  }: RequestBodyCheck = req.body;
  req.body.id;
  const rt = process.env.NEXT_PUBLIC_DBTOKEN as string;
  const secret = process.env.JWT_SECRET as string;
  const token2 = (await getToken({ req, secret })) as JWT;

  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);

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
      const findTodo: Find<Todo> = (todos) => todos.itemid === todoid;
      const collection: number = user.collections.findIndex(findCollection);
      const findItem: number =
        user.collections[collection].todos.findIndex(findTodo);
      if (findItem <= -1) {
        console.log("Item not found");
        return res.status(200).send({
          status: "Todo not found",
          user: null,
        });
      }
      if (subtodoid != null || subtodoid != undefined) {
        const findSubTodo: Find<Subtodo> = (subtodo) =>
          subtodo.subtodoid === subtodoid;
        const findSubItem: number =
          user.collections[collection].todos[findItem].subtodo.findIndex(
            findSubTodo
          );
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
            $set: {
              [`collections.${collection}.todos.${findItem}.subtodo.${findSubItem}.checked`]:
                checked,
            },
          }
        );
        return res.status(201).send({
          status: "Updated",
          user: user.collections[collection].todos[findItem].subtodo[
            findSubItem
          ],
        });
      } else {
        await db.collection("users").updateOne(
          { email: session.user.email },
          {
            $set: {
              [`collections.${collection}.todos.${findItem}.checked`]: checked,
            },
          }
        );
        return res.status(201).send({
          status: "Updated",
          user: user.collections[collection].todos[findItem],
        });
      }
    }
  } else {
    console.log("user not found");
  }
}
