import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

class Reference extends Component {
  render() {
    const {movie} = this.props
    const {title, posterUrl, voteAverage, id} = movie
    const div = voteAverage / 2
    const rating = div.toFixed(1)

    return (
      <li className="movie-item">
        <div className="movie-cont">
          <img className="poster-img" src={posterUrl} alt={title} />
          <div className="cont">
            <div className="title-cont">
              <p className="movie-name">{title}</p>
              <div className="rat-co-co">
                <FaStar className="star" />
                <p className="movie-rating">{rating}</p>
              </div>
            </div>
            <Link to={`/movie-details/${id}`} className="but-cont">
              <button className="view-details-button" type="button">
                Veiw Details
              </button>
            </Link>
          </div>
        </div>
      </li>
    )
  }
}

export default Reference
