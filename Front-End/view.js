const idSchedules = document.getElementById("idSchedules");
const destinationData = document.getElementById("idDisplayScheduleDepature");
const destinationDataArrival = document.getElementById("idDisplayScheduleArrival");

let data = [];
const get_all_schedule = async () => {
    const all_Schedule = await fetch("http://127.0.0.1:3600/get_all_schedule");
    const resp = await all_Schedule.json();

    loadSchedule(resp);
    data = resp;
}

const loadSchedule = (data) => {
    for (let i = 0; i < data.length; i++) {
        idSchedules.appendChild(createOptionTags(data[i]));
    }
}

const createOptionTags = (txt) => {
    const opt = document.createElement("Option");
    opt.setAttribute("value", txt.scheduleName);
    opt.appendChild(document.createTextNode(txt.scheduleName));
    return opt;
}


const displayASchedule = (e) => {
    try {
        if (data.length == 0) {
            alert("no data");
            return;
        } else {
            while (destinationData.firstChild) {
                destinationData.removeChild(destinationData.lastChild);
            }
            while (destinationDataArrival.firstChild) {
                destinationDataArrival.removeChild(destinationDataArrival.lastChild);
            }
            let ind;
            for (let i = 0; i < data.length; i++) {
                if (e.target.value === data[i].scheduleName) {
                    ind = i;
                }
            }
            //Depature
            document.getElementById("idSpanDisplayScheduleName").textContent = data[ind].scheduleName;
            document.getElementById("idDisplayADestination").value = data[ind].depatureSchedule.fromDepatureDestination;
            document.getElementById("idDisplayStopDestination").value = data[ind].depatureSchedule.stopDepatureDestination;
            document.getElementById("idDisplayBDestination").value = data[ind].depatureSchedule.toDepatureDestination;
            //Arrival
            document.getElementById("idSpanDisplayScheduleNameArrival").textContent = data[ind].scheduleName;
            document.getElementById("idDisplayADestinationArrival").value = data[ind].arrivalSchedule.fromDepatureDestination;
            document.getElementById("idDisplayStopDestinationArrival").value = data[ind].arrivalSchedule.stopDepatureDestination;
            document.getElementById("idDisplayBDestinationArrival").value = data[ind].arrivalSchedule.toDepatureDestination;

            for (let i = 0; i < data[ind].depatureSchedule.trainSections.length; i++) {
                destinationData.appendChild(createFieldSet(data[ind].depatureSchedule.trainSections[i]));
                const br = document.createElement("BR");
                destinationData.appendChild(br);

            }
            for (let i = 0; i < data[ind].arrivalSchedule.trainSections.length; i++) {
                destinationDataArrival.appendChild(createFieldSet(data[ind].arrivalSchedule.trainSections[i]));
                const br = document.createElement("BR");
                destinationDataArrival.appendChild(br);

            }

            console.log(data[ind]);
        }
    } catch (err) {
        alert("an error occured");
    }


}

const createFieldSet = (data) => {
    const fieldSet = document.createElement("fieldset");
    fieldSet.setAttribute("style", "margin-bottom:20px")
    const legend = document.createElement("Legend");
    legend.appendChild(document.createTextNode("Train Section"));

    fieldSet.appendChild(legend);
    fieldSet.appendChild(createDivSection(data));

    return fieldSet;

}

const createDivSection = (data) => {
    const divSection = document.createElement("div");
    divSection.setAttribute("style", "display:flex")
    divSection.setAttribute("class", "divClass")
    // for (let i = 0; i < data.depatureSchedule.trainSections.length; i++) {
    divSection.appendChild(createInnerFieldSet("Train Number", data.trainNumber));
    divSection.appendChild(createInnerFieldSet("Point A Depature", data.pointADepature));
    divSection.appendChild(createInnerFieldSet("Stop Arrival", data.stopArrival));
    divSection.appendChild(createInnerFieldSet("Stop Depature", data.stopDepature));
    divSection.appendChild(createInnerFieldSet("Point B Arrival", data.pointBArrival));
    //  }

    return divSection;
}

const createInnerFieldSet = (txt, desc) => {
    const fieldSet = document.createElement("fieldset");
    fieldSet.classList.add("class5", "pullRight");
    const fieldsetLegend = document.createElement("Legend");
    fieldsetLegend.appendChild(document.createTextNode(txt));
    fieldSet.appendChild(fieldsetLegend);

    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "text");
    inputTag.setAttribute("readonly", true);
    inputTag.value = desc;

    fieldSet.appendChild(inputTag);

    return fieldSet;

}


window.onload = get_all_schedule();
idSchedules.addEventListener('change', displayASchedule);