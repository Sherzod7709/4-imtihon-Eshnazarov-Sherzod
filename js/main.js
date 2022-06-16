const elFormTemplate = document.querySelector('#form-template');
const elParrotWrapper = document.querySelector('.parrots-wrapper');
const elCount  = document.querySelector('#count')
const elFilterForm = document.querySelector('#filter-form')

const addZero = num => { return num < 10 ? "0" + num : num };

const creatParrotRow = (parrot) => {
    const  {id,title,price,} = parrot;
    const elParrotRow = elFormTemplate.cloneNode(true).content;
    
    const elParrotImg = elParrotRow.querySelector(".card-img-top")
    elParrotImg.src = parrot.img;
    
    const elParrotTitle = elParrotRow.querySelector(".card-title")
    elParrotTitle.textContent = title;
    
    const elParrotPrice = elParrotRow.querySelector(".parrot-price")
    elParrotPrice.textContent = `${price}$`;
    
    const elParrotSize = elParrotRow.querySelector(".parrot-size")
    elParrotSize.textContent = `${parrot.sizes.width}sm x ${parrot.sizes.height}sm`;
    
    const elParrotDate = elParrotRow.querySelector("#parrot-date")
    const time = new Date(parrot.birthDate);
    elParrotDate.textContent = `${addZero(time.getDate())}.${addZero(time.getMonth()+1)}.${time.getFullYear()}`;
    
    const elFeatures = elParrotRow.querySelector(".list-unstyled")
    const arr = parrot.features.split(',')
    arr.forEach((about) => {
        const child = document.createElement("li")
        child.className ="badge bg-primary me-1 mb-1";
        child.textContent = about;
        elFeatures.append(child)
    })
    
    const elParrotId = elParrotRow.querySelector("#parrot-id")
    elParrotId.textContent = `ID:${id}`;
    
    const elDeleteBtn = elParrotRow.querySelector('.btn-danger')
    elDeleteBtn.dataset.id = id;
    
    const elEditBtn = elParrotRow.querySelector(".btn-secondary")
    elEditBtn.dataset.id = id;

    const elEditStar = elParrotRow.querySelector('.btn-success')
    elEditStar.dataset.id = id;
    
    return elParrotRow;
};

let elParrotShoving = parrots.slice();



let elAverage = document.querySelector('#average')

const renderParrot = () => {
    elParrotWrapper.innerHTML = "";
    filterParrots();
    let totalPrice = 0;
    elParrotShoving.forEach( parrot => {
        totalPrice += parrot.price
    })
    const averagePrice = totalPrice / elParrotShoving.length;
    elAverage.textContent = `Average-Price:${averagePrice.toFixed()}$`
    elCount.textContent = `count:${elParrotShoving.length}`
    elParrotShoving.forEach ((parrot) => {
        const elParrotRow = creatParrotRow(parrot);
        elParrotWrapper.appendChild(elParrotRow);
    })
}
renderParrot();

const elAddParrotForm = document.querySelector("#add-parrot-form")

elAddParrotForm.addEventListener('submit', e => {
    e.preventDefault()
    const formElements = e.target.elements;
    
    const addInputTitle = formElements.parrotTitle.value.trim();
    const addInputImgUrL = formElements.parrotImg.value;
    const addInputPriece = +formElements.price.value.trim();
    const addInputDate = formElements.parrotDate.value.trim();
    const addInputWidth = +formElements.parrotWidth.value.trim();
    const addInputHeight = +formElements.ParrotHeight.value.trim();
    const addFecturers = formElements.features.value.trim();
    
    if (addInputTitle && addInputImgUrL && addInputPriece>0 && addInputWidth>0 && addInputHeight>0 && addInputDate){
        const addingParrot = {
            id:Math.floor(Math.random()*100),
            title:addInputTitle,
            img:addInputImgUrL,
            price:addInputPriece,
            birthDate:addInputDate,
            sizes:{
                width:+addInputWidth,
                height:+addInputHeight
            },
            features:addFecturers
        }
        parrots.unshift(addingParrot);
        elParrotShoving.unshift(addingParrot);//
        elCount.textContent = `count:${parrots.length}`;
        const elNewParrot = creatParrotRow(addingParrot);
        elParrotWrapper.prepend(elNewParrot)
        elAddParrotForm.reset();
    }
});

const elEditModal = new bootstrap.Modal('#edit-parrot-modal')
const elEditForm = document.querySelector('#edit-parrot-form')
const elEditTitle = elEditForm.querySelector('#editTitle')
const elEditImg = elEditForm.querySelector('#editImg')
const elEditPrice = elEditForm.querySelector('#editprice')
const elEditDate = elEditForm.querySelector('#editDate')
const elEditWidth = elEditForm.querySelector('#editWidth')
const elEditHeight = elEditForm.querySelector('#editHeight')
const elEditFeaturers = elEditForm.querySelector('#editfeatures');

