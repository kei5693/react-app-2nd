import './App.css';
import {useState} from 'react';

function Header(props){
  return <header>
    <h1><a href="/" onClick={(e)=>{
      e.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = [];
  props.topics.map(topic=>{
    return lis.push(
      <li
        key={topic.id}
      >
        <a href={'/read/' + topic.id}
          id={topic.id} onClick={e=>{
          e.preventDefault();
          props.onChangeMode(Number(e.target.id));
      }}>{topic.title}</a></li>
    )
  });

  return <nav>
    <ol>{lis}</ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Create(){
  return <article>
    <h2>Create</h2>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'js', body: 'js is ...'}
  ];
  let content = null;
  //let content2 = null;

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />

    // let title2, body2 = null;
    // content2 = topics.filter(el => {
    //   return el.id === id ? (title2 = el.title, body2 = el.body) : '';
    // });
    // content2 = <Article title={title2} body={body2} />
  } else if(mode === 'CREATE'){
    content = <Create />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }} />
      <Nav topics={topics} onChangeMode={_id=>{
        setMode('READ');
        setId(_id);
      }} />
      {content}
      <a href="/create" onClick={e=>{
        e.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}

export default App;
