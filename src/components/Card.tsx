function Card({ title, desc, imageUrl, tags } : { title:any, desc:any, imageUrl:any, tags:any }) {
    return (
        <>
            <div className='card col-12 col-md-4 col-lg-3 col-xl-2'>
                <div className='image-container'>
                    <img src={imageUrl} alt={desc} />
                    <div className='overlay'>
                        <h3>
                            {title}
                        </h3>
                    </div>
                </div>
                <div className='tags'>
                    {
                        tags
                            .sort((a:any, b:any) => a.type > b.type ? 1 : -1)
                            .map((tag: any) => (<a href='#'><span className={'tag tag_' + tag.type} key={title + "_" + tag.name + "_" + tag.type}>{tag.name}</span></a>))
                    }
                </div>
            </div>
        </>);
}

export default Card; 