/* eslint-disable require-jsdoc */
import { connectToDatabase } from "../../lib/dbConnect";
// import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const session = req.body.session;
  const token = req.body.token;
  // console.log(token);
  const rt = process.env.NEXT_PUBLIC_DBTOKEN;
  // const session = await getSession({ req });
  // console.log(`Session Info: ${session}`);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
