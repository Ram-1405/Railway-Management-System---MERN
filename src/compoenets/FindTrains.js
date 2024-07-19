import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainsInfo from './TrainsInfo';
import '../App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function FindTrains() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [dates,setDate]=useState('');
    const [trains, setTrains] = useState([]);
    const [search, setSearch] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 

    useEffect(() => {
        if (!search) {
            fetchData();
        }
    }, [page]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/trains/${origin}/${destination}/${dates}?page=${page}`);
            if (response.data.length === 0) {
                setHasMore(false);
                return;
            }
            setTrains([...trains,response.data]);
        } catch (err) {
            setError('Server Error.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!origin || !destination) {
            setError('Please enter both origin and destination.');
            return;
        }
        setPage(1); 
        setHasMore(true); 
        setTrains([]); 
        try {
            const response = await axios.get(`http://localhost:5000/trains/${origin}/${destination}/${dates}`);
            console.log(dates);
            if (response.data.length === 0) {
                setError('Train not found.');
                return;
            }
            if(response.data.length>=trains.length){
                setHasMore(false);
            }
            setTrains(response.data);
            setSearch(false);
        } catch (err) {
            if(err.response && err.response.status===404){
                setError('Train Not Found');
            }else{
            setError('Server Error.');
            }
        }
    };

    return (
        <>
            {search ? (
                <>
                <div className='container-fluid imgdiv'></div>
                <div className='form-control' style={{width:'460px',height:'340px',position:'relative'
                ,fontWeight:'bolder',marginTop:'-530px',backgroundColor:'white',opacity:'0.8'
                    ,marginLeft:'10%',padding:'30px',justifyContent:'center',zIndex:'2'}}>
                    <form onSubmit={handleSubmit}>
                    <div className="col-sm-10">
                        <label className="col-sm-2 col-form-label">From:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Mumbai Central"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                        </div>
                        <div className="col-sm-10">
                        <label className="col-sm-2 col-form-label">To:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: New Delhi"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        </div>
                        <div className="col-sm-10">
                        <label className="col-sm-2 col-form-label">Date :</label>
                        <input
                            type="date"
                            value={dates}
                            style={{border:'none',}}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        </div>
                        <button type="submit" style={{width:'100px',marginTop:'8%'}} className="btn btn-primary">Search</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
                </>
            ) : (
                <div className='container-fluid imgdiv'>
                    <div
          id="scrollableDiv"
          style={{
            height: '100%', 
            width:'100%',
            overflow: 'auto', 
            padding: '20px'
          }}
        >
                <InfiniteScroll
                    dataLength={trains.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p style={{ textAlign: 'center',color:'black',
                      fontFamily:'serif',fontSize:'20px',fontWeight:'bolder'
                     }}>You have seen all Trains</p>}
                    scrollableTarget="scrollableDiv"
                >
                    {trains.map((train, index) => {
                        return (
                            <div className="inner" key={index}>
                                <TrainsInfo
                                    name={train.name}
                                    trainNumber={train.trainNumber}
                                    origin={train.origin}
                                    destination={train.destination}
                                    departureTime={train.departureTime}
                                    arrivalTime={train.arrivalTime}
                                    arrivalDate={train.arrivalDate}
                                    basePrice={train.price}
                                    setSearch={setSearch}
                                />
                            </div>
                        );
                    })}
                </InfiniteScroll>
                </div>
                </div>
            )}
        </>
    );
}