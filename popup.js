//This is an extension to add books to quest

function main() {
	var $courseDetails = $('[class^="PAGROUPDIVIDER"]');
    if($courseDetails.length == 0){
        window.setTimeout(main(),10000);
        return;
    }
    var courses = [];
    var temp = $('[id^="MTG_SECTION"]');
    var section = temp[0].innerText;
    var term = calculateTerm();
    console.log("Successfully got what we wanted");
    for(var i = 0; i < $courseDetails.length; i++ ){
        var spacePos = $courseDetails[i].innerText.indexOf(' ');
        var dept = $courseDetails[i].innerText.slice(0, spacePos);
        var no = $courseDetails[i].innerText.slice(spacePos+1, $courseDetails[i].innerText.indexOf(' ',spacePos+1));
        courses.push(course(dept, no, section, term));
        console.log(courses[i]);
    }

    console.log("Sending the requests");
    var booksPerCourse = [];
    for(var i = 0; i < courses.length; i++){
        var c = courses[i].dept + ' ' + courses[i].no;
        booksPerCourse.push(
            bookData(
                course, 
                loadURLCall(courses[i].dept, courses[i].no, courses[i].section, courses[i].term)));
    }   

    console.log("All data done....");
    console.log(booksPerCourse);
}

function calculateTerm(){
    var temp = $('[id^="DERIVED_REGFRM1_SSR_STDNTKEY_DESCR$"]');
    var termName = temp[0].innerText.slice(0, temp[0].innerText.indexOf(' '));
    var year = temp[0].innerText.slice(temp[0].innerText.indexOf(' ')+1, temp[0].innerText.indexOf(' ',temp[0].innerText.indexOf(' ')+1));
    var yearNo = year.slice(year.length - 2,year.length);
    var season = "0";
    if ( termName.localeCompare( "Winter")){
        season = "1";
    } else if (termName.localeCompare("Spring")){
        season = "5";
    } else {
        season = "9";
    }

    //var term = new string();
    var term = "1"+ yearNo + season;
    return term;
}
/*
function checkQuestPage(callback) {

    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        if (url == "https://quest.pecs.uwaterloo.ca/psp/SS/ACADEMIC/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=HC_SSS_STUDENT_CENTER&EOPP.SCNode=SA&EOPP.SCPortal=ACADEMIC&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER&IsFolder=false") {
            console.log(1);
            callback(true)
        }else{
            console.log(2);
            callback(false);     
        }
    })
};
*/
function course(idept, ino, isection, iterm) {
    var obj = {
        dept : idept,
        no : ino,
        section : isection,
        term : iterm
    }

    return obj;
}

function bookData(Course, books){
  var obj = {
    course : course,
    profSection : books.profSection,
    author : books.author,
    title : books.title,
    sku : books.sku,
    price : books.price,
    stock : books.stock
  }
  /*
  this.course = course;
  this.profSection = books.profSection;
  this.author = books.author;
  this.title = books.title;
  this.sku = books.sku;
  this.price = books.price;
  this.stock = books.stock;*/

  return obj;
}

function getCourseDetails(callback){
    console.log("Attempting to get Course Details");
    //var $courseNames = $('[class^="PAGROUPDIVIDER"]');
    var $courseNames = $('[id^="DERIVED_REGFRM1_DESCR20"]');
    
    while($courseNames.length === 0){
        $courseNames = $('[id^="DERIVED_REGFRM1_DESCR20"]');
    }

    console.log("Success...returning raw details");
    callback($courseNames);
};
main();