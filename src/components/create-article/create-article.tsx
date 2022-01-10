import {useHistory} from 'react-router-dom';
import ArticleForm from '../acticle-form/article-form';
import useFetch from '../../hooks/useFetch';
import {ApiRoute} from '../../const';
import {useEffect} from 'react';

type ArticleType = {
  body: string,
  description: string,
  tagList: string[],
  title: string,
} | null;

const initialValues = {
  body: '',
  description: '',
  tagList: [],
  title: '',
};

function CreateArticle(): JSX.Element {
  const apiUrl = ApiRoute.Articles;
  const [{response, error}, doFetch ] = useFetch(apiUrl);
  const history = useHistory();

  const handleSubmit = (article: ArticleType) => {
    doFetch({
      method: 'POST',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    history.push(`${ApiRoute.Article}/${response.article.slug}`);
  }, [response, history]);

  return (
    <ArticleForm
      errors={error && error}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}

export default CreateArticle;
