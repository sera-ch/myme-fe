import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";

function Pagination({ total, from }: { total: number, from: string }) {

    const [currentPage, setCurrentPage] = useState(0)
    const navigate = useNavigate()

    function renderPageNumbers() {
        const pageNumbers = [];
        for (let page = 0; page < total; page++) {
            if (total <= 10 || page < 2 || page > total - 2 || page == currentPage) {
                pageNumbers.push(
                    <a href='' key={ 'page-number-link-' + (page + 1) } onClick={(event) => navigateToPage(event, page)}>
                        <div key={'page-number-' + (page+1)} className={ page == currentPage ? 'page-number selected' : 'page-number' } ><h6>{page + 1}</h6></div>
                    </a>
                )
            } else if ((page == 2 && currentPage > 2) || (page == total - 2 && currentPage < total - 2)) {
                pageNumbers.push(
                     <div className='page-number'><h6>...</h6></div>
                )
            }
        }
        return pageNumbers;

    }

    function navigateToPage(event: SyntheticEvent, page: number) {
        event.preventDefault();
        if (page < 0 || page > total) {
            return
        }
        setCurrentPage(page);
        navigate(from + page, { replace: true })
    }

    function navigateToPrev(event: SyntheticEvent) {
        event.preventDefault();
        if (currentPage <= 0) {
            return;
        }
        setCurrentPage(currentPage - 1)
        navigate(from + (currentPage - 1), { replace: true })
    }

    function navigateToNext(event: SyntheticEvent) {
        event.preventDefault();
        if (currentPage >= total) {
            return;
        }
        setCurrentPage(currentPage + 1)
        navigate(from + (currentPage + 1), {replace: true})
    }

    return (
        <>
            <div className='pagination'>
                <div className='page-number-container'>
                    <a href='' onClick={navigateToPrev}>
                        <div className={currentPage <= 0 ? 'page-number disabled' : 'page-number'}><h6>{"<"}</h6></div>
                    </a>
                    {renderPageNumbers()}
                    <a href='' onClick={navigateToNext}>
                        <div className={currentPage >= total - 1 ? 'page-number disabled' : 'page-number'}><h6>{">"}</h6></div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Pagination;