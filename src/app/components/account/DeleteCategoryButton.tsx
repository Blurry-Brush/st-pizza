"use client";
import React from "react";
import { deleteCategoryServerAction } from "../../actions/account-actions";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const DeleteCategoryButton = ({ category }: { category: string }) => {
  const handleClick = async (category: string) => {
    await deleteCategoryServerAction(category);
    toast.success("Deleted Category");
  };
  return (
    <motion.div layout="position">
      <button
        onClick={() => handleClick(category)}
        className="btn w-fit btn-warning"
      >
        Delete{" "}
      </button>
    </motion.div>
  );
};

export default DeleteCategoryButton;
