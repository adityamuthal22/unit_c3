// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page

// http://www.omdbapi.com/?i=tt3896198&apikey=bf10365b

let movies_div=document.getElementById("movies");
async function searchMovies(){
    try{
        const search=document.getElementById("search").value;
        let res=await fetch(`https://www.omdbapi.com/?s=${search}&apikey=bf10365b`)

        let data =await res.json();
        console.log("data is :",data);

        const movies=data.Search;
    }catch(err){
        console.log("err is:",err)
    }
}

function appendmovies(data){
    movies_div.innerText=null;

    data.map(function(el){
        let p=document.createElement("p")

        p.innerText=el.Title;
        p.addEventListener("click",(event)=>{
            document.querySelector("#movies").value=p.innerText;

            const url=`https://www.omdbapi.com/?apikey=bf10365b&${p.innerText}`;

            fetch(url)
            .then(function(res){
                return res.json();
            })
            .then(function(res){
                appendmovies(res.Search)
                console.log(res)
            })
            .catch(function(err){
                console.log("err is ",err);
            })
        });
        movies_div.append(p);
    });
}

async function main(){
    let data= await searchMovies();
    if(data==undefined){
        return false;
    }
    appendmovies(data);
}

let id;

function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
    id=setTimeout(function(){
        func();
    },delay);
}

function append(data){
    document.querySelector("movies").innerHTML=null;


    let box= document.createElement("div");
    box.setAttribute("id","box1");

    let image=document.createElement(img);
    image.src=data.poster;

    box.append(image);

    document.querySelector("#movies").append(box);
}