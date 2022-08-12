/* eslint-disable require-jsdoc */
import axios from "axios";
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Collection,
  CollectionID,
  Delay,
  Find,
  RequestBody,
} from "../../types";
// import { getSession } from "next-auth/react";
type ItemContent = {
  itemcontent: string;
};
type ItemTime = {
  itemtime: string;
};
type RandomNumberFuction = (min: number, max: number) => string;
type RequestBodyAddTodo = RequestBody & CollectionID & ItemContent & ItemTime;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const {
    session,
    token,
    collectionid: collectiongroupid,
    itemcontent,
    itemtime,
  }: RequestBodyAddTodo = req.body;
  console.log(req.body);
  const delay: Delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const rt = process.env.NEXT_PUBLIC_DBTOKEN as string;
  const publicurl = process.env.NEXT_PUBLIC_URL as string;
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
  const getRandomNumberBetween: RandomNumberFuction = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min).toString();

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

  async function checkitemid(itemid2: string) {
    await axios
      .post(
        `${publicurl}/api/todoid`,
        {
          session: session,
          token: token,
          collectionid: collectiongroupid,
          todoid: itemid2,
        },
        {
          headers: {
            Cookie: req.headers.cookie as string,
          },
        }
      )
      .then(function (response) {
        if (response.data.todo != null) {
          itemid = getRandomNumberBetween(10000, 99999);
          checkitemid(itemid);
        } else {
        }
      });
  }

  let itemid = getRandomNumberBetween(10000, 99999);
  checkitemid(itemid);
  await delay(100);

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      // console.log(user);
      const findCollection: Find<Collection> = (collection) =>
        collection.groupid === collectiongroupid;
      const collection = user.collections.findIndex(findCollection);
      if (collection === undefined) {
        return res.status(200).send({
          status: "Collection not found",
          collection: null,
        });
      }

      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $push: {
            [`collections.${collection}.todos`]: {
              itemcontent: itemcontent,
              itemtime: itemtime,
              checked: false,
              subtodo: [],
              itemid: itemid,
            },
          },
        }
      );
      return res.status(201).send({
        status: "Todo added",
        todo: {
          itemcontent: itemcontent,
          itemtime: itemtime,
          checked: false,
          subtodo: [],
          itemid: itemid,
        },
      });
    } else {
      return res.status(200).send({
        status: "Collection not found",
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
