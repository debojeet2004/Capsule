import React, { useState } from 'react';
import { searchIcon, left } from '../../assets/media';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { search_data } from '../../redux/Saltdata';
import { useNavigate } from 'react-router-dom';

function Search_bar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const fetchData = async (query) => {
        try {
            const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${query}&pharmacyIds=1,2,3`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            const data = await fetchData(searchQuery);
            dispatch(search_data(data));
            setSearchQuery('');
            setHasSearched(true);
        }
    };

    const handleBack = () => {
        setHasSearched(false);
        navigate('/'); // Navigate to the home page
    };

    return (
        <form 
            onSubmit={handleSearch} 
            className='w-full flex justify-between items-center h-[4rem] px-5 rounded-full bg-white overflow-hidden text-black shadow-2xl'
        >
            <button 
                type="button" 
                onClick={hasSearched ? handleBack : null}
                className='bg-transparent w-[5%] h-full p-2 flex justify-center items-center'
            >
                <img 
                    src={hasSearched ? left : searchIcon} 
                    alt="icon" 
                    className='w-[1.8rem] bg-transparent' 
                />
            </button>

            <input 
                type="text" 
                placeholder='Type your medicine name here'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-[80%] p-2 flex justify-center items-center outline-none bg-transparent font-semibold text-lg text-black capitalize opacity-80' 
            />

            <button 
                type='submit'
                className='w-[10%] p-2 flex justify-center items-center active:text-cyan-700 text-2xl font-semibold text-cyan-800 hover:text-cyan-950 transition-all duration-300 ease-in-out'
            >
                Search
            </button>
        </form>
    );
}

export default Search_bar;
