const Pagination = ({currentPage, itemsPerPage, length, onPageChange}) => {
    
    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

    return ( 
        <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className={"page-item" + (currentPage === 1 && " disabled")}><button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button></li>
            { pages.map(page => 
                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button 
                    className="page-link" 
                    onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                </li>
                )
            }
            <li className={"page-item" + (currentPage === pagesCount && " disabled")}><button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button></li>
        </ul>
        </nav>
     );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
 
export default Pagination;