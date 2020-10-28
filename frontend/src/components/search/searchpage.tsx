import React from 'react';
import GenreList from './filters/genreList';
import MovieGrid from '../movie/moviegrid';
import { connect } from 'react-redux';
import OrderSelect from './order/orderselect';
import './index.css';
import {Button, CircularProgress} from '@material-ui/core';
import Pager from './pager';
import RuntimeList from './filters/runtimeList';
import LanguageList, { Language } from './filters/languageList';
import tags, { Subtag } from "language-tags";
import OrderDirSelect from './order/orderdirselect';
import SearchBar from './searchbar';
import { AppState } from '../../redux/store';
import { executeSearch } from '../../utils/ajax';
import { setPage } from '../../redux/actions/searchparams';
import { store } from "../../redux/store";

interface SearchPageProps {
    appState : AppState;
}

// Have chosen to make this a Class-component since then we can take use of the componentDidUpdate method
class SearchPage extends React.Component<SearchPageProps, {showFilters : boolean}> {

    filterType : string  = "Genre";
    filterValues : Array<string>  =["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"];
    languageCodes : Array<string> = ["kk" ,"dv" ,"or" ,"ur" ,"it" ,"sd" ,"sa" ,"et" ,"ak" ,"se" ,"bi" ,"ss" ,"bm" ,"am" ,"lb" ,"sv" ,"hr" ,"lo" ,"nb" ,"bs" ,"mk" ,"gu" ,"hz" ,"mo" ,"cr" ,"iu" ,"yo" ,"pl" ,"ht" ,"id" ,"tl" ,"af" ,"wo" ,"ce" ,"fo" ,"sr" ,"th" ,"fr" ,"st" ,"nn" ,"ka" ,"rm" ,"pa" ,"en" ,"mt" ,"ko" ,"bn" ,"fa" ,"mi" ,"tg" ,"te" ,"sl" ,"uk" ,"xx" ,"be" ,"eo" ,"sw" ,"ca" ,"cs" ,"zu" ,"qu" ,"as" ,"ha" ,"sq" ,"gl" ,"az" ,"si" ,"km" ,"ba" ,"el" ,"aa" ,"sn" ,"ay" ,"ty" ,"yi" ,"so" ,"dz" ,"nl" ,"de" ,"ff" ,"fi" ,"lv" ,"tk" ,"ch" ,"kg" ,"sm" ,"la" ,"rw" ,"eu" ,"sh" ,"ne" ,"mr" ,"ta" ,"ln" ,"ru" ,"hu" ,"sk" ,"zh" ,"fy" ,"pt" ,"ja" ,"tr" ,"ml" ,"ab" ,"xh" ,"tt" ,"mn" ,"hi" ,"hy" ,"he" ,"lt" ,"ps" ,"gd" ,"da" ,"ar" ,"no" ,"ms" ,"kn" ,"ro" ,"bg" ,"ku" ,"ky" ,"my" ,"uz" ,"vi" ,"ug" ,"jv" ,"ga" ,"cy" ,"bo" ,"mg" ,"is" ,"mh" ,"cn" ,"es" ,"ti"];
    languageOptions : Array<Language> = this.languageCodes.map(code => {
        const langSubtag : Subtag | null = tags.language(code);
        return {code: code, title: langSubtag == null ? "" : langSubtag.descriptions()[0]};
    });

    constructor(props:SearchPageProps) {
        super(props);
        this.state = {showFilters: false}

    }

    // executes search when component have mounted
    componentDidMount() : void {
        executeSearch(this.props.appState.searchParams);
    }

    // Everytime the searchParams (in redux) have updated (besides loading) it should execute a search
    // This is done by checking if the previous params and current params are not equal to each other
    componentDidUpdate(prevProps : SearchPageProps) : void {
        let prevParams = prevProps.appState.searchParams;
        let currentParams = this.props.appState.searchParams;
        if (prevParams != currentParams && prevParams.loading == currentParams.loading) {

            // If the page haven't been updated, that means it should be reset to 1.
            if (prevParams.page == currentParams.page && currentParams.page != 1) 
                store.dispatch(setPage(1));
            else
                executeSearch(currentParams);
        }
    }

    render() {
        let searchParams = this.props.appState.searchParams;
        let searchResult = this.props.appState.searchResult;
        return (
            <div className="searchPage">
                {this.state.showFilters &&
                    <div className="filterContainer">
                        <GenreList filtertype={this.filterType} filters={this.filterValues}/>
                        <RuntimeList filtertype={"Runtime Minutes"}/>
                        <LanguageList filtertype={"Language"} options={this.languageOptions}/>
                        <div className="orderContainer">
                            <OrderSelect orderValues={this.orderValues} orderLabels={this.orderLabels} defaultValue="voteCount"/>
                            <OrderDirSelect orderDir={searchParams.orderDir} />
                        </div>
                    </div>
                }
                <div className="searchView">
                    <div className="searchPageHeader">
                        <Button className="showFiltersButton" variant="outlined" color="primary"
                                onClick={() => {this.setState({showFilters : !this.state.showFilters})}}>
                            {this.state.showFilters ? "Hide filters" : "Show filters"}
                        </Button>
                        <SearchBar />
                    </div>
                    <Pager />
                    {searchParams.loading ? <CircularProgress size={250}/> : null}
                    <MovieGrid data={ searchParams.loading ? [] : (searchResult?.movies != null ? searchResult.movies : [])}/>
                    <Pager/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state : AppState) : SearchPageProps {
    return { appState: state };
}

export default connect(mapStateToProps)(SearchPage);
