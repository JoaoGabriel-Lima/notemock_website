/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const todoid = req.body.id;
  const checked = req.body.checked;
  const collectionid = req.body.collectionid;
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);
  if (!session) {
    return res.status(200).send({
      status: "Unauthorized",
      user: null,
    });
  }

  if (req.method === "POST") {
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email }, { itemid: todoid });
    if (user) {
      function findCollection(collection) {
        return collection.groupid === collectionid;
      }
      const collection = user.collections.findIndex(findCollection);

      const findItem = user.collections[collection].todos.findIndex(
        (todos) => todos.itemid === todoid
      );

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
  } else {
    console.log("user not found");
  }
}
