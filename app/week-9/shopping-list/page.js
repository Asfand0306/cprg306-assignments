"use client";
import ItemList from './item-list.js';
import NewItem from './new-item.js';
import MealIdeas from './meal-ideas.js';
import itemData from './items.json';
import { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [items, setItems] = useState(itemData);
    const [selectedItemName, setSelectedItemName] = useState('');
    const { user } = useUserAuth();
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        if (!user) {
            router.push('/week-9'); // Redirect to landing page if not logged in
        }
    }, [user, router]);

    const handleAddItem = (item) => {
        setItems([...items, item]);
    };

    const handleItemSelect = (item) => {
        // Clean up the item name by removing emojis, sizes, etc.
        let cleanName = item.name.split(',')[0].trim();
        // Remove emojis
        cleanName = cleanName.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
        setSelectedItemName(cleanName);
    };

    // If user is not logged in, don't render the page content
    if (!user) {
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
                <p className="text-lg mb-4">You must be logged in to view this page.</p>
                <button 
                    onClick={() => router.push('/week-9')} 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                >
                    Go to Login Page
                </button>
            </main>
        );
    }

    // Render the shopping list page if user is logged in
    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold text-green-300 text-center text-decoration: underline">Shopping List</h1>
           
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="md:w-1/2">
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>
               
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <MealIdeas ingredient={selectedItemName} />
                </div>
            </div>
        </main>
    );
}