/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const todoid = req.body.id;
  const collectionid = req.body.collectionid;
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  const token = req.body.token;
  const subtodoid = req.body.subtodoid;

  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);
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
      function findCollection(collection) {
        return collection.groupid === collectionid;
      }
      const collection = user.collections.findIndex(findCollection);

      const findItem = user.collections[collection].todos.findIndex(
        (todos) => todos.itemid === todoid
      );
      if (findItem <= -1) {
        console.log("Item not found");
        return res.status(200).send({
          status: "Todo not found",
          user: null,
        });
      }
      if (subtodoid != null || subtodoid != undefined) {
        const findTodo = user.collections[collection].todos[findItem];
        const findSubItem = findTodo.subtodo.findIndex(
          (subtodo) => subtodo.subtodoid === subtodoid
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