// const elStar = document.querySelector("#star")
// const alNew = document.querySelector('#NEW')
elParrotWrapper.addEventListener('click', (e) => {
    if (e.target.matches('.btn-danger')){
        const clickBtnId = +e.target.dataset.id;
        const clickedBtnIndex = parrots.findIndex(parrot => {
            return parrot.id === clickBtnId ;
        })
        const clickedBtnItemIndex = elParrotShoving.findIndex( parrot => parrot.id === clickBtnId );
        parrots.splice(clickedBtnIndex,1)
        elParrotShoving.splice(clickedBtnItemIndex,1)
        renderParrot();
    }
    
    if(e.target.matches('.btn-secondary')){
        const clickBtnId = +e.target.dataset.id;
        const clickedBtnObj = parrots.find((parrot) => parrot.id === clickBtnId ) ;
        
        if(clickedBtnObj){
            elEditTitle.value = clickedBtnObj.title;
            elEditImg.value = clickedBtnObj.img;
            elEditPrice.value = clickedBtnObj.price;
            elEditDate.value = clickedBtnObj.birthDate;
            elEditWidth.value = +clickedBtnObj.sizes.width;
            elEditHeight.value = +clickedBtnObj.sizes.height;
            elEditFeaturers.value = clickedBtnObj.features || "";
            
            elEditForm.dataset.id = clickBtnId;
        }
    }
    // if (e.target.matches('.btn-success')){
        
    //     const clickBtnId = +e.target.dataset.id;
    //     const clickedBtnIndex = parrots.findIndex(parrot => {
    //         return parrot.id === clickBtnId;
    //     })
        
    //     const coppy = parrots.splice(clickedBtnIndex,1)
    //     favorites.push(coppy);
    //     favorites.forEach ((oka) => {
    //         const elParrotRow = oka;
    //         alNew.appendChild(elParrotRow);
    //         console.log(elParrotRow);
    //     })

    //         elStar.classList.remove("fa-star-o")
    //         elStar.classList.add("fa-star")  
    // }
    
});

elEditForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    
    const submittingId = +e.target.dataset.id;
    
    const elTitleValue = elEditTitle.value.trim();
    const elImgValue = elEditImg.value;
    const elPriceValue = +elEditPrice.value;
    // const elDateValue = elEditDate.value;
    const elWidthValue = +elEditWidth.value;
    const elHeightValue = +elEditHeight.value;
    const elFeaturerValue = elEditFeaturers.value;
    
    
    if (elTitleValue && elImgValue && elPriceValue>0 && elWidthValue && elHeightValue){
        const submittingIndex = parrots.findIndex( parrot =>  parrot.id === submittingId );
        const submitShovingIndex = elParrotShoving.findIndex( parrot =>  parrot.id === submittingId );
        
        const submittingObg = {
            title: elTitleValue,
            img: elImgValue,
            price: `${elPriceValue}`,
            birthDate: new Date().toISOString(),
            sizes: {
                width: elWidthValue,
                height: elHeightValue
            },
            //isFavorite: true,
            features: elFeaturerValue || "",
            id: submittingId,
        };
        parrots.splice( submittingIndex , 1 , submittingObg );
        elParrotShoving.splice( submitShovingIndex, 1, submittingObg );
        
        renderParrot()
        elEditModal.hide();
    }
})

function filterParrots() {
    const elfilterElements = elFilterForm.elements;
    const searchTitle = elfilterElements.search.value;
    const fromValue = elfilterElements.from.value;
    const toValue = elfilterElements.to.value;
    const fromWidth = elfilterElements.fromWidth.value;
    const toWidth = elfilterElements.toWidth.value;
    const fromHeightValue = elfilterElements.fromHeight.value;
    const toHeightValue = elfilterElements.toHeight.value;
    
    const elSort = elfilterElements.sortby.value;
    
    
    elParrotShoving = parrots.filter(function(element) {
        const nameMatches = element.title.toLowerCase().includes(searchTitle.toLowerCase());
        return nameMatches;
    })
    .filter(parrot => {
        const lastPrice = parrot.price;
        return lastPrice >= fromValue;
    }).filter(parrot => {
        const toPrice = parrot.price;
        return !toValue ? true : toPrice <= toValue;
    }).filter(parrot => {
        const fWidth = parrot.sizes.width;
        return fWidth >= fromWidth;
    }).filter(parrot => {
        const tWidth = parrot.sizes.width;
        return !toWidth ? true : tWidth <= toWidth;
    }).filter(parrot => {
        const fWt = parrot.sizes.height;
        return fWt >= fromHeightValue;
    }).filter(parrot => {
        const tHt = parrot.sizes.height;
        return !toHeightValue ? true : tHt <= toHeightValue;
    }).sort((a,b) => {
        switch (elSort) {
            case "1":
            if (a.title > b.title) {
                return 1;
            } else if (a.title === b.title) {
                return 0;
            }
            return -1;
            case "2":
            return b.price - a.price;
            case "3":
            return a.price - b.price;
            case "4":
            return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
            case "5":
            return new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime()            
            
            default:
            break;
        }
        return 0;
    })
}

elFilterForm.addEventListener('submit', e =>{
    e.preventDefault();
    renderParrot();
});

// const elStar = document.querySelector('#star');
// elStar.addEventListener('click', () => {
//     elStar.className = "fa-solid fa-star";
// })