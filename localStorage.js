let max;

export function addScoreInLocal (score){
    localStorage.setItem("score", score);
}
export function addLocalStorageMax() {
    if (localStorage.getItem('max')!==null) {
    max = localStorage.getItem('max');
        console.log(max);
    } else{
        localStorage.setItem('max', 0); 
    };
    
   /* if (a!==null) {
    scoreMaxText.text = `Score: ${a}`;
    } else {
    localStorage.setItem('max', scoreMax);
}*/
}
export function maxLocalStorage() {
    if (localStorage.getItem('score') > localStorage.getItem("max")) {
        console.log(localStorage.getItem('score'));
        console.log(localStorage.getItem('max'));
        localStorage.removeItem('max');
        localStorage.setItem('max', localStorage.getItem('score'));
    }


    /*let a = localStorage.getItem("max");
    let b = localStorage.getItem('score');
    if (b>a) {
      localStorage.removeItem('max');
      localStorage.setItem('max', b);
    }*/
}
