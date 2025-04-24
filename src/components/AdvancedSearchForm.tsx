import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

function AdvancedSearchForm() {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);
    const apiBaseUrl = process.env.API_BASE_URL;

    useEffect(() => {
        axios.get(apiBaseUrl + '/tag/list')
            .then(response => {
                setTags(response.data.tags);
            })
    }, [])

    return (
        <>
            <Header search={ false }></Header>
            <div className='row'>
                <div className='col-4'>
                </div>
                <form id='login-form' onSubmit={searchMeme} className='col-4'>
                    <div className='input row'>
                        <label htmlFor='tags' className='col-3 required'>
                            Tags
                        </label>
                        <div className='col-8 tag-list'>
                            {
                                selectedTags.map((tag: any) => (
                                    <a href='' onClick={(event) => event.preventDefault()}>
                                        <span key={tag.name + "_" + tag.type} className={'tag tag_' + tag.type}>{tag.name}</span>
                                    </a>))
                            }
                        </div>
                        <Dropdown className = 'col-9'>
                            <Dropdown.Toggle id='tag-select'>
                                Select tag
                            </Dropdown.Toggle>
                            <Dropdown.Menu className = 'dropdown-menu'>
                                {
                                    tags.map((tag: any) => (<Dropdown.Item
                                        disabled={selectedTags.some(
                                            it => it.name == tag.name && it.type == tag.type
                                        )}
                                        href='' key={tag.name + "_" + tag.type} onClick={(event) => addTag(event, tag.name, tag.type)} className={'tag-select tag-type-' + tag.type}>{tag.name}</Dropdown.Item>))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='input row'>
                        <button type='submit' id='submit' className='col-3'>Search</button>
                    </div>
                </form>
                <div className='col-4'>
                </div>
            </div>
        </>
    );

    function addTag(event: any, tagName: string, tagType: string) {
        if (selectedTags.some(
            tag => tag.name == tagName && tag.type == tagType
        )) return
        setSelectedTags([
            ...selectedTags,
            {
                name: tagName,
                type: tagType
            }
        ])
    }

    function searchMeme(event: any) {
        event.preventDefault();
        const request = {
            tags: selectedTags
        }
        console.log(request) // TODO: Call search V2
    }
}

export default AdvancedSearchForm;