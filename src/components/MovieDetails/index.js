import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import CastItems from '../CastItems'

class MoviesDetails extends Component {
  state = {details: {}, isLoading: true, cast: {}}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '2581c66d8acbc83a55280e2cdcb9b34c'
    const imageUrlStart = 'https://image.tmdb.org/t/p/w500/'
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

    const responseDetails = await fetch(detailsUrl)
    const responseCast = await fetch(castUrl)

    const detailsData = await responseDetails.json()
    const castData = await responseCast.json()
    const {cast} = castData
    const formattedDetails = {
      adult: detailsData.adult,
      name: detailsData.original_title,
      image: imageUrlStart + detailsData.poster_path,
      ratings: detailsData.vote_average,
      duration: detailsData.runtime,
      genre: detailsData.genres.map(eachgenre => ({
        id: eachgenre.id,
        name: eachgenre.name,
      })),
      releaseDate: detailsData.release_date,
      overview: detailsData.overview,
      backdropPath: imageUrlStart + detailsData.backdrop_path,
    }

    const formattedCast = cast.map(eachcast => ({
      name: eachcast.original_name,
      character: eachcast.character,
      id: eachcast.id,
      profilePath: eachcast.profile_path,
      profileImage: imageUrlStart + eachcast.profile_path,
    }))
    console.log(cast)

    this.setState({
      details: formattedDetails,
      cast: formattedCast,
      isLoading: false,
    })
  }

  renderData = () => {
    const {details, cast} = this.state
    const {
      adult,
      image,
      name,
      ratings,
      duration,
      genre,
      releaseDate,
      overview,
      backdropPath,
    } = details
    const div = ratings / 2
    const rating = div.toFixed(1)
    const myStyle = {
      backgroundImage: `url(${backdropPath})`,
    }

    const hours = Math.floor(duration / 60)
    const mins = duration % 60

    const genreData = genre.map(each => each.name)
    const joinedGenre = genreData.join('/')

    return (
      <div className="bg-cont-details-cast">
        <div style={myStyle} className="movie-det-con">
          <img src={image} alt={name} className="movi-img" />
          <div className="movie-det-sub-cont">
            <div className="rating-row">
              {adult ? (
                <p className="adult">18+</p>
              ) : (
                <p className="adult">13+</p>
              )}
              <p className="det">{joinedGenre}</p>
              <p className="det">{releaseDate}</p>
              <p className="det">
                {hours}h {mins}min
              </p>
              <div className="rat-co">
                <FaStar className="star" />
                <p className="de-p">{rating}</p>
              </div>
            </div>

            <h1 className="mo-name">{name}</h1>
            <p className="det">{overview}</p>
          </div>
        </div>
        <ul className="cast-ul-cont">
          {cast.map(eachCast => (
            <CastItems key={eachCast.id} castDetails={eachCast} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader" className="loading-cont">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderData()
        )}
      </div>
    )
  }
}
export default MoviesDetails
