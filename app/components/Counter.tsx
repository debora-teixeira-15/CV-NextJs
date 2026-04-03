"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

export default function Counter({ number }: { number: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.floor);

  useEffect(() => {
    const controls = animate(count, number, {
      duration: 0.5,
      type: "spring",
      stiffness: 40,
      damping: 15,
    });
    return controls.stop;
  }, []);

  return <motion.h2>{rounded}</motion.h2>;
}
