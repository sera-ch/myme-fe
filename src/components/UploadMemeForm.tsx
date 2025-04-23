import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function UploadMemeForm() {
    const apiBaseUrl = process.env.API_BASE_URL;
    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={uploadMeme} className='col-4'>
                    <div className='input row'>
                        <label htmlFor='title' className='col-3'>
                            Title
                        </label>
                        <input id='title' name='title' type='text' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='desc' className='col-3'>
                            Description
                        </label>
                        <textarea id='desc' name='desc' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='characters' className='col-3'>
                            Characters
                        </label>
                        <textarea id='characters' name='characters' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='sources' className='col-3'>
                            Sources
                        </label>
                        <textarea id='sources' name='sources' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='misc' className='col-3'>
                            Misc tags
                        </label>
                        <textarea id='misc' name='misc' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='file' className='col-3'>
                            Image
                        </label>
                        <input id='file' name='file' type='file' className='col-9' />
                    </div>
                    <div className='input row'>
                        <button type='submit' id='submit' className='col-3'>Upload</button>
                    </div>
                </form>
                <div className='col-4'>
                </div>
            </div>
        </>
    );

    function uploadMeme(event:any) {
        event.preventDefault();
        const request = {
            title: event.target[0].value,
            desc: event.target[1].value,
            character_tags: event.target[2].value,
            source_tags: event.target[3].value,
            misc_tags: event.target[4].value,
            file: event.target[5].files[0],
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': sessionStorage.getItem('token')
            }
        };
        axios.post(apiBaseUrl + '/meme/v2/upload', request, config)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/');
                } else {
                    navigate('/error', errorCode=response.data.code)
                }
            })
    }
}

export default UploadMemeForm;