import { 
    clearSearchText, setSearchFocus, showClearTextButton, clearPushListener
} from "./searchBar.js";
import { 
    buildSearchResults, clearStatsLine, setStatsLine, deleteSearchResults 
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResult } from "./dataFunctions.js";


document.addEventListener('readystatechange', e => {
    // this event occurs when the page has loaded everything
    if(e.target.readyState == 'complete') {
         initApp();
    }
});


const initApp = () => {
    setSearchFocus();
    // key typing event
    const search = document.getElementById('search');
    search.addEventListener('input', showClearTextButton);

    // 
    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearSearchText);

    //
    clear.addEventListener('keydown', clearPushListener);

    // 3 event listener clear text
    const form = document.getElementById('searchBar');
    form.addEventListener('submit', subtmitTheSearch);
}


// Procedural workflow fn
const subtmitTheSearch = e => {
    e.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
}


//  Procedural
const processTheSearch = async () => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retrieveSearchResult(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
};