import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function List() {

    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = process.env.API_BASE_URL;

    useEffect(() => {
        axios.get(apiBaseUrl + '/meme/list')
            .then(response => {
                setMemes(response.data.content)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <div className='list row'>
                {
                    loading ? (
                        "Loading"
                    ) : (
                            memes.map((item) => (<Card title={item.title} desc={item.desc} imageUrl={item.image_url} tags={item.tags} />))
                    )
                    }
            </div>
        </>);
}

export default List;