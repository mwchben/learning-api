
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from './Components/Layout';

function App() {

  const [isLoading,setIsLoading] = useState(true);
  const [ items,setItems] = useState([]);

  useEffect(()=>{
    getData();
  },[])

  const getData = () =>{
    const ENDPOINT = "https://api.dailysmarty.com/posts";
    axios(ENDPOINT).then((response)=>{
      setIsLoading(false);
      if (response.data.posts){  //means we are not assuming the endpoint will give posts always
        setItems(response.data.posts); //an items object will now hold a posts endpoint
      } else {
        console.log("An Error happene, no posts found!!");
      }
      console.log("Success!",response)
    }).catch((error) =>{
      setIsLoading(false);
      console.log("ServerError",error)
    })
  }

  const postRenderer = items.map
    ((item) => //::thecode:: 
      <div className="post-container" key={item.id}>

          {/*the noopener and noreferrer are for security reasons*/}
          {/*.................TITLE.......................*/}
          <a href = {item.url_for_post} target="_blank" rel="noopener noreferrer" className="title">{item.title}
          </a>

          {/* a short-circuited iternary operator that means if we have the associated_topics in the item
          and they are one(there is) or many, then div them in the topic class div
          */}
          {/*................SUB-TITLE....................*/}
          {item.associated_topics?.length > 0  &&
            (
              <div className="topics">{item.associated_topics.map((topic)=>(<div className="label" key={topic}>{topic}</div>))}
              </div>  
            )
          } 
          {/*...................CONTENT....................*/}
          <div>{item.content && item.content.replace(/(<([^>]+)>)/gi,"")}</div>
      </div>
      //::thecode::(or we can call it explicitly using return)
      // {
      //   return <div>{item.title}</div>
      // }
    )

  
  const LoadingStateContent = isLoading ? <div>Loading...</div> : <div>{postRenderer}</div>;

  return (

    <Layout>{LoadingStateContent}</Layout>
 
  );
}

export default App;
