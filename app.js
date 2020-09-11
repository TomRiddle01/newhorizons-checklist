
window.onload = function(){
    createCollection()

    renderTable("bugs", bugs_data)
    renderTable("fish", fish_data)
    renderTable("sea", sea_data)

    filterAvailableAnimals("bugs", bugs_data)
    filterAvailableAnimals("fish", fish_data)
    filterAvailableAnimals("sea", sea_data)
}
function toggleSetting(e, setting){
    if(e.checked){
        document.body.setAttribute(setting, true);
    }else{
        document.body.removeAttribute(setting);
    }
}
function toggleColorVisibility(e){
    if(e.checked){
        document.body.setAttribute("data-hide-all-colors", true);
    }else{
        document.body.removeAttribute("data-hide-all-colors");
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
let months = [];
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";

function getMonth(offset){


    let d = new Date();
    return months[(d.getMonth()+offset) % 12];
}

function filterAvailableAnimals(divId, data){
    let i = 0;
    var html = "";

    data.forEach(animal => {
        let element = document.getElementById(`${divId}-${i}`)
        let current_month = getMonth(0)
        let prev_month = getMonth(-1)
        let next_month = getMonth(1)


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





    tooltip = document.getElementById("tooltip");

    i = 0;
    data.forEach(animal => {
        let element = document.getElementById(`${divId}-${i}`)
        if(collection[animal.Name]){
            element.setAttribute("data-collected", true)
        }
        let img = element.getElementsByClassName("animal-img")[0]
        img.addEventListener("click", e => {
            element.toggleAttribute("data-collected")

            collection = JSON.parse(localStorage.getItem('collection'));

            collection[animal.Name] = !collection[animal.Name]
            localStorage.setItem('collection', JSON.stringify(collection));
        });
        img.addEventListener("mousemove", e => {
            var x = e.clientX;
            var y = e.clientY;
            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';
            tooltip.style.visibility = 'visible';

            collection = JSON.parse(localStorage.getItem('collection'));

            document.getElementById("info_name").innerText = animal.Name
            document.getElementById("info_price").innerText = animal.Price + " Bells"
            document.getElementById("info_image").src = `${divId}/${animal.Image}.webp`
            if(animal.Location){
                document.getElementById("info_location").innerText = animal.Location
            }else{

                document.getElementById("info_location").innerText = "Ocean"
            }
            document.getElementById("info_time").innerText = animal.Time

            ;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(m => {
               month = document.getElementById("m_"+m);
               if(animal[months[m]]){
                   month.style.opacity = "1";
               }else{
                   month.style.opacity = "0.2";
               }
            });

        });
        img.addEventListener("mouseout", e => {
            tooltip.style.visibility = 'hidden';
        });
        i++;
    });
}