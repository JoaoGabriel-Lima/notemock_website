/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import { motion } from "framer-motion";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="w-auto h-screen bg-[#181820] flex justify-center flex-col items-center"
        >
          <div className="flex flex-col items-center justify-center bg-[#21212b] p-7 rounded-lg">
            <h1 className="text-white font-bold mb-2 text-3xl">
              Note<span className="text-[#e64f4f]">mock</span>
            </h1>
            <h2 className="text-gray-300 font-normal mb-5 text-base">
              Sign In Methods
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="bg-[#444458] hover:bg-[#323241] text-white p-4 px-16 rounded-lg shadow-lg font-medium ease-in"
              onClick={() =>
                signIn(provider.id, { callbackUrl: router.query.callbackUrl })
              }
            >
              Sign in with {provider.name}
            </motion.button>
          </div>
        </div>
      ))}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
