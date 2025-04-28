import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import tag from "../objects/Tag";
import { Dropdown } from "react-bootstrap";
import { SyntheticEvent, useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

function AdvancedSearchForm() {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState<tag[]>([]);
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
            <Header search={false}></Header>
            <h2>Advanced Search</h2>
            <div className='row'>
                <div className='col-2 d-none d-md-block'>
                </div>
                <form id='adv-search-form' onSubmit={searchMeme} className='col-8'>
                    <div className='input row'>
                        <label htmlFor='tags' className='col-3 required'>
                            Tags
                        </label>
                        <div className='col-8 tag-list'>
                            {
                                selectedTags.map((tag: tag) => (
                                    <a href='' onClick={(event) => removeTag(event, tag.name, tag.type)}>
                                        <span key={tag.name + "_" + tag.type} className={'tag tag_' + tag.type}>{tag.name}<X></X></span>
                                    </a>))
                            }
                        </div>
                        <Dropdown className = 'col-9'>
                            <Dropdown.Toggle variant='outline-primary' id='tag-select'>
                                Select tag
                            </Dropdown.Toggle>
                            <Dropdown.Menu className = 'dropdown-menu'>
                                {
                                    tags.map((tag: tag) => (<Dropdown.Item
                                        disabled={selectedTags.some(
                                            it => it.name == tag.name && it.type == tag.type
                                        )}
                                        href='' key={tag.name + "_" + tag.type} onClick={() => addTag(tag.name, tag.type)} className={'tag-select tag-type-' + tag.type}>{tag.name}</Dropdown.Item>))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='input row adv-search-btn'>
                        <button type='submit' id='submit' className='col-3' disabled={ selectedTags.length == 0 }>Search</button>
                    </div>
                </form>
                <div className='col-2 d-none d-md-block'>
                </div>
            </div>
        </>
    );

    function addTag(tagName: string, tagType: string) {
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

    function removeTag(event: SyntheticEvent, tagName: string, tagType: string) {
        event.preventDefault();
        const newSelectedTags = selectedTags.filter(tag => tag.name != tagName || tag.type != tagType)
        setSelectedTags(newSelectedTags);
    }

    function searchMeme(event: SyntheticEvent) {
        event.preventDefault();
        navigate('/search/advanced/result/0', { state: selectedTags })
    }
}

export default AdvancedSearchForm;