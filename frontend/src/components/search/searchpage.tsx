import React, { useEffect } from 'react';
import FilterList from '../filters/filterlist';
import MovieGrid from '../movie/moviegrid';
import { useDispatch, useSelector } from 'react-redux';
import OrderSelect from './orderselect';
import './index.css';
import { CircularProgress } from '@material-ui/core';
import Pager from './pager';
import { Dispatch } from '@reduxjs/toolkit';
import FilterRange from '../filters/filterrange';
import FilterSelect, { Language } from '../filters/filterselect';
import tags, { Subtag } from "language-tags";
import OrderDirSelect from './orderdirselect';
import SearchBar from './searchbar';
import { SearchResult } from '../../redux/reducers/searchresult';
import { executeSearch, SearchParams } from '../../redux/reducers/searchparams';
import { AppState } from '../../redux/store';

const SearchPage : React.FunctionComponent = () => {

    const searchResult : SearchResult | null = useSelector((state : AppState) => state.searchResult);
    const searchParams : SearchParams = useSelector((state : AppState) => state.searchParams);
    const dispatch : Dispatch<any> = useDispatch();

    /* Dummy data, to be given by props */
    const filterType : string  = "Genre";
    const filterValues : Array<string>  =["Action", "Adventure", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"];
    
    const orderLabels : Array<string>  = ["Relevance", "Title", "Release Year", "Runtime Minutes", "Vote Average", "Vote Count"];
    const orderValues : Array<string>  = ["relevance", "primaryTitle", "startYear", "runtimeMinutes", "voteAverage", "voteCount"];

    let languageCodes : Array<string> = ["kk" ,"dv" ,"or" ,"ur" ,"it" ,"sd" ,"sa" ,"et" ,"ak" ,"se" ,"bi" ,"ss" ,"bm" ,"am" ,"lb" ,"sv" ,"hr" ,"lo" ,"nb" ,"bs" ,"mk" ,"gu" ,"hz" ,"mo" ,"cr" ,"iu" ,"yo" ,"pl" ,"ht" ,"id" ,"tl" ,"af" ,"wo" ,"ce" ,"fo" ,"sr" ,"th" ,"fr" ,"st" ,"nn" ,"ka" ,"rm" ,"pa" ,"en" ,"mt" ,"ko" ,"bn" ,"fa" ,"mi" ,"tg" ,"te" ,"sl" ,"uk" ,"xx" ,"be" ,"eo" ,"sw" ,"ca" ,"cs" ,"zu" ,"qu" ,"as" ,"ha" ,"sq" ,"gl" ,"az" ,"si" ,"km" ,"ba" ,"el" ,"aa" ,"sn" ,"ay" ,"ty" ,"yi" ,"so" ,"dz" ,"nl" ,"de" ,"ff" ,"fi" ,"lv" ,"tk" ,"ch" ,"kg" ,"sm" ,"la" ,"rw" ,"eu" ,"sh" ,"ne" ,"mr" ,"ta" ,"ln" ,"ru" ,"hu" ,"sk" ,"zh" ,"fy" ,"pt" ,"ja" ,"tr" ,"ml" ,"ab" ,"xh" ,"tt" ,"mn" ,"hi" ,"hy" ,"he" ,"lt" ,"ps" ,"gd" ,"da" ,"ar" ,"no" ,"ms" ,"kn" ,"ro" ,"bg" ,"ku" ,"ky" ,"my" ,"uz" ,"vi" ,"ug" ,"jv" ,"ga" ,"cy" ,"bo" ,"mg" ,"is" ,"mh" ,"cn" ,"es" ,"ti"];
    let languageOptions : Array<Language> = languageCodes.map(code => {
        const langSubtag : Subtag | null = tags.language(code);
        return {code: code, title: langSubtag == null ? "" : langSubtag.descriptions()[0]};
    });

    useEffect(() => {
        executeSearch(searchParams);
    }, []);

    return (
        <div className="moviePage">
            <FilterList filtertype={filterType} filters={filterValues}/>
            <FilterList filtertype={"18+"} filters={["Enable"]}/>
            <FilterRange filtertype={"Runtime Minutes"} />
            <FilterSelect filtertype={"Language"} options={languageOptions}/>
            <div className="movieView">
                <div className="movieViewHeader"> 
                    <SearchBar />
                    <OrderSelect orderValues={orderValues} orderLabels={orderLabels} defaultValue="voteCount"/>
                    <OrderDirSelect orderDir={searchParams.orderDir} />
                </div> 
                <Pager />
                {searchParams.loading ? <CircularProgress size={250}/> : null}
                <MovieGrid data={ searchParams.loading ? [] : (searchResult?.movies != null ? searchResult.movies : [])}/>
            </div>
        </div>
    );
};
export default SearchPage;