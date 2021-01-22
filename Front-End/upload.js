const btnNewTrainSection = document.getElementById("btnNewTrainSection");
const idNewScheduleDepature = document.getElementById("idNewScheduleDepature");
const btnNewTrainSectionArrival = document.getElementById("btnNewTrainSectionArrival");
const idNewScheduleArrival = document.getElementById("idNewScheduleArrival");
const btnAddNewSchedule = document.getElementById("btnAddNewSchedule");
const trainSection = document.getElementById("trainSection");

const createNewTrainSection = () => {
    const makeFieldSet = createFieldSet();
    idNewScheduleDepature.appendChild(makeFieldSet);
}
const createNewTrainSectionArrival = () => {
    const makeFieldSet = createFieldSet();
    idNewScheduleArrival.appendChild(makeFieldSet);
}

const createFieldSet = () => {
    const fieldSet = document.createElement("fieldset");
    fieldSet.setAttribute("style", "margin-bottom:20px")
    const legend = document.createElement("Legend");
    legend.appendChild(document.createTextNode("Train Section"));

    fieldSet.appendChild(legend);

    const spanTag = document.createElement("span");
    spanTag.appendChild(document.createTextNode("Delete"));
    spanTag.setAttribute("style", "cursor:pointer");
    spanTag.onclick = deleteSection;

    fieldSet.appendChild(spanTag);
    fieldSet.appendChild(createDivSection());

    return fieldSet;

}

const createDivSection = () => {
    const divSection = document.createElement("div");
    divSection.setAttribute("style", "display:flex")
    divSection.setAttribute("class", "divClass")
    divSection.appendChild(createTrainNumberFieldDet());
    divSection.appendChild(createInnerFieldSet("Point A Depature"));
    divSection.appendChild(createInnerFieldSet("Stop Arrival"));
    divSection.appendChild(createInnerFieldSet("Stop Depature"));
    divSection.appendChild(createInnerFieldSet("Point B Arrival"));

    return divSection;
}

const createTrainNumberFieldDet = () => {
    const trainNumberFieldSet = document.createElement("fieldset");
    trainNumberFieldSet.classList.add("class5", "pullRight");
    const trainNumberLegend = document.createElement("Legend");
    trainNumberLegend.appendChild(document.createTextNode("Train Number"));
    trainNumberFieldSet.appendChild(trainNumberLegend);

    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "text");

    trainNumberFieldSet.appendChild(inputTag);

    return trainNumberFieldSet;

}
const createInnerFieldSet = (legendText) => {
    //Create inner field set elements
    const innerFieldSet = document.createElement("fieldset");
    innerFieldSet.classList.add("class5", "pullLeft")
    const legend = document.createElement("Legend");
    legend.appendChild(document.createTextNode(legendText));

    //Add legend to Fieldset
    innerFieldSet.appendChild(legend);

    //Create Input Element
    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "text");

    //Add input to Fieldset
    innerFieldSet.appendChild(inputTag);

    //Create select Element
    const selectTag = document.createElement("select");
    //Create Option Tags
    const optionTag1 = document.createElement("option");
    optionTag1.value = "am";
    optionTag1.appendChild(document.createTextNode("AM"));
    const optionTag2 = document.createElement("option");
    optionTag2.value = "am";
    optionTag2.appendChild(document.createTextNode("PM"));

    //Add option tags to select tag
    selectTag.append(optionTag1, optionTag2);

    //Add select to Fieldset
    innerFieldSet.appendChild(selectTag);

    return innerFieldSet;


}

const deleteSection = (e) => {
    e.target.parentElement.remove();
}

const registerNewDepatureSchedule = () => {
    const inputs = document.getElementById("fieldSetDepature").querySelectorAll("input");
    const trainSections = idNewScheduleDepature.querySelectorAll(".divClass")
    const data = {};
    data.trainSections = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            alert("Error! Some fields are empty");
            return;
        }
    }
    data.fromDepatureDestination = inputs[1].value;
    data.stopDepatureDestination = inputs[2].value;
    data.toDepatureDestination = inputs[3].value;

    for (let i = 0; i < trainSections.length; i++) {
        let trainSectionData = {};
        trainSectionData.trainNumber = trainSections[i].querySelectorAll("input")[0].value;
        trainSectionData.pointADepature = `${trainSections[i].querySelectorAll("input")[1].value} ${trainSections[i].querySelectorAll("select")[0].value}`;
        trainSectionData.stopArrival = `${trainSections[i].querySelectorAll("input")[2].value} ${trainSections[i].querySelectorAll("select")[1].value}`;
        trainSectionData.stopDepature = `${trainSections[i].querySelectorAll("input")[3].value} ${trainSections[i].querySelectorAll("select")[2].value}`;
        trainSectionData.pointBArrival = `${trainSections[i].querySelectorAll("input")[4].value} ${trainSections[i].querySelectorAll("select")[3].value}`;
        data.trainSections.push(trainSectionData);
    }
    return data;

}
const registerNewSchedule = async () => {
    if (document.getElementById("scheduleName").value == "") {
        alert("Error! No schedule name");
        return;
    }
    data = {};
    const depatureSchedule = registerNewDepatureSchedule();

    const inputs = document.getElementById("fieldSetArrival").querySelectorAll("input");
    const trainSections = idNewScheduleArrival.querySelectorAll(".divClass")
    const arrivalSchedule = {};
    arrivalSchedule.trainSections = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            alert("Error! Some fields are empty");
            return;
        }
    }

    arrivalSchedule.fromDepatureDestination = inputs[0].value;
    arrivalSchedule.stopDepatureDestination = inputs[1].value;
    arrivalSchedule.toDepatureDestination = inputs[2].value;

    for (let i = 0; i < trainSections.length; i++) {
        let trainSectionData = {};
        trainSectionData.trainNumber = trainSections[i].querySelectorAll("input")[0].value;
        trainSectionData.pointADepature = `${trainSections[i].querySelectorAll("input")[1].value} ${trainSections[i].querySelectorAll("select")[0].value}`;
        trainSectionData.stopArrival = `${trainSections[i].querySelectorAll("input")[2].value} ${trainSections[i].querySelectorAll("select")[1].value}`;
        trainSectionData.stopDepature = `${trainSections[i].querySelectorAll("input")[3].value} ${trainSections[i].querySelectorAll("select")[2].value}`;
        trainSectionData.pointBArrival = `${trainSections[i].querySelectorAll("input")[4].value} ${trainSections[i].querySelectorAll("select")[3].value}`;
        arrivalSchedule.trainSections.push(trainSectionData);
    }

    schedule = {
        "scheduleName": document.getElementById("scheduleName").value,
        "schedule_id": create_UUID(),
        depatureSchedule: depatureSchedule,
        arrivalSchedule: arrivalSchedule
    };
    const sendData = await fetch("http://127.0.0.1:3600/new_schedule", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    })

    let resp = await sendData.json();
    if (resp == "Schedule registration successful") {
        alert("Schedule registration successful");
    }
    else {

        alert(resp);
    }
}


btnNewTrainSection.addEventListener("click", createNewTrainSection);
btnNewTrainSectionArrival.addEventListener("click", createNewTrainSectionArrival);
// btnAddNewDepatureSchedule.addEventListener("click", registerNewDepatureSchedule);
btnAddNewSchedule.addEventListener("click", registerNewSchedule);

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}