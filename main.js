class PhotoGallary {
    constructor(){
        this.api_key = '563492ad6f9170000100000120d9b650553f4feead891d9518cab46c';
        this.glarydiv = document.querySelector('.contentdiv');
        this.search = document.querySelector('.heder form');
        this.redmore = document.querySelector('#redmore');
        this.logo = document.querySelector('#logo');
        this.pageindex = 1;
        this.searchValueG = '';
        this.eventhandel();
    }
    eventhandel(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1);
        });
        this.search.addEventListener('submit', (e)=>{
            this.pageindex = 1;
            this.getSearchImgs(e);
        });
        redmore.addEventListener('click', (e)=>{
            this.ReadMore(e);
        });
        this.logo.addEventListener('click', () => {
        this.pageindex = 1;
        this.glarydiv.innerHTML = ' ';
        this.getImg(this.pageindex);
        })
    }
   async getImg(index){
    this.redmore.setAttribute('data-ing', 'curated');
        let baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
      let data = await this.feachImgs(baseURL);
      this.genarethtml(data.photos);
      console.log(data);
    }
    async feachImgs(baseURL){
        let respons = await fetch(baseURL,{
            method: 'GET',
            headers:{
                Accept: 'application/json',
                Authorization: this.api_key
            }
        });
        let data = await respons.json();
        return data;
    }
    genarethtml(photos){
        photos.forEach(photo => {
            let item = document.createElement('div');
            item.classList.add('items');
            item.innerHTML = `
            <img src="${photo.src.medium}" alt="imeg" id="img">
            <div class="potografardiv">
             <p id="fhotogname">${photo.photographer}</p>
             </div>
            `;
            this.glarydiv.appendChild(item);
        });
    }
     async getSearchImgs(e){
         this.redmore.setAttribute('data-img', 'search');
        e.preventDefault();
        this.glarydiv.innerHTML = ' ';
        let searchValue = e.target.querySelector('input').value;
        this.searchValueG = searchValue;
        let baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
        let data = await this.feachImgs(baseURL);
        this.genarethtml(data.photos);
        e.target.reset();
    }
    async getsearchmoresearchimg(index){
        let baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueG}&page=${index}&per_page=12`;
        let data = await this.feachImgs(baseURL);
        this.genarethtml(data.photos);
    }
    ReadMore(e){
        let index = ++this.pageindex;
        let lodemordata = e.target.getAttribute('data-img');
        if(lodemordata === 'curated'){
            this.getImg(index);
        }else{
            this.getsearchmoresearchimg(index);
        }
    }
}

let galary = new PhotoGallary;

