import { useNavigate } from "react-router-dom";

function Card({ title, desc, imageUrl, tags, showBigImage }: { title: any, desc: any, imageUrl: any, tags: any, showBigImage: any }) {

    const navigate = useNavigate();

    return (
        <>
            <div className='card col-12 col-md-4 col-lg-3 col-xl-2'>
                <div className='image-container'>
                    <a href='' onClick={showBigImage}>
                        <img src={imageUrl} alt={desc} />
                    </a>
                </div>
                <div className='tags'>
                    {
                        tags
                            .sort((a:any, b:any) => a.type > b.type ? 1 : -1)
                            .map((tag: any) => (<a key={tag.name + "_" + tag.type} href='' onClick={(event) => { event.preventDefault() }}><span className={'tag tag_' + tag.type} key={title + "_" + tag.name + "_" + tag.type}>{tag.name}</span></a>))
                    }
                </div>
            </div>
        </>);
}

export default Card; 