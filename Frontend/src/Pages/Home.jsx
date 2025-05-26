import React from 'react'
import Hero from '../Components/Home/hero';
import RecentlyAdded from '../Components/Home/recentlyAdded';

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white PX-20 py-8'>
      <Hero/>
      <RecentlyAdded/>
    </div>
  
  )
}
export default Home;
