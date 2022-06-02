/* eslint-disable require-jsdoc */
import axios from "axios";
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  const groupname = req.body.groupname;
  const groupcolor = req.body.groupcolor;
  const groupicon = req.body.groupicon;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // console.log(token);
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
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
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

  async function checkcol(collectioniditem) {
    // console.log(itemid2);
    await axios
      .post(
        "https://notemock-website.vercel.app/api/collections",
        {
          session: session,
          token: token,
          collectionid: collectioniditem,
        },
        {
          headers: {
            Cookie: req.headers.cookie,
          },
        }
      )
      .then(function (response) {
        if (response.data.collection != null) {
          collectionid = getRandomNumberBetween(10000, 99999);
          checkcol(collectionid);
        } else {
        }
      });
  }

  let collectionid = getRandomNumberBetween(10000, 99999);
  checkcol(collectionid);
  await delay(100);

  if (req.method === "POST") {
    const user = await db.collection("users").findOne({
      email: session.user.email,
    });
    if (user) {
      // console.log(user);
      await db.collection("users").updateOne(
        { email: session.user.email },
        {
          $push: {
            [`collections`]: {
              groupname: groupname,
              groupicon: groupicon,
              groupcolor: groupcolor,
              groupid: collectionid,
              todos: [],
            },
          },
        }
      );
      return res.status(201).send({
        status: "Collection Added",
        collection: {
          groupname: groupname,
          groupicon: groupicon,
          groupcolor: groupcolor,
          groupid: collectionid,
          todos: [],
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
