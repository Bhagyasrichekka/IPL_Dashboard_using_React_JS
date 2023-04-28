import {Component} from 'react'
import Loader from 'react-loader-spinner'

class TeamMatches extends Component {
  state = {teamMatchesList: [], isLoading: true}

  componentDidMount = () => {
    this.getTeamMatchesList()
  }

  getformattedData = data => ({
    teamBannerUrl: data.team_banner_url,
    recentMatches: data.recent_matches,
    latestMatchDetails: data.latest_match_details,
  })

  getTeamMatchesList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = this.getformattedData(data)
    console.log(formattedData)
    this.setState({teamMatchesList: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, teamMatchesList} = this.state
    const {teamBannerUrl} = teamMatchesList
    return isLoading ? (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="bg">
        <img src={teamBannerUrl} alt="team banner" />
      </div>
    )
  }
}

export default TeamMatches
