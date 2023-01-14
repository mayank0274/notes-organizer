    // function call to show notes from local stroage after refresh/reload
    showNotes();
    var addBtn = document.getElementById('addBtn');

    // function to store data in localStorage
    function storingData() {
      let notesData = document.querySelectorAll('textarea');
      let notesTitleData = document.querySelectorAll(".title");
      let notesArr = [];
      let titlesArr = [];
      //  console.log(notesArr)
      notesData.forEach((element) => {
        return notesArr.push(element.value);
      });

      notesTitleData.forEach((element) => {
        return titlesArr.push(element.value)
      })
    //  console.log(titlesArr);
      localStorage.setItem("notes", JSON.stringify(notesArr));

      localStorage.setItem("titles", JSON.stringify(titlesArr));
    }

    // function to add a note
    function addNote(text) {

      var mainDiv = document.createElement('div');
      mainDiv.classList.add('main');

      var noteField = `
      <div class="operation">
<i class="fa-solid fa-eye fa-2x" id="eyeIcon"></i>
      <i class="fa-solid savebtn fa-2x fa-floppy-disk "></i>
      <i class="fa-solid fa-2x editBtn fa-pen-to-square"></i>
      <i class="fa-regular fa-2x delete fa-trash-can"></i>
      </div>
      <input type="text" class="title" placeholder="Enter title"/>
      <textarea class="mainText" placeholder="Enter Notes here"></textarea>
      `;

      mainDiv.insertAdjacentHTML('afterbegin', noteField);
      document.getElementById('NoteSectionLayout').appendChild(mainDiv);

      // references
      var save = mainDiv.querySelector(".savebtn");
      var maintext = mainDiv.querySelector(".mainText");
      var title = mainDiv.querySelector(".title");
      var edit = mainDiv.querySelector(".editBtn");
      var del = mainDiv.querySelector(".delete");
      var view = mainDiv.querySelector("#eyeIcon");
      var overlay = document.querySelector("#overlay");
      var viewContent = document.querySelector("#view_content");
      var close = document.querySelector("#btnClose");
      var titleView = document.querySelector(".title_view");
      
      
      
      // saving note
      save.addEventListener('click', ()=> {
        maintext.setAttribute("disabled", true)
        title.setAttribute("disabled", true)
        storingData();
      });

      // editing note
      edit.addEventListener("click", ()=> {
        maintext.removeAttribute("disabled");
        title.removeAttribute("disabled");
      });

      // delete note
      del.addEventListener("click", ()=> {
        mainDiv.remove();
        storingData();
      });
      
      // view
      view.addEventListener("click",()=>{
        overlay.style.display = "block";
        viewContent.innerText = maintext.value;
        titleView.innerText = title.value;
      })

    // close
    close.addEventListener("click",()=>{
      overlay.style.display = "none";
    })
    }


    // getting data from localStorage
    function showNotes() {
      let notesSavedData = JSON.parse(localStorage.getItem("notes"));
      let titlesSavedData = JSON.parse(localStorage.getItem("titles"));

      if (notesSavedData == null) {
        console.log("No data in local stroage")
 
      } 
      else if (notesSavedData.length != 0) {

        notesSavedData.forEach(function showNotsLSD(element, i) {
          addNote();
          let showMaintextLS = Array.from(document.querySelectorAll(".mainText"))

          showMaintextLS[i].value = notesSavedData[i];
          showMaintextLS[i].setAttribute("disabled", true)

        });

        titlesSavedData.forEach(function showTitleLSD(element, i) {
         //  addNote();
          let showTitleLS = Array.from(document.querySelectorAll(".title"))

         showTitleLS[i].value = titlesSavedData[i];
          showTitleLS[i].setAttribute("disabled", true)
        });
      }

    }


    addBtn.addEventListener('click', addNote)

// search notes

var searchText = document.getElementById('search');
searchText.addEventListener("input",function(){
  let inputVal = searchText.value.toLowerCase();
 let ourNotes = document.querySelectorAll(".main");
 
 Array.from(ourNotes).forEach(function(element){
  var text = element.getElementsByTagName("textarea")[0].value ;
  if(text.includes(inputVal)){
    element.style.display = "block";
  }
  
  else{
    element.style.display = "none";
  }
 });
 })