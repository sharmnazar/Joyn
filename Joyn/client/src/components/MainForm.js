import React, { Component } from 'react'
import "../styles/form.scss"

export default class MainForm extends Component {
  constructor() {
    super();
    this.newForm = React.createRef();
  }


  //form collected the specified type of location and the radiius of distance in meters
  collectFormData = (e) => {
    e.preventDefault();

    let inputType = this.newForm.current.typeInput.value;

    let inputRadius = this.newForm.current.radiusInput.value;

    let newEvent = {
      type: inputType,
      radius: inputRadius
    };

    this.props.submitHandler(newEvent);
  }

  render() {
    return (
      <div>
        <form ref={this.newForm} onSubmit={this.collectFormData} id="newForm">
          <div className="options">
            <label htmlFor="radius"><h5>Radius in Meters</h5></label>
            <input type="number" name="radiusInput" id="radius" min="500" step='500' placeholder="500 meters" />
            <h3 className="labelTag">Activities & Entertainment </h3>
            <div className="entertainment">
              <div className="options__input">
                <input type="radio" name="typeInput" value="bowling_alley" id="bowling" />
                <label htmlFor="bowling" className="options__input--bowling">Bowling</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="movie_theater" id="movie" />
                <label htmlFor="movie" className="options__input--movie">Movie</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="stadium" id="stadium" />
                <label htmlFor="stadium" className="options__input--stadium">Stadium</label>
              </div>
            </div>
            <h3 className="labelTag">Food & Drinks</h3>
            <div className="food">
              <div className="options__input">
                <input type="radio" name="typeInput" value="cafe" id="cafe" />
                <label htmlFor="cafe" className="options__input--cafe">Cafe</label>
              </div>
              <div className="options__input">
                <input name="typeInput" type="radio" value="restaurant" id="restaurant" />
                <label htmlFor="restaurant" className="options__input--restaurant">Restaurant</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="night_club" id="club" />
                <label htmlFor="club" className="options__input--club">Night Life</label>
              </div>
            </div>
            <h3 className="labelTag">Animals & Nature</h3>
            <div className="nature">
              <div className="options__input">
                <input type="radio" name="typeInput" value="aquarium" id="aquarium" />
                <label htmlFor="aquarium" className="options__input--aquarium">Aquarium</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="park" id="park" />
                <label htmlFor="park" className="options__input--park">Park</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="zoo" id="zoo" />
                <label htmlFor="zoo" className="options__input--zoo">Zoo</label>
              </div>
            </div>
            <h3 className="labelTag">Knowledge & Relaxation</h3>
            <div className="relax">
              <div className="options__input">
                <input type="radio" name="typeInput" value="art_gallery" id="artGallery" />
                <label htmlFor="artGallery" className="options__input--artGallery">Art Gallery</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="museum" id="museum" />
                <label htmlFor="museum" className="options__input--museum">Museum</label>
              </div>
              <div className="options__input">
                <input type="radio" name="typeInput" value="spa" id="spa" />
                <label htmlFor="spa" className="options__input--spa">Spa</label>
              </div>
            </div>
          </div>
          <button type="submit" className="submit__button"><h2>SUBMIT</h2></button>
        </form>
      </div>
    )
  }
}

