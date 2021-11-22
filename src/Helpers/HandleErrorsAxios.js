import axios from "axios";
import React from "react";
const baseURL = "https://jsonplaceholder.typicode.com/posts";
export default function App() {
const [post, setPost] = React.useState(null);
const [error, setError] = React.useState(null);
React.useEffect(() => {
// invalid url will trigger an 404 error
axios.get(`${baseURL}/asdf`).then((response) => {
setPost(response.data);
}).catch(error => {
setError(error);
});
}, []);
if (error) return `Error: ${error.message}`;
if (!post) return "No post!"
return (
<div>
<h1>{post.title}</h1>
<p>{post.body}</p>
</div>
);
}
