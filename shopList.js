    //enter keyboard event
    //delete all
    //print list
    //check for input



        showItems();
        displayItems();

        // you can use keyboard key Enter when typing to enter the item 
        let input = document.getElementById("addProduct");
        
        input.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("addBtn").click();
            }
        });


        let addBtn = document.getElementById("addBtn");

        addBtn.addEventListener("click", function (parameters) {
            let addProduct = document.getElementById("addProduct");
        // to check and validate if there is input 
        if (addProduct.value == "") {
           alert("Please enter an item");
           return false;
        }
       


            // console.log("This is the product value ", addProduct.value);
            let items = localStorage.getItem("items");
            document.getElementById("added").innerHTML = `You added ${addProduct.value}`;
            // check if items - local storage is empty , if it is empty - create array
            if (items == null) {
                itemsObj = [];
            }
            
            // When receiving data from a web server, the data is always a string.
            // Parse the data with JSON.parse(), and the data becomes a JavaScript object.

            // When sending data to a web server, the data has to be a string.
            // Convert a JavaScript object into a string with JSON.stringify().
            else {
                itemsObj = JSON.parse(items);
            }
            
            let storageObj = {
                product: addProduct.value
            }

            itemsObj.push(storageObj);
            // convert the items object into JSON string to save it into the storage
            localStorage.setItem("items", JSON.stringify(itemsObj));
            // saved and then the value gets empty
            addProduct.value = "";

            // console.log(itemsObj);
            showItems();
            displayItems();
        })
    
        function showItems() {
            let items = localStorage.getItem("items")

            if (items == null) {
                itemsObj = [];

            }
            else {
                itemsObj = JSON.parse(items);
            }

            //construct now the items 
            let html = "";

            itemsObj.forEach(function (element, index) {
                html += `
            <div class="card">      
       
            <h2 style="width:100%; height:60%">${element.product}</h2> 
     
            <p><button id = "${index}" onclick="deleteItem(this.id)">
            Delete Item</button></p>
            </div>
   
            `;

            })
            let itemsElement = document.getElementById("items");

            if (itemsObj.length != 0) {
                itemsElement.innerHTML = html;
            }
            else {
                itemsElement.innerHTML = `<h1>ITEMS TO BE ADDED</h1>`;
            }
        };

        function deleteItem(index) {
            let items = localStorage.getItem("items")

            if (items == null) {
                itemsObj = [];
            }
            else {
                itemsObj = JSON.parse(items);
            }
           
            itemsObj.splice(index, 1);
            
            localStorage.setItem("items", JSON.stringify(itemsObj));
            
            document.getElementById("added").innerHTML = `You deleted an item `;


            showItems();
            displayItems();

        }

// To delete all items , check if they want to perform that action for sure
        function deleteAll() {
            if (confirm("Are you sure you want to delete all? ")) {
                localStorage.clear("items");
                showItems();
                displayItems();

            }
            else {
                showItems();
                displayItems();
            }
        }
        // to make the print option
        function displayItems() {
            let items = localStorage.getItem("items")
            if (items == null) {
                itemsObj = [];
            }
            else {
                itemsObj = JSON.parse(items);
            }
            


            // now making the list with checkboxes that the user can check when going into shops
            // column of items because it is updating / loops trough and adds
            let html = "";
            itemsObj.forEach(function (element, index) {
                html += `<p id="values">
                    <input type="checkbox">${element.product}</p>`
            });
            let values = document.getElementById("values")

            if (itemsObj.length != 0) {
                values.innerHTML = html;
            }
            else {
                values.innerHTML = `Not hungry? Not thirsty?`;
            }
        };


        // trying to print the page things
        function print() {
            const shopList = document.getElementById("values").innerHTML;
            // const otherShop = document.getElementById("another").innerHTML;
            const w = window.open();
            
            w.document.write(`<h1>Shopping List: </h1><p>${shopList}</p>`)
            w.print();
            w.close();



        }

        displayItems();
               
 


    
    


  