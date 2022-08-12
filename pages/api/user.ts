/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
import { getToken, JWT } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { Delay, RequestBody } from "../../types";
// import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { session, token }: RequestBody = req.body;
  // console.log(token);
  const rt = process.env.NEXT_PUBLIC_DBTOKEN as string;
  const delay: Delay = (ms) => new Promise((res) => setTimeout(res, ms));
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

  // if (req.headers.authorization == undefined) {
  //   return res.status(200).send({
  //     status: "Unauthorized",
  //     user: null,
  //   });
  // }

  if (req.method === "POST") {
    await delay(100);
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });
    if (user) {
      return res.status(200).send({
        status: "Email already exists",
        user: user,
      });
    }
    const newUser = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      collections: [],
      friends: [],
      createdAt: new Date(),
    };
    await db.collection("users").insertOne(newUser);
    return res.status(201).send({
      status: "Created",
      user: newUser,
    });
  } else {
    return res.status(500);
  }
}
