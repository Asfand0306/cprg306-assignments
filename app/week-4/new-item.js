"use client";

import { useState } from "react";

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);


// The increment function should increment the quantity by 1, but only if the quantity is less than 20.
    const increment = () => { if (quantity < 20) {setQuantity(quantity + 1);
    }
    };

    // The decrement function should decrement the quantity by 1, but only if the quantity is greater than 1.
    const decrement = () => { if (quantity > 1) {setQuantity(quantity - 1);
    }
    };


    return (
        <div className="flex flex-col justify-center items-center gap-4 p-6 bg-zinc-700 w-64 rounded-lg shadow-lg mx-auto mt-10" >
            <h1 className="text-lg font-bold">Quantity</h1>
            <div className="flex items-center gap-4">

            <button 
            className="bg-zinc-800 text-white text-lg font-bold hover:bg-zinc-600 px-2 py-1 rounded-lg w-11 hover:disabled:opacity-50 " 
            onClick={decrement}>-</button>
            

            <span className="text-lg font-bold">{quantity}</span>

            <button
            className="bg-zinc-800 text-white text-lg font-bold hover:bg-zinc-600 px-2 py-1 rounded-lg w-11 disabled:opacity-50" 
            onClick={increment}>+</button>
            </div>
        </div>
    );
}
