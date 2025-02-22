"use client";

import { useState } from "react";

export default function NewItem() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

    // The increment function should increment the quantity by 1, but only if the quantity is less than 20.
    const increment = () => { if (quantity < 20) {setQuantity(quantity + 1);
    }
    };

    // The decrement function should decrement the quantity by 1, but only if the quantity is greater than 1.
    const decrement = () => { if (quantity > 1) {setQuantity(quantity - 1);
    }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let newItem = {
            name: name,
            category: category,
            quantity: quantity
        };
        console.log(newItem);
        alert(`Added item: ${name}, quantity: ${quantity}, category: ${category}`);

        setName("");
        setQuantity(1);
        setCategory("Produce");
    }

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center gap-4 p-6 bg-zinc-700 w-64 rounded-lg shadow-lg mx-auto mt-10">
            <h1 className="text-lg font-bold">New Item</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2 rounded-lg w-full text-black text-lg"
            />
            <div className="flex justify-between items-center gap-4 w-full">
                <button 
                    type="button"
                    className="bg-zinc-800 text-white text-lg font-bold hover:bg-zinc-600 px-2 py-1 rounded-lg w-11 hover:disabled:opacity-50" 
                    onClick={decrement}>-</button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                type="button"
                    className="bg-zinc-800 text-white text-lg font-bold hover:bg-zinc-600 px-2 py-1 rounded-lg w-11 disabled:opacity-50" 
                    onClick={increment}>+</button>
            </div>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 rounded-lg w-full text-black text-lg"
            >
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
                <option value="Meat">Meat</option>
                <option value="Frozen Foods">Frozen Foods</option>
                <option value="Canned Goods">Canned Goods</option>
                <option value="Dry Goods">Dry Goods</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
                <option value="Household">Household</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white text-lg font-bold hover:bg-blue-400 px-4 py-2 rounded-lg w-full mt-4">Add Item</button>
        </form>
    );
}
