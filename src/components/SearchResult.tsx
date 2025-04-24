import { useCallback, useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

function SearchResult() {

    const [memes, setMemes] = useState([]);
    const [currentMeme, setCurrentMeme] = useState('');
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    const apiBaseUrl = process.env.API_BASE_URL;
    const location = useLocation();
    const text = location.state;

    useEffect(() => {
        axios.post(apiBaseUrl + '/meme', {
            text: text
        })
            .then(response => {
                if (response.data.content.length > 0) {
                    setFound(true);
                    setMemes(response.data.content)
                } else {
                    setFound(false);
                }
                setLoading(false)
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
            <Header search={false}></Header>
            <div>
                <div className='list row'>
                    {
                        loading ? (
                            "Loading"
                        ) : !found ? (
                            "We did not find anything. Try another query?"
                        ) :
                        (
                            memes.map((item) => (<Card key={item.title} showBigImage={(event) => showBigImage(event, item.image_url)} hideBigImage={hideBigImage} title={item.title} desc={item.desc} imageUrl={item.image_url} tags={item.tags} />))
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
        </>
    )

}

export default SearchResult;