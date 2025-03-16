"use client";
import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
    return (
        <li 
            className="bg-zinc-700 hover:bg-zinc-500 p-6 my-4 rounded-lg w-full cursor-pointer shadow-md"
            onClick={onSelect}
        >
            <div className="font-bold text-lg capitalize">{name}</div>
            <div className="text-emerald-500">Quantity: {quantity}</div>
            <div className="text-emerald-500 capitalize">Category: {category}</div>
        </li>
    );
};

export default Item;