type TagListProps = {
  tags: string[],
}

function TagList({tags}: TagListProps): JSX.Element {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag} className="tag-default tag pill tag-outline">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
