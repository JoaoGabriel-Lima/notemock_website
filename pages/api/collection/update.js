/* eslint-disable require-jsdoc */
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "../../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const groupname = req.body.groupname;
  const groupcolor = req.body.groupcolor;
  const groupicon = req.body.groupicon;
  const collectionid = req.body.collectionid;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;

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

      const finalcollection = await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $set: {
            [`collections.${collection}`]: {
              groupname: groupname,
              groupicon: groupicon,
              groupcolor: groupcolor,
              groupid: collectiondata.groupid,
              todos: collectiondata.todos,
              favorite: collectiondata.favorite,
            },
          },
        }
      );
      return res.status(201).send({
        status: "Collection Updated",
        collection: finalcollection,
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
