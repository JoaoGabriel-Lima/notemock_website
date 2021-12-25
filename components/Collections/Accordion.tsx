/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          key="question"
          className="rounded-tr-md relative z-20  rounded-br-md shadow-sm px-1 py-2 bg-blue-200 cursor-pointer font-open border-l-2 border-yellow-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div className="text-gray-800 font-bold ml-1">
            Do you like animations?
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            key="answer"
            initial={{ y: -50 }}
            animate={{
              y: 0,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{ y: -50 }}
            className="p-2 text-lg text-gray-700 border-l border-b border-gray-300"
          >
            Yes, I love them!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;
