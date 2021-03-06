export const animationVariantsY = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};
export const animationVariantsO = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
  },
};
export const animationVariantsX = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.6,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};
export const animationVariantsS = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const buttonVariants = {
  hoverInfinity: {
    scale: 1.1,
    transition: {
      yoyo: Infinity,
    },
  },
  hoverNormal: {
    scale: 1.1,
  },
};
