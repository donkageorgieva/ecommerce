import React, { useDebugValue, useState } from "react";
import Nike1 from "../images/af1.jpg";
import Nike2 from "../images/af12.jpg";
import Nike3 from "../images/jordan1.jpg";
import Nike4 from "../images/nike3.jpg";

const ITEMS = [
  {
    id: 1,
    name: "Nike 1",
    price: 150,
    img: Nike1,
    amountInCart: 0,
  },
  {
    id: 2,
    name: "Nike 2 ",
    price: 120,
    img: Nike2,
    amountInCart: 0,
  },
  {
    id: 3,
    name: "Nike 3 ",
    price: 180,
    img: Nike3,
    amountInCart: 0,
  },
  {
    id: 4,
    name: "Nike 4 ",
    price: 85,
    img: Nike4,
    amountInCart: 0,
  },
];

export default ITEMS;
