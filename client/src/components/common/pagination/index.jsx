import ReactPaginate from 'react-paginate';


export const CustomPagination = ({ pageCount = 1, ...res }) => {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            previousLabel="< "
            pageRangeDisplayed={5}
            pageCount={pageCount}
            containerClassName="pagination justify-content-center"

            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            {...res}
        />
    )
}