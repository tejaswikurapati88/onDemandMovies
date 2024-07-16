import {IoSearchOutline} from 'react-icons/io5'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {movieName: ''}

  onSearchChange = event => {
    this.setState({movieName: event.target.value})
  }

  onSearch = () => {
    const {movieName} = this.state
    if (movieName !== '') {
      const {history} = this.props
      history.push(`/searchMovies/${movieName}`)
    }
  }

  render() {
    const {movieName} = this.state
    return (
      <div className="header-cont">
        <Link className="link" to="/">
          <h1 className="header-name">movieDB</h1>
        </Link>
        <div className="content-cont">
          <Link to="/">
            <button
              onClick={this.changeActive}
              type="button"
              className="nav-buttons"
            >
              Popular
            </button>
          </Link>
          <Link to="/top-rated">
            <button type="button" className="nav-buttons">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming">
            <button type="button" className="nav-buttons">
              Upcoming
            </button>
          </Link>
        </div>

        <div className="search-cont">
          <div className="search-bar-con">
            <input
              type="search"
              onChange={this.onSearchChange}
              value={movieName}
              className="search-bar"
            />
          </div>

          <button
            type="button"
            onClick={this.onSearch}
            className="search-button"
          >
            <IoSearchOutline className="search-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
