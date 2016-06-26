         console.log(requestURL.responseXML.documentElement);
/**
*        function to goto a particular URL and perform the operations
*
**/
var url = "https://fortuna.uwaterloo.ca/cgi-bin/cgiwrap/rsic/book/search.html";
var profSection = 'N/A' ;
//var book_section = 'N/A';
var author = 'N/A';
var title = 'N/A';
var sku = '';
var stock = '';
var term;
var department;
var courseNumber;
var sectionNumber;

function loadURL(callback){
    
     // calling a particular URL and sending the data to invoke it futher
     var requestURL = new XMLHttpRequest();
    
     // parameters in order to search a specific value
     var params = "mv_searchspec="+1165+"&mv_searchspec="+department+"&mv_searchspec="+124+"&mv_profile=search_course";
     console.log(params);
     requestURL.open("POST", url, true);
     requestURL.setRequestHeader("Content-Type", "text/html");
     requestURL.setRequestHeader("Access-Control-Allow-Origin", "*");
     requestURL.responseType = "document";
     requestURL.send(params);
     
     var response = requestURL.response;

     if (!response || !response.responseData || !response.responseData.results ||
         response.responseData.results.length === 0) {
       //errorCallback('No response from Google Image search!');
       console.log("Something went wrong");
       callback("HolyShit");
       //return;
     }
      
      console.log("Parsing response");
      profSection = response.getElementsByClassName('book_subsection').getElementsByTagName('h2');
      //bookSection = response.getElementsByClassName('book_section');
      author = response.getElementsByClassName('author');
      title = response.getElementsByClassName('title');
      sku = response.getElementsByClassName('sku');
      price = response.getElementsByClassName('price');
      stock = response.getElementsByClassName('stock');
      //console.log(response) ;

      var books = bookData(book_section , author , title , sku , price, stock);
      console.log(books);
      callback(books);
}

function bookData(book_section , author , title , sku , price, stock ){
  this.profSection = profSection;
  //this.book_section = book_section;
  this.author = author;
  this.title = title;
  this.sku = sku;
  this.price = price;
  this.stock = stock;
}

function  loadURLCall(dept, courseNo, sectionNo, trm){
  console.log("Attempting connection...");
  term = trm;
  department = dept;
  courseNumber = courseNo;
  sectionNumber = sectionNo;

  loadURL(function(books){
      if (books === "HolyShit"){
          console.log("All hell break loose");
          return null;
      }else{
          console.log("Something's in there...hmmm");
          return books;
    }
  }); 
}