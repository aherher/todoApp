const inputTxt = document.querySelector(".inputTxt")
const addBtn = document.querySelector(".addBtn")
const listWrap = document.querySelector(".listsWrap")
const defaultEdit = document.querySelectorAll(".editBtn")
const defaultDelete = document.querySelectorAll(".deleteBtn")
const defaultInput = document.querySelectorAll(".listsWrap input")
let todoInputer

// 수정기능
function editingFunction(editHTML, input, target) {
  if (editHTML == "EDIT") {
    input.removeAttribute("readonly") //readonly 속성 삭제
    input.focus() //인풋창에 포커스
    input.classList.add("focus")
    target.innerHTML = "SAVE"
  } else {
    input.setAttribute("readonly", "readonly")
    target.innerHTML = "EDIT"
    input.classList.remove("focus")
  }
}

// 수정 후 엔터키
function enterEdit(enterTarget, enterKey, nextBtn) {
  if (enterKey) {
    enterTarget.setAttribute("readonly", "readonly")
    nextBtn.innerHTML = "EDIT"
    enterTarget.classList.remove("focus")
  }
}

//리스트 입력 기능
function doInputing() {
  let inputValue = inputTxt.value
  if (inputValue == "") {
    //입력내용이 없을 때
    alert("내용을 입력하세요")
  } else {
    const todo = document.createElement("li") //li 추가
    todoInputer = document.createElement("input") //li 안에 텍스트인풋 추가 (수정할 수 있게)
    todoInputer.type = "text"
    todoInputer.setAttribute("readonly", "readonly") //readonly 속성 부여
    todoInputer.value = inputValue

    const deletBtn = document.createElement("button") //삭제버튼 생성
    deletBtn.classList.add("deleteBtn")
    deletBtn.innerHTML = "DELETE"

    deletBtn.addEventListener("click", function (e) {
      //삭제기능
      const parent_li = e.target.closest("li")
      parent_li.remove()
    })

    const editBtn = document.createElement("button")
    editBtn.classList.add("editBtn")
    editBtn.innerHTML = "EDIT"

    editBtn.addEventListener("click", function (e) {
      //수정기능
      let editing = e.target.innerHTML
      let editingHTML = e.target
      editingFunction(editing, todoInputer, editingHTML)
    })

    //수정 후 엔터키
    todoInputer.addEventListener("keyup", function (e) {
      const newKey = e.keyCode == 13 //키코드 확인하기. 13은 엔터키
      const newBtn = e.target.closest("li").querySelector(".editBtn")
      const newTarget = e.target
      enterEdit(newTarget, newKey, newBtn)
    })

    todo.appendChild(todoInputer)
    todo.appendChild(editBtn)
    todo.appendChild(deletBtn)
    listWrap.appendChild(todo)
  }
}

addBtn.addEventListener("click", () => {
  doInputing()
})

defaultEdit.forEach((edit) => {
  edit.addEventListener("click", (e) => {
    let editor = e.target.innerHTML
    let innerInput = e.target.closest("li").querySelector("input")
    let targetBtn = e.target
    //수정기능
    editingFunction(editor, innerInput, targetBtn)
  })
})

defaultDelete.forEach((deleting) => {
  deleting.addEventListener("click", (e) => {
    let delet_il = e.target.closest("li")
    delet_il.remove()
  })
})

defaultInput.forEach((item) => {
  item.addEventListener("keyup", (e) => {
    const theKey = e.keyCode == 13 //키코드 확인하기. 13은 엔터키
    const innerBtn = e.target.closest("li").querySelector(".editBtn")
    const thisTarget = e.target
    enterEdit(thisTarget, theKey, innerBtn)
  })
})
