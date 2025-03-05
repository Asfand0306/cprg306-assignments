import Link from 'next/link';



export default function Page() {
    return (
      <main>
        <h1 className= "text-4xl font-bold p-5">CPRG 306: Web Development 2 - Assignments</h1>
        <ul className="pl-5">
          <li className= "p-2 justify-between">
          <Link href="/week-2">Week 2</Link>
          </li>
          <li className= "p-2 justify-between" >
          <Link href="/week-3">Week 3</Link>
          </li>
          <li className="p-2 justify-between">
          <Link href="/week-4">Week 4</Link>
          </li>
          <li className="p-2 justify-between">
          <Link href="/week-5">Week 5</Link>
          </li>
          <li className="p-2 justify-between">
          <Link href="/week-6">Week 6</Link>
          </li>
          <li className="p-2 justify-between">
          <Link href="/week-7">Week 7</Link>
          </li>
        </ul>
      </main>
    );
  }