"use client";
import ItemList from './item-list.js';
import NewItem from './new-item.js';
import itemData from './items.json';
import { useState } from 'react';

export default function Page() {
    const [items, setItems] = useState(itemData);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    }

    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold text-green-300 text-center text-decoration: underline">Shopping List</h1>
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items}/>
        </main>
    );
}
