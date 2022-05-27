/* eslint-disable require-jsdoc */

import { connectToDatabase } from "../../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
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
      const collection = user.collections.findIndex(findCollection);
      const collectiondata = user.collections[collection];

      if (collection <= -1) {
        return res.status(200).send({
          status: "Collection not found",
          user: null,
        });
      }

      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $pull: {
            [`collections`]: { groupid: collectionid },
          },
        }
      );
      return res.status(201).send({
        status: "Collection Removed",
        collection: collectiondata,
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
