import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function List() {

    const [memes, setMemes] = useState([]);
    const [currentMeme, setCurrentMeme] = useState('');
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = process.env.API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(apiBaseUrl + '/meme/list')
            .then(response => {
                setMemes(response.data.content)
                setLoading(false)
            }).catch(error => {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            })
    }, [])

    const showBigImage = useCallback((event: any, imageUrl: string) => {
        event.preventDefault();
        setDisplay(true);
        setCurrentMeme(imageUrl)
    }, []);

    const hideBigImage = (event: any) => {
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
                                memes.map((item) => (<Card key={ item.title } showBigImage={(event) => showBigImage(event, item.image_url)} hideBigImage={hideBigImage} title={item.title} desc={item.desc} imageUrl={item.image_url} tags={item.tags} />))
                        )
                        }
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