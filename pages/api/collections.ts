/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, CollectionID, Find, RequestBody } from "../../types";
// import { getSession } from "next-auth/react";
type RequestBodyCollections = RequestBody & CollectionID;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const {
    session,
    token,
    collectionid: collectiongroupid,
  }: RequestBodyCollections = req.body;
  const rt = process.env.NEXT_PUBLIC_DBTOKEN as string;
  const secret = process.env.JWT_SECRET as string;

  const token2 = (await getToken({ req, secret })) as JWT;

  if (token2 == null) {
    return res.status(200).send({
      status: "Unauthorized",
      user: null,
    });
  }
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);

  if (token != rt) {
    return res.status(200).send({
      status: "Unauthorized",
      collection: null,
    });
  }
  if (token2.email != session.user.email) {
    return res.status(200).send({
      status: "Unauthorized",
      user: null,
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
      const collection: Collection = user.collections.find(findCollection);
      if (collection === undefined) {
        return res.status(200).send({
          status: "Collection not found",
          collection: null,
        });
      }
      return res.status(201).send({
        status: "Collection found",
        collection: collection,
      });
    } else {
      return res.status(200).send({
        status: "Collection not found",
        collection: null,
      });
    }
  } else {
    return res.status(200).send({
      status: "Collection not found",
      collection: null,
    });
  }
}
