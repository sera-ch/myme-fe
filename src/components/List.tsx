import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import meme from "../objects/Meme";
import Pagination from "./Pagination"
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function List({page}:{page: string}) {

    const [memes, setMemes] = useState<meme[]>([]);
    const [currentMeme, setCurrentMeme] = useState('');
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const apiBaseUrl = process.env.API_BASE_URL;
    const navigate = useNavigate();
    const DEFAULT_PAGE_SIZE = 12;

    useEffect(() => {
        setLoading(true)
        const config = {
             params: {
                 "page": page,
                 "size": DEFAULT_PAGE_SIZE
             }
        }
        axios.get(apiBaseUrl + '/meme/list', config)
            .then(response => {
                setMemes(response.data.content)
                setLoading(false)
                setTotalPages(response.data.totalPages)
            }).catch(error => {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            })
    }, [apiBaseUrl, navigate, page])

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
            <div>
                <div className='list row'>
                    {
                        loading ? (
                            <div className='loading'>
                                <Spinner variant='light' animation='border' role='status'></Spinner>
                            </div>
                        ) : (
                            <div className='card-container row'>
                                    {memes.map((item) => (<Card key={item.title} showBigImage={(event: SyntheticEvent) => showBigImage(event, item.image_url)} title={item.title} desc={item.desc} imageUrl={item.image_url} tags={item.tags} />))}
                            </div>
                        )
                        }
                    <Pagination from="/" total={totalPages}></Pagination>
                </div>
                <div className='big-image row' hidden={!display}>
                    <div className='big-image-bg' onClick={hideBigImage}>
                        {
                            currentMeme != '' ? <img src={currentMeme} /> : ''
                        }
                    </div>
                </div>
            </div>
        </>);
}

export default List;