"use client";
import React from "react";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { CategoryType } from "../../../utils/types";
import { motion } from "framer-motion";

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <motion.div layout className="mt-4">
      {categories.map((c, index) => {
        return (
          <div
            key={index}
            className="w-full bg-red-50 mb-2 py-2 px-4 rounded-xl  flex justify-between items-center"
          >
            <motion.h1 layout className="font-bold">
              {" "}
              {c.category}{" "}
            </motion.h1>
            <DeleteCategoryButton category={c.category} />
          </div>
        );
      })}
    </motion.div>
  );
};

export default CategoryList;
