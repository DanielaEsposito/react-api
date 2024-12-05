import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { useEffect } from "react";

function App() {
  const categories = ["Snack", "Pasta", "Dolce", "Salato"];
  const [addPost, setAddPost] = useState({
    id: "",
    title: "",
    img: "",
    category: "",
    content: "",
    tags: [],
    published: false,
  });
  const [posts, setPosts] = useState([]);
  const tags = ["colazione", "pranzo", "cena", "merenda", "dolce", "pasta"];

  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  };

  useEffect(() => {
    fetchPosts();
  });

  const handlePostChange = (e) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const newAddPost = {
      ...addPost,
      [e.target.name]: newValue,
    };
    setAddPost(newAddPost);
    //console.log(addPost.category);
    console.log(newAddPost);
  };
  //console.log(e);
  const handleFormTagsChange = (e) => {
    let newTags;
    if (!e.target.checked) {
      newTags = addPost.tags.filter((tag) => tag != e.target.value);
    } else {
      newTags = [addPost.tags, e.target.value];
    }
    setAddPost({ ...addPost, tags: newTags });
  };
  const handlerFormSubmit = (e) => {
    e.preventDefault();
    // fetch("http://localhost:3000/posts", {
    //   method: "POST",
    //   Body: JSON.stringify({ username: "example" }),
    // })
    //   .then((res) => res.json)
    //   .then((data) => {
    //   });
    const newPosts = [...posts, addPost];
    setPosts(newPosts);
    setAddPost("");
    //creazione dei post
  };
  // useEffect(() => {
  //   checked === true ? alert("stai ") : "";
  // });
  const handlerDeletePost = (id) => {
    fetch("http://localhost:3000/posts/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  };

  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="container">
            <h1>Blog</h1>
          </div>
        </header>
        <main>
          <section className="posts py-4">
            <div className="container">
              <div className="form-container">
                {/*FORM INPUT  */}
                <form onSubmit={handlerFormSubmit}>
                  {/*INPUT TITLE */}
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="title" className="form-label">
                        Titolo
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        id="title"
                        value={addPost.title}
                        onChange={handlePostChange}
                      />
                    </div>
                    {/*INPUT IMG */}
                    <div className="col-3">
                      <label htmlFor="post-img" className="form-label">
                        Immagine
                      </label>
                      <input
                        className="form-control mb-4"
                        type="text"
                        name="img"
                        id="post-img"
                        value={addPost.img}
                        onChange={handlePostChange}
                      />
                    </div>
                    {/*INPUT CONTENT */}
                    <div className="col-3">
                      <label htmlFor="post-content" className="form-label">
                        Contenuto
                      </label>
                      <textarea
                        className="form-control mb-3"
                        name="content"
                        id="post-content"
                        value={addPost.content}
                        onChange={handlePostChange}
                      ></textarea>
                    </div>
                    {/*SELECT CATEGORY*/}
                    <div className="col-3">
                      <label htmlFor="post-category" className="form-label">
                        Categorie
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="category"
                        onChange={handlePostChange}
                      >
                        <option value="">Seleziona una categoria</option>
                        {categories.map((categoryName, index) => (
                          <option key={index} value={categoryName}>
                            {categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/*CHECKBOX PUBLISHED */}
                    <div className="col-3">
                      <label htmlFor="post-published" className="form-label ">
                        Published
                      </label>
                      <div>
                        <input
                          className=" mb-3"
                          checked={addPost.published}
                          type="checkbox"
                          name="published"
                          id="post-published"
                          onChange={handlePostChange}
                        />
                      </div>
                    </div>
                    {/*CHECKBOX TAGS */}
                    <div className="col-6">
                      <label className="form-label ">Tags</label>
                      <div>
                        {tags.map((tag, index) => (
                          <div key={index} className="d-inline-block">
                            <input
                              className=" mb-3"
                              checked={addPost.tags.includes(tag)}
                              type="checkbox"
                              name="post-tag"
                              value={tag}
                              id={`post-tag-${tag}`}
                              onChange={handleFormTagsChange}
                            />
                            <label className="m-3" htmlFor={`post-tag-${tag}`}>
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary">Cerca</button>
                </form>
              </div>
            </div>
          </section>
          <section className="post-list">
            <div className="container">
              <h2 className="post-list-title"> Post List</h2>
              <div className="row row-cols-3 g-4">
                {posts.map((post) => (
                  <div key={post.title} className="col">
                    <div className="card">
                      <div className="card-img-container">
                        <img
                          src={post.img}
                          className="card-img-top img-fluid img-post"
                          alt=""
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <p>{post.category}</p>
                        <span className="delete-button">
                          <i
                            className="fa-solid fa-trash-can fa-sm delete"
                            onClick={() => handlerDeletePost(post.id)}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
