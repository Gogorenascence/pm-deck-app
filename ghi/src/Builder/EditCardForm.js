import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../Store";

function EditCardForm(props) {
  const [state] = useContext(Context);
  const location = useLocation();
  const card_id = location.state["id"];
  const name = location.state["name"];
  const card_class = location.state["card_class"];
  const hero_id = location.state["hero_id"];
  const series_name = location.state["series_name"];
  const card_number = location.state["card_number"];
  const enthusiasm = location.state["enthusiasm"];
  const effect_text = location.state["effect_text"];
  const second_effect_text = location.state["second_effect_text"];
  const illustrator = location.state["illustrator"];
  const picture_url = location.state["picture_url"];
  const file_name = location.state["file_name"];
  const card_type = location.state["card_type"];
  const extra_effects = location.state["extra_effects"];
  const reactions = location.state["reactions"];
  const card_tags = location.state["card_tags"];
  const [card, setCard] = useState({
    name: name,
    card_class: card_class,
    hero_id: hero_id,
    series_name: series_name,
    card_number: card_number,
    enthusiasm: enthusiasm,
    effect_text: effect_text,
    second_effect_text: second_effect_text,
    illustrator: illustrator,
    picture_url: picture_url,
    file_name: file_name,
    card_type: card_type,
    extra_effects: extra_effects,
    reactions: reactions,
    card_tags: card_tags,
  });

  useEffect(() => {
    setCard({ ...card});
  }, []);

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...card };
    const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(cardUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setCard({
    name: "",
    card_class: "",
    hero_id: "",
    series_name: "",
    card_number: "",
    enthusiasm: "",
    effect_text: "",
    second_effect_text: "",
    illustrator: "",
    picture_url: "",
    file_name: "",
    card_type: [],
    extra_effects: [],
    reactions: [],
    card_tags: [],
      });
      window.location.href = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`;
    } else {
      console.error("Error in updating cardv ");
    }
  };

  return (
    <div className="container">
      <div className="row"></div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <img className="edit-review-image" alt="Album Cover" src={image} />
          <h1>Card:</h1>
          <h1>{name}</h1>
          <form onSubmit={handleSubmit} id="create-review-form">
            <div className="mb-3"></div>
            <p>Album Rating</p>
            <div className="form-check form-check-inline">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="rating"
                id="rating1"
                value={1}
              />
              <label className="form-check-label" htmlFor="rating1">
                1
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="rating"
                id="rating2"
                value={2}
              />
              <label className="form-check-label" htmlFor="rating2">
                2
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="rating"
                id="rating3"
                value={3}
              />
              <label className="form-check-label" htmlFor="rating3">
                3
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="rating"
                id="rating4"
                value={4}
              />
              <label className="form-check-label" htmlFor="rating4">
                4
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                onChange={handleChange}
                className="form-check-input"
                type="radio"
                name="rating"
                id="rating5"
                value={5}
              />
              <label className="form-check-label" htmlFor="rating5">
                5
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={review.title}
                placeholder="Review Title"
                name="title"
                id="title"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="title">Review Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="content">Review Content</label>
              <textarea
                onChange={handleChange}
                rows="8"
                required
                type="text"
                name="content"
                id="content"
                className="form-control"
                value={review.content}
              ></textarea>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={review.best_song}
                id="best_song"
                name="best_song"
                className="form-select"
              >
                <option value="">Best song</option>
                {tracks?.map((song) => {
                  return (
                    <option key={song.id} value={song.name}>
                      {song.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={review.worst_song}
                id="worst_song"
                name="worst_song"
                className="form-select"
              >
                <option value="">Worst song</option>
                {tracks?.map((song) => {
                  return (
                    <option key={song.id} value={song.name}>
                      {song.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCardForm;
