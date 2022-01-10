import {Link, useParams, useHistory} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {useEffect} from 'react';
import TagList from '../tag-list/tag-list';
import {ApiRoute, AppRoute, AuthStatus} from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorMessage from '../error-message/error-message';
import {useSelector} from 'react-redux';
import {getAuthStatus, getUser} from '../../store/user-reducer/selectors';

function Article(): JSX.Element {
  const history = useHistory();
  const {slug} = useParams<Record<string, string | undefined>>();
  const apiUrl = `${ApiRoute.Articles}/${slug}`;
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl);

  const [{response: responseDelete}, deleteArticle] = useFetch(apiUrl);
  const authStatus = useSelector(getAuthStatus);
  const user = useSelector(getUser);

  const isAuthor = () => {
    if (response) {
      const isAuthorStatus = authStatus === AuthStatus.Auth && user.username === response.article.author.username;
      return isAuthorStatus;
    }
    return false;
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('authStatus');
  }, []);

  const handleDeleteArticle = () => {
    deleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    if (responseDelete === null) {
      return;
    }
    history.replace(AppRoute.Main);
  }, [responseDelete]);

  return (
    <div className="article-page">
      {isLoading && <LoadingScreen/>}
      {error && <ErrorMessage/>}
      {response && (
        <div className="banner">
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt=""/>
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`${ApiRoute.Editor}/${response.article.slug}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDeleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="container page">
        {isLoading && <LoadingScreen/>}
        {error && <ErrorMessage/>}
        {response && (
          <div className="row article-content">
            <div>
              <p>{response.article.body}</p>
            </div>
            <TagList tags={response.article.tagList}/>
          </div>)}
        <hr/>
      </div>
    </div>
  );
}

export default Article;
