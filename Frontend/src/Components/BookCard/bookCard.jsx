import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({Book}) => {
  console.log(Book);
  return (
  <> 
    <Link to = {`/view-book-details/${Book._id}`}>

    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <div className='bg-zinc-900 rounded flex items-center justify-center'>
        <img src={Book.url} alt='/' className = "h-[25vh]"/>
        </div>
        <h2 className='mt-4 text-xl font-semibold'>{Book.title}</h2>
        <p className='mt-2 text-zinc-400 font-semibold'> by {Book.author}</p>
        <p className='mt-2 text-xl text-zinc-200 font-semibold'>$ {Book.price}</p>

    </div>
    </Link>
  </>
  );
}

export default BookCard