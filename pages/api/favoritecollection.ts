/* eslint-disable require-jsdoc */

import { connectToDatabase } from "../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, CollectionID, Find, RequestBody } from "../../types";
// import { getSession } from "next-auth/react";

type Favorite = {
  favorite: boolean;
};
type RequestBodyFavorite = RequestBody & Favorite & CollectionID;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { session, token, favorite, collectionid }: RequestBodyFavorite =
    req.body;
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
      const findCollection: Find<Collection> = (collection) =>
        collection.groupid === collectionid;
      const collection: number = user.collections.findIndex(findCollection);
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
