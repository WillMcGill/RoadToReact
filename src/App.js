import React from 'react';

const useSemiPersistantState = (key, initialState) =>{

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState);
    
     
  React.useEffect(()=>{
    localStorage.setItem(key, value);
    }, [value, key]);

  return [value, setValue];
}
const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const App = () => {

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useSemiPersistantState('search', 'React');

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

    setStories(newStories);
  }

  const searchedStories = stories.filter( story =>{
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel 
      onInputChange={handleSearch} 
      value={searchTerm}
      id="search"
      >
        <strong>Search:</strong> 
      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

const InputWithLabel = ({ 
    id, 
    value, 
    onInputChange,
    type = 'text',
    children,
    isFocused
  }) => {
    const inputRef = React.useRef()

    React.useEffect(()=>{
      if (isFocused && inputRef.current){
        inputRef.current.focus();
      }

    });
   
    return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onInputChange}
        autoFocus={isFocused}
        />
      <p>
        Searching for <strong>{value}</strong>.
      </p>
    </>
  );
};

const List = ({list, onRemoveItem}) =>
  list.map(item => (
    <Item key={item.objectID} 
          item={item}
          onRemoveItem={onRemoveItem} />
      
  ));

  const Item = ({ item, onRemoveItem }) => {
    
    const handleRemoveItem = () =>
      onRemoveItem(item);
    

    return(
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
    </div>
    )
    }
export default App;
