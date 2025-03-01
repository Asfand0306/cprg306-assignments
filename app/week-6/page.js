import itemList from './item-list.js';

export default function Page() {
    return (
        <main className="p-4">
            <h1 className="text-3xl font-bold text-green-300 ">Shopping List</h1>
            <itemList />
        </main>
    );
}
