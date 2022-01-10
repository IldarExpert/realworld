import {useParams, useHistory, Redirect} from 'react-router-dom';
import ArticleForm from '../acticle-form/article-form';
import {ApiRoute, AppRoute, AuthStatus} from '../../const';
import useFetch from '../../hooks/useFetch';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/user-reducer/selectors';


type ArticleType = {
  body: string,
  description: string,
  tagList: string[],
  title: string,
} | null;

function EditArticle(): JSX.Element {
  const history = useHistory();
  const {slug} = useParams<Record<string, string | undefined>>();
  const apiUrl = `${ApiRoute.Articles}/${slug}`;
  const [{response}, doFetch] = useFetch(apiUrl);
  const [{response: responseUpdate, error: errorUpdate}, doFetchUpdate] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState<ArticleType>(null);
  const authStatus = useSelector(getAuthStatus);


  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }

    setInitialValues({
      body: response.article.body,
      description: response.article.description,
      tagList: response.article.tagList,
      title: response.article.title,
    });

  }, [response]);

  const handleSubmit = (article: ArticleType) => {
    doFetchUpdate({
      method: 'PUT',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!responseUpdate) {
      return;
    }
    history.push(`${ApiRoute.Article}/${responseUpdate.article.slug}`);
  }, [responseUpdate, history]);

  if (authStatus === AuthStatus.NoAuth) {
    return <Redirect to={AppRoute.Main} />;
  }

  return (
    <ArticleForm onSubmit={handleSubmit} initialValues={initialValues} errors={errorUpdate && errorUpdate}/>
  );
}

export default EditArticle;
