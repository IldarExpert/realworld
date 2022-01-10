import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Feed from '../feed/feed';
import PopularTags from '../popular-tags/popular-tags';
import useFetch from '../../hooks/useFetch';
import Pagination from '../pagination/pagination';
import {ApiRoute, LIMIT_PER_PAGE} from '../../const';
import FeedToggler from '../feed-toggler/feed-toggler';

function TagFeed (): JSX.Element {
  const location = useLocation();
  const {slug} = useParams<Record<string, string | undefined>>();
  const [, value] = location.search.split('?page=');
  const currentPage = Number(value? value: 1);


  const apiUrl = `/${ApiRoute.Articles}?limit=${LIMIT_PER_PAGE}&offset=${(currentPage - 1)*LIMIT_PER_PAGE}&tag=${slug}`;
  const [{response, error, isLoading}, doFetch ] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, apiUrl]);

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName = {slug} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  articlesCount={response.articlesCount}
                  currentPage = {currentPage}
                  pageLimit = {LIMIT_PER_PAGE}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TagFeed;
