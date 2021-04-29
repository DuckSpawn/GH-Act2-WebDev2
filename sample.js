d = document;
xml = d.getElementById("xmldata")
var movieCode, title, director, genre, dateOfRelease, imagePath;  
    
function loadData(){
    
    document.getElementById("search").value = "";
    html = "<table>" + 
    "<tr>" +
        "<th>Movie Code</th>" +
        "<th>Title</th>" +
        "<th>Director</th>" +
        "<th>Genre</th>" +
        "<th>Date of Release</th>" +
        "<th>Action</th>" +
    "</tr>"
    movies = xml.getElementsByTagName("movie");

    for(const movie of movies){
        movieCode = movie.getAttribute("movieCode");
        title = movie.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        director = movie.getElementsByTagName("director")[0].childNodes[0].nodeValue;
        genre = movie.getElementsByTagName("genre")[0].childNodes[0].nodeValue;
        dateOfRelease = movie.getElementsByTagName("dateOfRelease")[0].childNodes[0].nodeValue;
        imagePath = movie.getElementsByTagName("imagePath")[0].childNodes[0].nodeValue;
        
        html+= '<tr onclick="showDetails(' + movieCode + ')">' +
            '<td>' + movieCode + '</td>'+
            '<td>'+ title + '</td>'+
            '<td>' + director +'</td>'+
            '<td>' + genre +'</td>'+
            '<td>' + dateOfRelease +'</td>'+
            '<td><div id="btn" onclick=viewImage(\'' + imagePath + '\'' + ',' + 'event)>View Image</div></td>'+
        '</tr>'
    }

    document.getElementById("output").innerHTML = html + '</table>';
}

function myFunction(search){ 
    search = "\\b" + search.toLowerCase() + "\\b"
    rgxp = new RegExp(search, "g");
    movies = xml.getElementsByTagName("movie");
    html = "<table>" + 
    "<tr>" +
        "<th>Movie Code</th>" +
        "<th>Title</th>" +
        "<th>Director</th>" +
        "<th>Genre</th>" +
        "<th>Date of Release</th>" +
        "<th>Action</th>" +
    "</tr>"
    for(const movie of movies){
        movieCode = movie.getAttribute("movieCode");
        title = movie.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        director = movie.getElementsByTagName("director")[0].childNodes[0].nodeValue;
        genre = movie.getElementsByTagName("genre")[0].childNodes[0].nodeValue;
        dateOfRelease = movie.getElementsByTagName("dateOfRelease")[0].childNodes[0].nodeValue;
        imagePath = movie.getElementsByTagName("imagePath")[0].childNodes[0].nodeValue;
        if(movieCode.toLowerCase().match(rgxp) || title.toLowerCase().match(rgxp) || director.toLowerCase().match(rgxp)
        || genre.toLowerCase().match(rgxp)|| dateOfRelease.toLowerCase().match(rgxp)){
            html+= '<tr onclick="showDetails(' + movieCode + ')">' +
            '<td>' + movieCode + '</td>'+
            '<td>'+ title + '</td>'+
            '<td>' + director +'</td>'+
            '<td>' + genre +'</td>'+
            '<td>' + dateOfRelease +'</td>'+
            '<td><div id="btn" onclick=viewImage(\'' + imagePath + '\'' + ',' + 'event)>View Image</div></td>'+
        '</tr>'
        }
    }
    document.getElementById("output").innerHTML = html + '</table>';
}

function showDetails(moviecode){
    console.log("showdetails");
    html = "";
    movies = xml.getElementsByTagName("movie");
    for (const movie of movies) {
        movieCode = movie.getAttribute("movieCode");
        title = movie.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        director = movie.getElementsByTagName("director")[0].childNodes[0].nodeValue;
        genre = movie.getElementsByTagName("genre")[0].childNodes[0].nodeValue;
        dateOfRelease = movie.getElementsByTagName("dateOfRelease")[0].childNodes[0].nodeValue;
        imagePath = movie.getElementsByTagName("imagePath")[0].childNodes[0].nodeValue;
        if(movieCode == moviecode){
            modal = document.getElementById("modal");
            modal.style.display = "block";
            //idk if transluscent ba or walang background pag showDetails
            modal.style.backgroundColor = "rgb(255, 255, 255, 0)";

            modalContent = document.getElementById("modalContent");
            modal.onclick = closeFunction();

            html = '<label id="title">'+ title + '</label>' +
                '<img id ="imagePath" src="'+ imagePath +'">' +
                '<label id="movieCode">'+ movieCode +'</label>' +
                '<label id="director">'+ director +'</label>'+
                '<label id="genre">'+ genre +'</label>' +
                '<label id="dateOfRelease">'+ dateOfRelease +'</label>' +
                '<div class = "close-btn" onclick="closeFunction()">Close</div>'
        }
        modalContent.innerHTML = html;
        modalContent.style.display = "block";
    }
}

function closeFunction(){
    modal = document.getElementById("modal");
    modalContent = document.getElementById("modalContent");
    closeButton = document.getElementsByClassName("close-btn")[0];

    imgHolder = document.getElementById("imgHolder");
    window.onclick = function(event){
        if(event.target == modal || event.target == closeButton){
            modal.style.display = "none";
            modalContent.style.display = "none";  
            imgHolder.style.display = "none";     
        }
    }
}

function viewImage(imagepath, event){
    modal = document.getElementById("modal");
    modal.style.display = "block";
    modal.style.backgroundColor = "rgb(128, 128, 128, .5)";
    modal.onclick = closeFunction();

    imgHolder = document.getElementById("imgHolder");
    html = '<img id="imgFull" src="'+ imagepath +'">'
    imgHolder.innerHTML = html;
    imgHolder.style.display = "block";
    event.stopPropagation();
}



