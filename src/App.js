import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Popular from './components/Popular'
import Upcoming from './components/Upcoming'
import TopRated from './components/TopRated'
import NotFound from './components/NotFound'
import MovieDetails from './components/MovieDetails'
import SearchMovie from './components/SearchMovie'
import './App.css'

// write your code here
const App = () => (
  <div className="bg-container">
    <Header />
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie-details/:id" component={MovieDetails} />
      <Route exact path="/searchMovies/:movieName" component={SearchMovie} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
