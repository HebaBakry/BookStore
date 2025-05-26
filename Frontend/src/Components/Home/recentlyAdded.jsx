import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/bookCard'
import Loader from '../Loader/loader';

const RecentlyAdded = () => {
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/book/get-recent-books');
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetch();
    },[]);
return (
    <div className='mt-8 px-4 '>
        <h4 className='text-2xl text-yellow-100'>Recently added books</h4>
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

export default RecentlyAdded