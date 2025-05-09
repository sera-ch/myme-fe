import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { SyntheticEvent, useState } from "react";
import form from "../objects/Form";

function UploadMemeForm() {
    const apiBaseUrl = process.env.API_BASE_URL;
    const [invalidTitle, setInvalidTitle] = useState(false)
    const [invalidFile, setInvalidFile] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <Header search={ false }></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={event => uploadMeme(event, event as unknown as form)} className={ disabled ? 'col-4 disabled' : 'col-4'}>
                    <div className='input row'>
                        <label htmlFor='title' className='col-3 required'>
                            Title
                        </label>
                        <input id='title' disabled={disabled} name='title' onChange={(event) => validateTitle(event)} type='text' className={invalidTitle ? 'col-9 invalid' : 'col-9'} />
                    </div>
                    <div className='input row'>
                        <label htmlFor='desc' className='col-3'>
                            Description
                        </label>
                        <textarea disabled={disabled} id='desc' name='desc' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='characters' className='col-3'>
                            Characters
                        </label>
                        <textarea disabled={disabled} id='characters' name='characters' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='sources' className='col-3'>
                            Sources
                        </label>
                        <textarea disabled={disabled} id='sources' name='sources' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='misc' className='col-3'>
                            Misc tags
                        </label>
                        <textarea disabled={disabled} id='misc' name='misc' className='col-9' />
                    </div>
                    <div className='input row'>
                        <label htmlFor='file' className='col-3 required'>
                            Image
                        </label>
                        <input id='file' disabled={disabled} onChange={(event) => validateFile(event)} name='file' type='file' className={invalidFile ? 'col-9 invalid' : 'col-9'} />
                    </div>
                    <div className='input row'>
                        <button type='submit' disabled={disabled} id='submit' className='col-3'>Upload</button>
                    </div>
                </form>
                <div className='col-4'>
                </div>
            </div>
        </>
    );

    function validateFile(event: SyntheticEvent) {
        const form = event.target as HTMLInputElement
        setInvalidFile(form.files == undefined || form.files[0] == undefined)
    }

    function validateTitle(event: SyntheticEvent) {
        setInvalidTitle((event.target as HTMLInputElement).value == '')
    }

    function uploadMeme(event: SyntheticEvent, form: form) {
        if (form.target[5].files == undefined) return
        event.preventDefault();
        const title = form.target[0].value
        const desc = form.target[1].value
        const character_tags = form.target[2].value
        const source_tags = form.target[3].value
        const misc_tags = form.target[4].value
        const file = (form.target[5]).files[0]
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
        setDisabled(true)
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
                navigate('/0');
            }).catch(error => {
                navigate("/error", { state: { code: error.response.data.code, message: error.response.data.message } })
            })
    }
}

export default UploadMemeForm;