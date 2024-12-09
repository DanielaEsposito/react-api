import { useState } from "react";
import { useEffect } from "react";

function App() {
  //API URL
  const apiUrl = import.meta.env.VITE_API_URL;
  //DATI POST
  const categories = ["Snack", "Pasta", "Dolce", "Salato"];
  const possibleTags = [
    "colazione",
    "pranzo",
    "cena",
    "merenda",
    "dolce",
    "pasta",
  ];
  //default post
  const defaultpost = {
    id: "",
    title: "",
    img: "",
    category: "",
    content: "",
    tags: [],
    published: false,
  };
  const [posts, setPosts] = useState([]);

  //console.log(posts);

  const [addPost, setAddPost] = useState(defaultpost);

  // GESTIONE DELL'INVIO DEL FORM
  const handlerFormSubmit = (e) => {
    e.preventDefault();
    fetchCreatePost(addPost);
  };
  // CHIAMATA FETCH PER LA VISUALIZZAZIONE DEI POST
  const fetchPosts = () => {
    fetch(`${apiUrl}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  };

  useEffect(() => {
    fetchPosts();
  });

  //GESTIONE DELL'ONCHANGE DEGLI INPUT
  const handlePostChange = (e) => {
    const newAddPost = {
      ...addPost,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    setAddPost(newAddPost);

    //console.log(addPost.category);
    console.log(newAddPost);
  };
  //console.log(e);

  //GESTIONE DELL'ONCHANGE DEL GRUPPO DI CHACKBOX
  const handleFormTagsChange = (e) => {
    let newTags;
    if (!e.target.checked) {
      newTags = addPost.tags.filter((tag) => tag != e.target.value);
    } else {
      newTags = [...addPost.tags, e.target.value];
    }
    setAddPost({ ...addPost, tags: newTags });
  };

  //FETCH DELETE
  const fetchDeletePost = (id) => {
    fetch(`${apiUrl}/posts` + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
      });
  };
  //FETCH CREATE
  const fetchCreatePost = (data) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res)
      .then((data) => {
        fetchPosts();
      });
  };

  return (
    <>
      <div className="wrapper " data-bs-theme="dark">
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
                        id="post-cateory"
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
                          className=" my-4"
                          checked={addPost.published}
                          type="checkbox"
                          name="published"
                          id="post-published"
                          onChange={handlePostChange}
                        />
                      </div>
                    </div>
                    {/*CHECKBOX TAGS */}
                    <div className="col-3">
                      <label className="form-label ">Tags</label>
                      <div>
                        {possibleTags.map((tag, index) => (
                          <div key={index} className="d-inline-block">
                            <input
                              checked={addPost.tags.includes(tag)}
                              onChange={handleFormTagsChange}
                              type="checkbox"
                              id={`post-tag-${tag}`}
                              name="post-tag"
                              value={tag}
                              className=" mb-3"
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
                {/*CREAZIONE CARDS POSTS*/}
                {posts.map((post) => (
                  <div key={post.id} className="col">
                    <div className="card">
                      <div className="card-img-container">
                        <img
                          src={`http://localhost:3000${post.img}`}
                          className="card-img-top img-fluid img-post"
                          alt=""
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <p>{post.category}</p>
                        <div className="post-tags">
                          <div className="tag ">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="badge me-3 my-2">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            className="btn btn-danger btn-sm delete-button"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal-delete-post-${post.id}`}
                          >
                            elimina
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="modal fade"
                    id={`modal-delete-post-${post.id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Conferma di eliminazione
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          sei sicuro di voler eliminare questo post ?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => fetchDeletePost(post.id)}
                          >
                            Elimina
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Annulla
                          </button>
                        </div>
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
