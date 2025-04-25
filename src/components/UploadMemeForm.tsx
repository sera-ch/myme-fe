import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { SyntheticEvent, useState } from "react";

function UploadMemeForm() {
    const apiBaseUrl = process.env.API_BASE_URL;
    const [invalidTitle, setInvalidTitle] = useState(false)
    const [invalidFile, setInvalidFile] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <Header search={ false }></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={uploadMeme} className='col-4'>
                    <div className='input row'>
                        <label htmlFor='title' className='col-3 required'>
                            Title
                        </label>
                        <input id='title' name='title' onChange={(event) => validateTitle(event)} type='text' className={invalidTitle ? 'col-9 invalid' : 'col-9'} />
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
                        <label htmlFor='file' className='col-3 required'>
                            Image
                        </label>
                        <input id='file' onChange={(event) => validateFile(event)} name='file' type='file' className={invalidFile ? 'col-9 invalid' : 'col-9'} />
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

    function validateFile(event: SyntheticEvent) {
        setInvalidFile(event.target.files[0] == undefined)
    }

    function validateTitle(event: SyntheticEvent) {
        setInvalidTitle(event.target.value == '')
    }

    function uploadMeme(event:SyntheticEvent) {
        event.preventDefault();
        const title = event.target[0].value
        const desc = event.target[1].value
        const character_tags = event.target[2].value
        const source_tags = event.target[3].value
        const misc_tags = event.target[4].value
        const file = event.target[5].files[0]
        if (title == '' || file == undefined) {
            if (title == '') {
                setInvalidTitle(true)
            }
            if (file == undefined) {
                setInvalidFile(true)
            }
            return
        }
        setInvalidTitle(false)
        setInvalidFile(false)
        const request = {
            title: title,
            desc: desc,
            character_tags: character_tags,
            source_tags: source_tags,
            misc_tags: misc_tags,
            file: file
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': sessionStorage.getItem('token')
            }
        };
        axios.post(apiBaseUrl + '/meme/v2/upload', request, config)
            .then(() => {
                navigate('/');
            }).catch(error => {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            })
    }
}

export default UploadMemeForm;