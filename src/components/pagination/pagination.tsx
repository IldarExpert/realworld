import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { range } from '../../servises/utils';

type PaginationProps = {
  articlesCount: number,
  pageLimit: number,
  currentPage: number,
}


function Pagination ({articlesCount, pageLimit, currentPage}: PaginationProps): JSX.Element {

  const pagesCount = Math.ceil(articlesCount / pageLimit);
  const pages = range(1, pagesCount);
  const location = useLocation();

  return (
    <nav>
      <ul className="pagination">
        {pages.length>1 && pages.map((page) => (
          <li
            key={page}
            className={`page-item ng-scope ${(currentPage === page) || (!currentPage && page === 1) ? 'active': ''}`}
          >
            <Link className="page-link ng-binding" to={`${location.pathname}?page=${page}`}>{page}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
