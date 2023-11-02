const inputKeyName = document.querySelector(".input-key");
const inputImage = document.querySelector(".input-image");
const inputInfo = document.querySelector(".input-info");
const inputPrice = document.querySelector(".input-price");
const inputSubmit = document.querySelector(".input-submit");

const mainGridContainer = document.querySelector(".main-grid-container");
const sectionFlexContainer = document.querySelector(".section-flex-container");

const flexItemStart = document.querySelector(".flex-item-start");
const flexItemEnd = document.querySelector(".flex-item-end");

const keyTitle = document.querySelector(".key-title");
const keyImage = document.querySelector(".key-image");
const keyInfo = document.querySelector(".key-info");
const keyPrice = document.querySelector(".key-price");
const keyButton = document.querySelector(".key-button");

let selectedKeys = [];


inputSubmit.addEventListener("click", function addNewKey(event){

    if(inputImage.checkValidity()){
        let valueKeyName = inputKeyName.value;
        let valueImage = inputImage.value;
        let valueInfo = inputInfo.value;
        let valuePrice = inputPrice.value;


        if(valueKeyName && valueImage && valueInfo && valuePrice){
            createNewCard(valueKeyName,valueImage,valueInfo,valuePrice)
            event.preventDefault();
        }else{
            console.log("Completa todos los inputs");
        }
    }else{
        console.log("URL de imagen no valida")

    }
});


const createNewCard = (valueKeyName,valueImage,valueInfo,valuePrice)=>{
    const section = document.createElement("section");
    const divStart = document.createElement("div");
    const divEnd = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const info = document.createElement("p");
    const price = document.createElement("label");
    const button = document.createElement("button");

    section.classList.add("section-flex-container");
    divStart.classList.add("flex-item-start");
    divEnd.classList.add("flex-item-end");
    title.classList.add("key-title");
    image.classList.add("key-image");
    info.classList.add("key-info");
    price.classList.add("key-price");
    button.classList.add("key-button");
    button.classList.add("button-green");

    title.textContent = valueKeyName;
    image.setAttribute("src",valueImage);
    info.textContent = valueInfo;
    price.textContent = `${valuePrice} USD`;
    button.textContent = `BUY`;

    section.appendChild(divStart);
    section.appendChild(divEnd);
    divStart.appendChild(title);
    divStart.appendChild(image);
    divEnd.appendChild(info);
    divEnd.appendChild(price);
    divEnd.appendChild(button);

    mainGridContainer.appendChild(section);
};



const shoppingCart = document.querySelector(".shopping-cart");
const cartFlexContainer = document.querySelector(".cart-flex-container");
const cartItemContainer = document.querySelector(".cart-item-container");

const cartKeyTitle = document.querySelector(".cart-key-title");
const cartKeyPrice = document.querySelector(".cart-key-price");
const cartKeyImage = document.querySelector(".cart-key-image");


mainGridContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("key-button")){

        const buttonPressed = event.target;
        const selectedItem = buttonPressed.parentElement.parentElement;

        if(selectedKeys.includes(selectedItem)){
            const elementToRemove = cartFlexContainer.children[selectedKeys.indexOf(selectedItem)]
            cartFlexContainer.removeChild(elementToRemove)
            
            selectedKeys.splice(selectedKeys.indexOf(selectedItem),1);

            selectedItem.querySelector(".key-button").textContent = "BUY";
            selectedItem.querySelector(".key-button").classList.replace("button-red","button-green");

            if(!selectedKeys.length){
                cartFlexContainer.style.display = "none";
                shoppingCart.style.display = "none";
            }
        }

        
        else{
            selectedKeys.push(selectedItem);

            if(selectedKeys.length){
                cartFlexContainer.style.display = "flex";
                shoppingCart.style.display = "block";
            }

            const selectedKeyTitle = selectedItem.querySelector(".key-title").textContent;
            const selectedKeyPrice = selectedItem.querySelector(".key-price").textContent;
            const selectedKeyImage = selectedItem.querySelector(".key-image").getAttribute("src");
            
            selectedItem.querySelector(".key-button").textContent = "Added to the cart";
            selectedItem.querySelector(".key-button").classList.replace("button-green","button-red");

            createNewCartCard(selectedKeyTitle,selectedKeyPrice,selectedKeyImage);
        }
    }
});

const createNewCartCard = (selectedKeyTitle,selectedKeyPrice,selectedKeyImage)=>{
    const cartItemContainer = document.createElement("div");
    const cartKeyTitle = document.createElement("h2");
    const cartKeyPrice = document.createElement("label");
    const cartKeyImage = document.createElement("img");

    cartItemContainer.classList.add("cart-item-container");
    cartKeyTitle.classList.add("cart-key-title");
    cartKeyPrice.classList.add("cart-key-price");
    cartKeyImage.classList.add("cart-key-image");

    cartKeyTitle.textContent = selectedKeyTitle;
    cartKeyPrice.textContent = selectedKeyPrice;
    cartKeyImage.setAttribute("src",selectedKeyImage);

    cartItemContainer.appendChild(cartKeyTitle);
    cartItemContainer.appendChild(cartKeyPrice);
    cartItemContainer.appendChild(cartKeyImage);

    cartFlexContainer.appendChild(cartItemContainer);
};