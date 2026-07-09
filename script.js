// DOM Elements

let productName = document.getElementById('name'); 
let productID = document.getElementById('ID') ; 
let price = document.getElementById('price') ; 
let taxes = document.getElementById('taxes') ; 
let ads = document.getElementById('ads') ; 
let discount = document.getElementById('discount') ;
let totalPricee = document.getElementById('total-price');
let productCount = document.getElementById('count') ; 
let category = document.getElementById('category') ; 
let createBtn = document.getElementById('create');
let searchInput = document.getElementById('search');
let searchNameBtn = document.getElementById('searchName') ;
let searchCategoryBtn = document.getElementById('searchCategory') ;
let message = document.getElementById('message');
let tabelBody = document.getElementById('tbody');
let alert = document.getElementById('alert')

// need this for update

let mood = 'create';
let indxUpd;


// هنا هعمل حساب لمجموع تكلفه البيع 

function totalPrice(){
  if(price.value == ''){
    totalPricee.innerHTML = '';
    totalPricee.style.backgroundColor = '#4278f7'
 message.querySelector(`img`).src =`https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzJyMzBqcmIzNW1paWlwcmsxdGs4M3oya3V4eHc1OHNzY2I5bWpsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs4qw8hkPShGeanS/giphy.gif`;
        message.querySelector(`p`).textContent = `Please Enter Price To Continue! `
        message.style.display =`flex`
        message.style.backgroundColor = 'red';
        setTimeout(()=>{
             message.style.display =`none`
        }, 4000)
}else{
    totalPricee.style.backgroundColor = 'green';
let result = (price.value - taxes.value - ads.value) - discount.value ;
        totalPricee.innerHTML = '$'+ result;
}
} 


// هنا هحفظ البيانات في Array  Crud => C=> Create

let data = localStorage.product ? JSON.parse(localStorage.product) : [];

createBtn.addEventListener('click' , function(){
         if (price.value != '' && productName.value != '' && productCount.value != '') {
    let newProduct = {
        name: productName.value,
        id: productID.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totalPrice : totalPricee.innerHTML,
        productCount: productCount.value,
        category:category.value
    }
    if(mood === 'create'){
    data.push(newProduct);
    }else{
        data[ indxUpd ] = newProduct;
        createBtn.innerHTML = 'Create Product';
        createBtn.style.backgroundColor = '#4278f7';
    }



  
    localStorage.setItem('product', JSON.stringify(data));
    readData();
    clearData();


    if(mood === 'create'){
        createMessage();
    }else{
    message.querySelector('img').src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWYyYWRvMWxjNWMwcWxmY3NjanFyc281MTE3ajZrOWozMXE0czJuNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AzVmgQHpHX1vmv2oxx/giphy.gif'
    message.querySelector('p').textContent = 'product has been Updated Successfully'
    message.style.backgroundColor = 'green';
    message.style.display = 'flex';
    setTimeout(()=>{
        message.style.display =`none`
    }, 3000)
    }
    
            totalPricee.style.backgroundColor = `#4278f7`;

}else{
    message.querySelector(`img`).src =`https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzJyMzBqcmIzNW1paWlwcmsxdGs4M3oya3V4eHc1OHNzY2I5bWpsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs4qw8hkPShGeanS/giphy.gif`;
        message.querySelector(`p`).textContent = `Please Complete The Informations! `
        message.style.display =`flex`
        message.style.backgroundColor = 'red';
        setTimeout(()=>{
             message.style.display =`none`
        }, 4000)
}
   
  
})



// clear data from input after create

function clearData(){
    productName.value = '';
    price.value = '';
    productCount.value = '';
    productID.value = '';
    taxes.value = '';
    discount.value = '';
    totalPricee.innerHTML = '';
    category.value = '';
    ads.value = '';
};

// Crud => R => Read هنا بق المنتجات تظهر ونشوفها 
   
    function readData(){
         let table = '';
        for(let i =0; i<data.length; i++){
             table += `
             <tr>
                        <th>${data[i].id}</th>
                        <th>${data[i].name}</th>
                        <th>${data[i].category}</th>
                        <th>${data[i].price}</th>
                        <th>${data[i].taxes}</th>
                        <th>${data[i].ads}</th>
                        <th>${data[i].productCount}</th>
                        <th>${data[i].totalPrice}</th>
                        <th><button onclick='updateProduct(${i})'>Update</button></th>
                        <th><button onclick='deleteData(${i})'>Delete</button></th>
                    </tr>
            
            `
            
           
            tabelBody.innerHTML = table;
          let btnDeleteAll =document.getElementById('deleteAll');
            if(data.length > 0 && tabelBody !=''){
                
                btnDeleteAll.innerHTML =`
                <button onclick="deleteAll()"  class="btn-dd">Delete All (${data.length})</button>
                
                `
               
            }else{
                btnDeleteAll.innerHTML = '';
            }

            
            
        }
         if(data.length === 0){
                     tabelBody.innerHTML = '';
                }
    }
    
        readData();




    //   Crud => D=> Delete مسح العناصر

    function deleteData(i){
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    if(data.length === 0) {
        tabelBody.innerHTML = '';
        document.getElementById(`deleteAll`).innerHTML =``;
    }
    readData();
     message.querySelector('img').src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWYyYWRvMWxjNWMwcWxmY3NjanFyc281MTE3ajZrOWozMXE0czJuNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AzVmgQHpHX1vmv2oxx/giphy.gif'
    message.querySelector('p').textContent = 'product have been successfully removed'
    message.style.backgroundColor = 'red';
    message.style.display = 'flex';
    setTimeout(()=>{
        message.style.display =`none`
    }, 3000)
}

