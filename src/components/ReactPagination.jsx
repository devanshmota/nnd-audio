'use client'
import React from "react";
import ReactPaginate from "react-paginate";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const ReactPagination = ({ pageCount, onPageChange }) => {
    return (
        <div>
            <ReactPaginate
                previousLabel={t("Previous")}
                nextLabel={t("Next")}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </div>
    );
};

export default withTranslation()(ReactPagination)