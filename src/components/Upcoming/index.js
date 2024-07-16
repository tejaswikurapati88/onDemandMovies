import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Reference from '../Reference'
import './index.css'

class TopRated extends Component {
  state = {data: [], isLoading: true}

  componentDidMount() {
    this.getUpComingData()
  }

  getUpComingData = async () => {
    const API_KEY = '2581c66d8acbc83a55280e2cdcb9b34c'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const imageUrlStart = 'https://image.tmdb.org/t/p/w500/'
    const response = await fetch(url)
    const data = await response.json()
    const {results} = data
    const formattedData = results.map(eachItem => ({
      adult: eachItem.adult,
      backdropPath: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      originalLanguage: eachItem.original_language,
      originalTitle: eachItem.original_title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      posterPath: eachItem.poster_path,
      posterUrl: imageUrlStart + eachItem.poster_path,
      releaseDate: eachItem.release_date,
      title: eachItem.title,
      video: eachItem.video,
      voteAverage: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    }))
    this.setState({isLoading: false, data: formattedData})
  }

  renderLoader = () => (
    <div data-testid="loader" className="loading-cont">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderDisplayData = () => {
    const {data} = this.state
    return (
      <ul className="data-cont">
        {data.map(eachMovie => (
          <Reference key={eachMovie.id} movie={eachMovie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-popular-cont">
        {isLoading ? this.renderLoader() : this.renderDisplayData()}
      </div>
    )
  }
}
export default TopRated
