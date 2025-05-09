import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import { Spinner } from "react-bootstrap";
import Pagination from "./Pagination"
import meme from "../objects/Meme";

function SearchResult() {

    const [memes, setMemes] = useState([]);
    const [currentMeme, setCurrentMeme] = useState('');
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const apiBaseUrl = process.env.API_BASE_URL;
    const location = useLocation();
    const text = location.state;
    const navigate = useNavigate();
    const DEFAULT_PAGE_SIZE = 12;
    const page = useParams()

    useEffect(() => {
        const config = {
             params: {
                 "page": page,
                 "size": DEFAULT_PAGE_SIZE
             }
         }
        axios.post(apiBaseUrl + '/meme', {
            text: text
        }, config)
            .then(response => {
                if (response.data.content.length > 0) {
                    setFound(true);
                    setMemes(response.data.content)
                    setTotalPages(response.data.totalPages)
                } else {
                    setFound(false);
                }
                setLoading(false)
            }).catch(error => {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            })
    }, [])

    const showBigImage = useCallback((event: SyntheticEvent, imageUrl: string) => {
        event.preventDefault();
        setDisplay(true);
        setCurrentMeme(imageUrl)
    }, []);

    const hideBigImage = (event: SyntheticEvent) => {
        event.preventDefault();
        setDisplay(false);
        setCurrentMeme('')
    };

    return (
        <>
            <Header search={false}></Header>
            <h2>{ text }</h2>
            <div>
                <div className='list row'>
                    {
                        loading ? (
                            <div className='loading'>
                                <Spinner variant='light' animation='border' role='status'></Spinner>
                            </div>
                        ) : !found ? (
                            "We did not find anything. Try another query?"
                        ) :
                        (
                            memes.map((item: meme) => (<Card key={item.title} showBigImage={(event) => showBigImage(event, item.image_url)} title={item.title} desc={item.desc} imageUrl={item.image_url} tags={item.tags} />))
                        )
                    }
                    <Pagination from="/search" total={totalPages}></Pagination>
                </div>
                <div className='big-image row' hidden={!display}>
                    <div className='big-image-bg' onClick={hideBigImage}>
                        {
                            currentMeme != '' ? <img src={currentMeme} /> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default SearchResult;