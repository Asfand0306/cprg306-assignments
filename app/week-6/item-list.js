"use client";
import React, { useState } from 'react';
import Item from './item';
import items from './items.json';


const ItemList = () => {
    const [sortBy, setSortBy] = useState("name");
    
    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category - b.category;
        };
    });

    return (
        <div>
            <h1>Items</h1>
            <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                </select>
            </label>
            <ul>
                {sortedItems.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </ul>
        </div>
    );

}

export default ItemList;