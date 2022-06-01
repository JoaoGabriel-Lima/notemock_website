/* eslint-disable require-jsdoc */

import { connectToDatabase } from "../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const favorite = req.body.favorite;
  const collectionid = req.body.collectionid;

  const rt = process.env.NEXT_PUBLIC_DBTOKEN;

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
      function findCollection(collection) {
        return collection.groupid === collectionid;
      }
      const collection = user.collections.findIndex(findCollection);
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            [`collections.${collection}.favorite`]: favorite,
          },
        }
      );
      return res.status(201).send({
        status: "Collection Favorited",
        collection: {
          favorite: favorite,
          groupid: collectionid,
        },
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
