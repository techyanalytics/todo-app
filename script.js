
const category=document.getElementById("category")
const filter=document.getElementById("filter")
const form=document.getElementById("expense-form")
const titleinput=document.getElementById("title")
const amountinput=document.getElementById("amount")
const list=document.getElementById("list")
const total=document.getElementById("total1")
let expenses=[] 
let values=JSON.parse(localStorage.getItem("user"))


 getItem()
renderonscreen()


function savedata(){
   localStorage.setItem("data",JSON.stringify(expenses))
}

function getItem(){
  const data=localStorage.getItem("data")
  if(data){
    expenses=JSON.parse(data)
  }
}

form.addEventListener("submit",function(){
  const title=titleinput.value
  const amount=amountinput.value
  
  if (title===""||amount===""||category.value===""){
    alert("please fill the form")
    return;
  }

  const expense={
    id:Date.now(),
    title:title,
    amount:Number(amount),
    category:category.value
  }

  expenses.push(expense)

  console.log(expenses)
  savedata()
 renderonscreen()
 titleinput.value="";
 amountinput.value=""
})


function renderonscreen(listitems=expenses){
  if(expenses.length === 0){
    total.textContent=0
  }


    list.innerHTML=""
    listitems.forEach(function(expense){
      const li=document.createElement("li")
      li.innerHTML=`
      ${expense.title} - ${expense.amount}
      <button onclick="deleteExpense(${expense.id})" id="delete">delete</button>
      `
      list.appendChild(li)

     calculatetotal()
    })  

    
}

filter.addEventListener("change",function(){
  const selector=filter.value;


  if (selector === "All"){
    renderonscreen(expenses)
  }else{
    const filterexpens=expenses.filter((expense)=>{
      return expense.category === selector

    })
    console.log(filterexpens)
    renderonscreen(filterexpens)
  }
})

function calculatetotal(){
  const total=expenses.reduce((sum,num)=>{
    return sum+num.amount
  },0)
console.log(total)
total1.textContent=total
}


function deleteExpense(a){
  
  expenses=expenses.filter((expense)=>{
    return expense.id!==a;
  })
  savedata()
   renderonscreen()

}