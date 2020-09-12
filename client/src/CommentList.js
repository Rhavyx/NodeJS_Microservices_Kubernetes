import React, {useState, useEffect} from 'react';
/* import axios from 'axios'; */

export default ({comments}) => {
  /*   const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://127.0.0.1:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  }; */

  /*   useEffect(() => {
    fetchData();
  }, []); */

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'pending') {
      content = 'Comentario aguardando por moderacao';
    }
    if (comment.status === 'reject') {
      content = 'Comentario rejeitado';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
