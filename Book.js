const inputText = document.getElementById('input-text');
const errorMassage = document.getElementById('error-massage');
const foundBookNamber = document.getElementById('founded-book-namber');
const searchResult = document.getElementById('search-result');
const spinner = document.getElementById('spiner')

//Function: After click button this  will work 

const button = () =>{
  errorMassage.textContent ='';
  foundBookNamber.textContent = '';
  searchResult.textContent = '';
  const  inputTextvalue = inputText.value
  spinner.classList.remove('d-none')
  if(inputTextvalue.length === 0){
      errorMassage.innerHTML =
      "<h5 class='text-center text-white p-3 bg-danger'><b>Please enter a  book Name...</b></h5>";
      spinner.classList.add('d-none')
  }
  else{
      const url = `https://openlibrary.org/search.json?q=${inputTextvalue}`
      fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data))
    }
}

 // --- Function: Show Result's Number of Matched 
const showResultNam = (number) =>{
  if( number === 0){
    errorMassage.innerHTML =
    "<h5 class='text-center text-white p-3 bg-info'><b>No Result Found</b></h5>";
  }
  else{
    foundBookNamber.innerHTML =`
    <h4 class='text-center text-white p-3 m-3 bg-info'>${number} result Found</h4>
   
    `
  }
}

// --- Function:  Writer name
const writerName = (name)=>{
  if(name.author_name === undefined){
    return 'Author Not Avilable';
  }
  else{
    return `Author: ${name.author_name[0]}` ;
  }
}

// --- Function:  Publisher name
const publishName= (namber) =>{
  if(namber.publisher === undefined){
    return ' Publisher Not Avilable';
  }
  else{
    return `Publisher: ${namber.publisher[0]}`;
  }
}

 // --- Function:  Publish Year
const publishedDate = (date) =>{
  if(date.first_publish_year === undefined){
    return 'Publish date Not Avilable'
  }
  else{
    return `First Publish year: ${date.publish_year[0]}`
  }
}

//---- Function : Display Search Result in card

const displaySearchResult =  books =>{
  inputText.value ='';
  showResultNam(books.numFound);
  const slice = books.docs.slice(0,20)
  spinner.classList.add('d-none');
 ///-----For loop
 slice.forEach(book => {
  
    const div = document.createElement('div')
    div.classList.add('col')
      div.innerHTML =`
        <div class="card shadow mx-auto" style="height: 500px; width: 350px" >
           <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto d-flex p-2"   alt="..." >
           <div class="card-body d-flex flex-column justify-content-center">
           <h6 class="card-title text-center">Name: ${book.title}</h6>
           <p class="card-title text-center">${writerName(book)}</p>
           <p class="card-title text-center">${publishName(book)}</p>
           <p class="card-title text-center">${publishedDate(book) }</p>
           </div>
       </div>
         `
    searchResult.appendChild(div);
 });  
}
 