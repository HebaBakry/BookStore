import React,{ useEffect, useState } from 'react'
import Loader from '../Components/Loader/loader'
import BookCard from '../Components/BookCard/bookCard'
import axios from 'axios'

const AllBooks = () => {
      const [Data, setData] = useState();
      useEffect(() => {
          const fetch = async () => {
              try {
                  const response = await axios.get('http://localhost:1000/api/book/get-all-books');
                  console.log(response);
                  setData(response.data);
              } catch (error) {
                  console.error(error)
              }
          }
          fetch();
      },[]);

  return (
    <div className='bg-zinc-100 h-auto px-12 py-8'>
      <h4 className='text-2xl text-yellow-100'>All Books</h4>
        {!Data &&  <div className='flex items-center justify-center my-8'> <Loader/></div>}
        <div className='my-8 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-8'>
            {Data && Data.map((book, i) => (
                <div key={i} >
                    <BookCard Book = {book}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllBooks