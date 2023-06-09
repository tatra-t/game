const LOCAL_STORAGE_KEY = "score";
const LOCAL_STORAGE_MAX_KEY = "max";


export function getMaxScore()  { 
    return localStorage.getItem(LOCAL_STORAGE_MAX_KEY) || 0 ;
   
};


export const resetScore = () => { localStorage.removeItem(LOCAL_STORAGE_KEY) };

export function addScoreInLocal (score){
    localStorage.setItem(LOCAL_STORAGE_KEY, score);
}
export function addMaxInLocalStorage() {
    if (+localStorage.getItem(LOCAL_STORAGE_KEY) > +localStorage.getItem(LOCAL_STORAGE_MAX_KEY)) {
        localStorage.removeItem(LOCAL_STORAGE_MAX_KEY);
        let maxLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
        localStorage.setItem(LOCAL_STORAGE_MAX_KEY, maxLocal);
        return maxLocal;
    }
}















/*export function addScoreInLocal (score){
    localStorage.setItem(LOCAL_STORAGE_KEY, score);
}
export function addLocalStorageMax() {
    if (localStorage.getItem(LOCAL_STORAGE_MAX_KEY)!==null) {
    let max = localStorage.getItem(LOCAL_STORAGE_MAX_KEY);
        return max;
    } else{
        localStorage.setItem(LOCAL_STORAGE_MAX_KEY, 0); 
    };
    
}
export function addMaxInLocalStorage() {
    if (+localStorage.getItem(LOCAL_STORAGE_KEY) > +localStorage.getItem(LOCAL_STORAGE_MAX_KEY)) {
        localStorage.removeItem(LOCAL_STORAGE_MAX_KEY);
        let maxLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
        localStorage.setItem(LOCAL_STORAGE_MAX_KEY, maxLocal);
        return maxLocal;
    }
}*/
