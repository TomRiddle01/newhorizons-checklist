
window.onload = function(){
    createCollection()

    renderTable("bugs", bugs_data)
    renderTable("fish", fish_data)
    renderTable("sea", sea_data)

    filterAvailableAnimals("bugs", bugs_data)
    filterAvailableAnimals("fish", fish_data)
    filterAvailableAnimals("sea", sea_data)
}
function toggleCollectedVisibility(e){
    if(e.checked){
        document.body.setAttribute("data-hide-all-collected", true);
    }else{
        document.body.removeAttribute("data-hide-all-collected");
    }
}
function createCollection(){
    //localStorage.removeItem("collection")
    collection = JSON.parse(localStorage.getItem('collection'));
    if(!collection){
        collection = {}
        ;[bugs_data, fish_data, sea_data].forEach(animals => {
            animals.forEach(animal => {
                collection[animal.Name] = false;
            });
        })
        localStorage.setItem('collection', JSON.stringify(collection));
        console.log("local storage set")
    }else{
        console.log("local storage loaded")
    }
}

function getMonth(offset){
    let month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    let d = new Date();
    return month[(d.getMonth()+offset) % 12];
}

function filterAvailableAnimals(divId, data){
    let i = 0;
    var html = "";

    data.forEach(animal => {
        let element = document.getElementById(`${divId}-${i}`)
        let current_month = getMonth(0)
        let prev_month = getMonth(-1)
        let next_month = getMonth(1)
        console.log(current_month)

        if(animal[current_month]){

            if(!animal[next_month]){
                element.setAttribute("data-leaving", true)
            }else if(!animal[prev_month]){
                element.setAttribute("data-arriving", true)
            }
            element.setAttribute("data-available", true)


        }else{
            element.setAttribute("data-unavailable", true)
        }



        i++;
    });
}

function renderTable(divId, data){
    let i = 0;
    var html = "";

    data.forEach(animal => {
        html += `<div class='animal-div' id="${divId}-${i}" data-id="${i}"><img class='animal-img' src='${divId}/${animal.Image}.webp'/></div>`

        i++;
    });
    let div = document.getElementById(divId);
    div.innerHTML = html;




    i = 0;
    data.forEach(animal => {
        let element = document.getElementById(`${divId}-${i}`)
        if(collection[animal.Name]){
            element.setAttribute("data-collected", true)
        }
        let img = element.getElementsByClassName("animal-img")[0]
        img.addEventListener("click", e => {
            element.toggleAttribute("data-collected")

            collection = collection = JSON.parse(localStorage.getItem('collection'));
            console.log(collection)
            collection[animal.Name] = !collection[animal.Name]
            localStorage.setItem('collection', JSON.stringify(collection));
        });
        i++;
    });
}