"use client";
import React, { useState } from 'react';
import Item from './item';
import items from './items.json';

const ItemList = () => {
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
        <div className="mt-8">
            <div className="flex items-center mb-4">
                <span className="mr-2 text-lg">Sort by:</span>
                <button 
                    className={`px-3 py-1 mr-2 rounded-md ${sortBy === "name" && !groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700'}`}
                    onClick={() => {
                        setSortBy("name");
                        setGroupByCategory(false);
                    }}
                >
                    Name
                </button>
                <button 
                    className={`px-3 py-1 mr-2 rounded-md ${sortBy === "category" && !groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700'}`}
                    onClick={() => {
                        setSortBy("category");
                        setGroupByCategory(false);
                    }}
                >
                    Category
                </button>
                <button 
                    className={`px-3 py-1 rounded-md ${groupByCategory ? 'bg-green-500 text-white' : 'bg-zinc-700'}`}
                    onClick={() => setGroupByCategory(true)}
                >
                    Group by Category
                </button>
            </div>

            {groupByCategory ? (
                // Render grouped items
                <div>
                    {sortedCategories.map(category => (
                        <div key={category} className="mb-8">
                            <h2 className="text-xl font-bold text-emerald-500 capitalize mb-2">{category}</h2>
                            <ul>
                                {groupedItems[category]
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map(item => (
                                        <Item 
                                            key={item.id} 
                                            name={item.name} 
                                            quantity={item.quantity} 
                                            category={item.category} 
                                        />
                                    ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                // Render sorted items (original display)
                <ul>
                    {sortedItems.map((item) => (
                        <Item 
                            key={item.id} 
                            name={item.name} 
                            quantity={item.quantity} 
                            category={item.category} 
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;