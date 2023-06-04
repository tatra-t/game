let max;

export function addScoreInLocal (score){
    localStorage.setItem('score', score);
}
export function addLocalStorageMax() {
    if (localStorage.getItem('max')!==null) {
    max = localStorage.getItem('max');
        return max;
    } else{
        localStorage.setItem('max', 0); 
    };
    
}
export function addMaxInLocalStorage() {
    if (+localStorage.getItem('score') > +localStorage.getItem('max')) {
        localStorage.removeItem('max');
        let maxLocal = localStorage.getItem('score');
        localStorage.setItem('max', maxLocal);
        return maxLocal;
    }
}
