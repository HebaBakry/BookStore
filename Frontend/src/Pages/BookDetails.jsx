import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader/loader'
import axios from 'axios'

const BookDeyails = () => {

    const {id} = useParams();
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/book/get-book-info/${id}`);
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetch();
    },[]);

return (
    <div className='px-12 py-8 bg-zinc-900'>
        <div className='bg-zinc-800 rounded p-4 h-[88vh]'></div>
        <div className='p-4'></div>
    </div>
);
}

export default BookDeyails