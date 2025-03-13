"use client";
import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
    return (
        <li 
            className="bg-zinc-700 hover:bg-zinc-500 p-6 my-5 rounded-lg w-96 cursor-pointer"
            onClick={onSelect}
        >
            <div className="font-bold text-lg text-transform: capitalize">{name}</div>
            <div className="text-emerald-500">Quantity: {quantity}</div>
            <div className="text-emerald-500 text-transform: capitalize">Category: {category}</div>
        </li>
    );
};

export default Item;