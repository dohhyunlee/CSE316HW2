import React from "react"
import Show from "./Show";
import {getShows} from "../api/client";

class ShowList extends React.Component {
    state = {
        shows: [],
    };

    componentDidMount() {
        // You could later expand this to take in the search query term from user input
        this.loadShowsFromServer("Korea");
        setInterval(this.loadTimersFromServer, 5000);
    }

    loadShowsFromServer = (searchQuery) => {
        getShows(searchQuery, (returnedShows) => (
            this.setState( {shows: returnedShows})
        ));
    };

    render() {
        const shows = this.state.shows.map((showInfo) => (
            <Show
                key={showInfo.show.id}
                title={showInfo.show.name}
                language={showInfo.show.language}
                url={showInfo.show.url}
            />
        ));
        return (
            <div id='shows'>
                <h3>Show List:</h3>
                {shows}
            </div>
        );
    }
}

export default ShowList;