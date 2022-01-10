import { Link } from 'react-router-dom';
import TagList from '../tag-list/tag-list';
import {ApiRoute} from '../../const';

type Author = {
  username: string,
  bio: null | string,
  image: string,
}

type Comment = {
  author: Author,
  body: string,
  createdAt: string,
  id: number,
  updatedAt: string,
}

export type ArticleProps = {
  author: Author,
  body: string,
  comments: Comment[][],
  createdAt: string,
  description: string,
  favorited: boolean,
  favoritesCount: number,
  slug: string,
  tagList: string[],
  title: string,
  updatedAt: string,
  }

export type ArticlesProps = {
  articles: ArticleProps[],
  };


function Feed ({articles}: ArticlesProps): JSX.Element {
  return (
    <>
      {articles.map((article, index) => (
        <div className="article-preview" key={article.updatedAt}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
          </div>
          <Link to={`${ApiRoute.Article}/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <TagList tags={article.tagList} />
          </Link>
        </div>
      ))}
    </>
  );
}

export default Feed;
