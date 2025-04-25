import tag from "./Tag";

interface meme {
    title: string,
    tags: tag[],
    image_url: string,
    desc: string,
}

export default meme;