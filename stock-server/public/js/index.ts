let search = document.querySelector('.search') as HTMLFormElement;
let search_input = document.querySelector('#search') as HTMLInputElement;
let stock_list = document.querySelector('.stock-list') as HTMLElement;


search_input.addEventListener('focus', () => {
   search.classList.add('active');
   stock_list.style.display="block";
});

search_input.addEventListener('blur', () => {
   search.classList.remove('active');
   stock_list.style.display='none';
});

search_input.addEventListener('input', () => {
   let word = getSpecialExp(search_input.value);
   let wordExp = new RegExp(word, 'gi');
   let result = searchList.filter(f=> f.name.match(wordExp));
   getTemplate(result);
});

search.addEventListener('submit', (e)=> {
   e.preventDefault();
   searchStock(searchList.find(f=> f.name === search_input.value).code);
   // let wordExp = new RegExp(search_input.value, 'gi');
   // let result = searchList.filter(f=> f.name.match(wordExp));
   // getTemplate(result);
});

let id = 0;
search.addEventListener('keydown', (e) => {
   if (!(e.code === 'ArrowDown' || e.code === 'ArrowUp' || (id > 0 && e.code === 'Enter'))) return false;
   if (e.code === 'ArrowDown') id = id < searchList.length ? id+1 : 1;
   if (e.code === 'ArrowUp') id = id > 1 ? id-1 : searchList.length;
   let domElements:NodeListOf<HTMLElement> = document.querySelectorAll('.stock-box');
   domElements.forEach(x=> x.classList.remove('active'));
   domElements.forEach(x=> x.dataset.id === `${id}` ? x.classList.add('active') : '');
   search_input.value = searchList[id - 1].name;
});

let template = (stock) => `
   <p class="stock-box" data-id=${stock.id}>
      <span>${stock.name}</span>
   </p>
`;

getTemplate(searchList);

function getTemplate(list) {
   stock_list.innerHTML = list.map(m=> template(m)).join('');
}

function getSpecialExp(word){
   let spacialExp = new RegExp(/[\[\]!@#\$%\^&\*\(\)\-_\+=~`₩<>\?\/\.,'":;]/, 'gi');
   let searchIdx = word.search(spacialExp);
   if(searchIdx === -1) return word;
   else return word.replace(spacialExp, '\\$&');
}

let es = new EventSource('/sse');
es.addEventListener('message', e => {
   let data = JSON.parse(e.data);
   if(!data.success) {
      alert("장 마감");
      return false;
   }
   let StockList = data.StockList;
   let prices = StockList.map(m => m.price).slice(StockList.length < 600 ? 0: StockList.length - 600, StockList.length);


   let middle = StockList.map(m=> m.price).reduce((init, current) => init + current, 0);
   console.log(middle);
   
   let times = StockList.map(m => new Date(m.time)).slice(StockList.length < 600 ? 0: StockList.length - 600, StockList.length);
   let name = StockList[0].name;
   let hv = middle + 2000;
   let lv = middle - 2000;
   drawChart(prices, times, name, times[0], times[times.length-1], hv, lv);
});