function deleteAllmessage(){
     message.querySelector('img').src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWYyYWRvMWxjNWMwcWxmY3NjanFyc281MTE3ajZrOWozMXE0czJuNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AzVmgQHpHX1vmv2oxx/giphy.gif'
    message.querySelector('p').textContent = 'products have been successfully removed'
    message.style.backgroundColor = 'red';
    message.style.display = 'flex';
    setTimeout(()=>{
        message.style.display =`none`
    }, 3000)
}






function createMessage(){
    message.querySelector('img').src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWYyYWRvMWxjNWMwcWxmY3NjanFyc281MTE3ajZrOWozMXE0czJuNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AzVmgQHpHX1vmv2oxx/giphy.gif'
    message.querySelector('p').textContent = 'The product has been successfully added'
    message.style.backgroundColor = 'green';
    message.style.display = 'flex';
    setTimeout(()=>{
        message.style.display =`none`
    }, 3000)
}




// delete all

function deleteAll(){
    localStorage.clear()
    data.splice(0)
    readData();
    document.getElementById(`deleteAll`).innerHTML =``;
    deleteAllmessage()
    clearData();
}




// Crud => U => Update هنا هنعمل الابديت


    function updateProduct(i){
        mood = 'update'
        indxUpd = i; 
        productName.value = data[i].name;
        productID.value = data[i].id;
        productCount.value = data[i].productCount;
        category.value = data[i].category;
        price.value = data[i].price;
        taxes.value = data[i].taxes;
        discount.value = data[i].discount;
        ads.value = data[i].ads;
        totalPrice();
                scroll({
                    top:800,
                    behavior:'smooth'
                })
                createBtn.innerHTML = 'Update';
                createBtn.style.backgroundColor = 'red';

    }






    // Search...........

    let searchMood = 'Title';

    function search(id){
       
        searchInput.focus();
        if(id === 'searchName'){
            searchMood = 'Title'
        }else{
            searchMood = 'Category'  
        }
          searchInput.placeholder = 'Search By ' + searchMood;
        searchInput.value = '';
         readData();
    }
    searchInput.addEventListener('keyup' , searchData);



    // Search Main function اهم فنكشن


    function searchData(){
        let searchValue = searchInput.value.toLowerCase();
        table = '';
        if(searchMood === 'Title'){
            for(let i = 0; i<data.length; i++){
                if(data[i].name.toLowerCase().includes(searchValue)){
                    
                     table += `
                     <tr>
                        <th>${data[i].id}</th>
                        <th>${data[i].name}</th>
                        <th>${data[i].category}</th>
                        <th>${data[i].price}</th>
                        <th>${data[i].taxes}</th>
                        <th>${data[i].ads}</th>
                        <th>${data[i].productCount}</th>
                        <th>${data[i].totalPrice}</th>
                        <th><button onclick='updateProduct(${i})'>Update</button></th>
                        <th><button onclick='deleteData(${i})'>Delete</button></th>
                    </tr>
            
            `   
            }








        }

        }else{
           searchValue = searchInput.value.toLowerCase();
              for(let i = 0; i<data.length; i++){
                if(data[i].category.toLowerCase().includes(searchValue)){
                    
                     table += `
                     <tr>
                        <th>${data[i].id}</th>
                        <th>${data[i].name}</th>
                        <th>${data[i].category}</th>
                        <th>${data[i].price}</th>
                        <th>${data[i].taxes}</th>
                        <th>${data[i].ads}</th>
                        <th>${data[i].productCount}</th>
                        <th>${data[i].totalPrice}</th>
                        <th><button onclick='updateProduct(${i})'>Update</button></th>
                        <th><button onclick='deleteData(${i})'>Delete</button></th>
                    </tr>
            
            `   
            }
        }

            
        }

        tabelBody.innerHTML = table;
    }
 
