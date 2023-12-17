
"use client"
import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const Posts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePagination = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('User signed out');
      toast(" User Signed Out Successfully ");
      router.push('/'); // Redirect to "/"
    } catch (error) {
      toast(error.message);
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Posts</h1>
      <button 
            className="fixed top-0 right-0 p-4 text-white font-bold px-2 py-2 mx-2 my-2 rounded bg-red-400 text-white"
      onClick={handleLogout}>Logout</button>
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <style jsx>{`
        /* Add your CSS styles here */
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .post {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        .pagination button {
          padding: 8px 16px;
          margin: 0 5px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
        }
        .pagination button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Posts;

