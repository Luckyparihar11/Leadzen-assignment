import { Button } from '@mui/material'
import React from 'react'
import Data from '../components/details/Details'
import './home.scss'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {

    const [Array, setArray] = useState([]);
    const [List, setList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    var postPerPage = 3;
    var totalPost = 10;
    var lastIndex = currentPage * postPerPage;
    var firstIndex = lastIndex - postPerPage;



    const getData = async () => {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await data.json();
            console.log(result)
            setList(result.slice(firstIndex, lastIndex));
            totalPost = result.length;
            setArray(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const datalist = Array.slice(firstIndex, lastIndex);
        setList(datalist);
    }, [Array, currentPage, firstIndex, lastIndex]);


    const setPage = (currPage) => {
        setCurrentPage(currPage);
    }

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i);
    }

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const next = () => {
        if (currentPage < Math.ceil(totalPost / postPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div className='home'>
                <div className='container'>
                    {List.map((val, index) => {
                        return <Data data={val} key={index} />
                    })}
                </div>

                <div className='pageCon'>
                    <div className='pagination'>

                        <div>
                            <Button className='but' onClick={prev}><ChevronLeftIcon /></Button>
                        </div>

                        <div className='scrollCon'>
                            <div className='scroll'>
                                {pageNumber.map((number) => {
                                    return (
                                        <div onClick={() => setPage(number)}>{number}</div>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <Button className='but' onClick={next}><ChevronRightIcon /></Button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home