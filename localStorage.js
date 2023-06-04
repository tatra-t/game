let scoreMax=0;
let scoreMaxText;

export function addScoreInLocal (score){
    localStorage.setItem("score", score);
}
export function addLocalStorageMax() {
    let a = localStorage.getItem('max');

   /* if (a!==null) {
    scoreMaxText.text = `Score: ${a}`;
    } else {
    localStorage.setItem('max', scoreMax);
}*/
}
export function maxLocalStorage() {
    let a = localStorage.getItem("max");
    let b = localStorage.getItem('score');
    if (b>a) {
      localStorage.removeItem('max');
      localStorage.setItem('max', b);
    }
    
    localStorage.removeItem('score');
    
}
