"use client";
import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items, onItemSelect }) => {
    const [sortBy, setSortBy] = useState("name");
    const [groupByCategory, setGroupByCategory] = useState(false);
    
    // Sort the items
    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
    });

    // Group items by category if enabled
    const groupedItems = sortedItems.reduce((acc, item) => {
        // Create a category array if it doesn't exist
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        // Add the item to its category array
        acc[item.category].push(item);
        return acc;
    }, {});

    // Convert categories to sorted array for rendering
    const sortedCategories = Object.keys(groupedItems).sort();

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="text-lg mr-2">Sort by:</span>
                <button 
                    className={`px-3 py-1 rounded-md ${sortBy === "name" && !groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                    onClick={() => {
                        setSortBy("name");
                        setGroupByCategory(false);
                    }}
                >
                    Name
                </button>
                <button 
                    className={`px-3 py-1 rounded-md ${sortBy === "category" && !groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                    onClick={() => {
                        setSortBy("category");
                        setGroupByCategory(false);
                    }}
                >
                    Category
                </button>
                <button 
                    className={`px-3 py-1 rounded-md ${groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                    onClick={() => setGroupByCategory(true)}
                >
                    Group by Category
                </button>
            </div>

            {groupByCategory ? (
                // Render grouped items
                <div className="w-full">
                    {sortedCategories.map(category => (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-bold text-emerald-500 capitalize mb-4 bg-zinc-800 p-2 rounded-lg text-center">{category}</h2>
                            <ul className="w-full">
                                {groupedItems[category]
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map(item => (
                                        <Item 
                                            key={item.id} 
                                            name={item.name} 
                                            quantity={item.quantity} 
                                            category={item.category}
                                            onSelect={() => onItemSelect(item)}
                                        />
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                // Render sorted items (original display)
                <ul className="w-full">
                    {sortedItems.map((item) => (
                        <Item 
                            key={item.id} 
                            name={item.name} 
                            quantity={item.quantity} 
                            category={item.category}
                            onSelect={() => onItemSelect(item)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;