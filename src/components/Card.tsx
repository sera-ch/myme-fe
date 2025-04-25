import { MouseEventHandler } from "react";
import tag from "../objects/Tag";

function Card({ title, desc, imageUrl, tags, showBigImage }: { title: string, desc: string, imageUrl: string, tags: tag[], showBigImage: MouseEventHandler }) {
    return (
        <>
            <div className='col-12 col-md-4 col-xxl-2'>
                <div className='card'>
                    <div className='image-container'>
                        <a href='' onClick={showBigImage}>
                            <img src={imageUrl} alt={desc} />
                        </a>
                    </div>
                    <div className='tags'>
                        {
                            tags
                                .sort((a:tag, b:tag) => a.type > b.type ? 1 : -1)
                                .map((tag: tag) => (<a key={tag.name + "_" + tag.type + "_" + imageUrl} href='' onClick={(event) => { event.preventDefault() }}><span className={'tag tag_' + tag.type} key={title + "_" + tag.name + "_" + tag.type}>{tag.name}</span></a>))
                        }
                    </div>
                    </div>
            </div>
        </>);
}

export default Card; 