let names = [];
let getIndex;
let checked = {};
let textsizeObj = {
    0: "large",
    1: "medium",
    2: "small"
};
function editRow(index) {
    $("#firstName").val(names[index].firstName);
    $("#lastName").val(names[index].lastName);
    $("#backColor").val(names[index].backColor);
    document.getElementById("textSize").selectedIndex = names[index].textSize;
    $("#addButton").hide();
    $("#updateButton").css({ "display": "inline-block" });
    getIndex = index;

    $("#cancelButton").css({ "display": "inline-block" });
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].innerHTML = `<button class="btn btn-primary" disabled>Edit</button>`;
        table.rows[i].cells[4].innerHTML = `<button class='btn btn-danger' disabled=true style="background-color:#ff8080;color:white">Delete</button>`;
    }
    $("#deleteSelected").attr("disabled", true);
    $("#modify").attr("disabled", true);
}
function update() {

    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    const backColor = document.getElementById("backColor");
    const textSize = document.getElementById("textSize");

    if (fname.value == "" || lname.value == "" || /^#([0-9A-F]{3}){1,2}$/i.test(backColor.value) == false) {
        alert("Please enter first name ,last name and correct background-color hex value");
    }

    else {
        names[getIndex].firstName = fname.value;
        names[getIndex].lastName = lname.value;
        names[getIndex].backColor = backColor.value;
        names[getIndex].textSize = "" + textSize.selectedIndex;
        let cells = document.getElementById("table").rows[getIndex].cells;
        cells[1].innerHTML = fname.value;
        cells[1].style.backgroundColor = backColor.value;
        cells[1].style.fontSize = textsizeObj[textSize.selectedIndex];
        cells[2].innerHTML = lname.value;
        cells[2].style.backgroundColor = backColor.value;
        cells[2].style.fontSize = textsizeObj[textSize.selectedIndex];
        $("#addButton").css({ "display": "inline-block" });
        $("#updateButton").hide();
        $("#cancelButton").hide();
        fname.value = "";
        lname.value = "";
        backColor.value = "";
        console.log(names);

        let table = document.getElementById("table");
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[3].innerHTML = `<button class="btn btn-primary" onclick="editRow(this.parentNode.parentNode.rowIndex)" >Edit</button>`;
            table.rows[i].cells[4].innerHTML = `<button class="btn btn-danger" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
        }
        $("#deleteSelected").attr("disabled", false);
        $("#modify").attr("disabled", false);
    }
}
function cancelUpdate() {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#backColor").val("");
    $("#addButton").css({ "display": "inline-block" });
    $("#updateButton").hide();
    $("#cancelButton").hide();
    let table = document.getElementById("table");
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].innerHTML = `<button class="btn btn-primary" onclick="editRow(this.parentNode.parentNode.rowIndex)" >Edit</button>`;
        table.rows[i].cells[4].innerHTML = `<button class="btn btn-danger" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button>`;
    }
    $("#deleteSelected").attr("disabled", false);
    $("#modify").attr("disabled", false);

}
function deleteRow(index) {
    let table = document.getElementById("table");



    document.getElementById("totalSelected").innerHTML = 0;
    document.getElementById("selectAll").checked = false;
    console.log(index);
    $("#table tr").eq(index).fadeOut("slow", function () {
        console.log(document.getElementById("table").rows.length);
        $(this).remove();
        console.log(document.getElementById("table").rows.length);
        let rows = document.getElementById("table").rows;
        checked = {}
        for (let i = 0; i < rows.length; i++) {
            if ($(`#table tr:eq(${i}) td:eq(0)`).children().prop("checked")) {
                checked[i] = 1;
            }


        }
        if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
            document.getElementById("selectAll").checked = true;
        }
        else {
            document.getElementById("selectAll").checked = false;

        }
        console.log(checked);
        names.splice(index, 1);
        console.log(names, checked, table.rows.length);
        document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
        if (document.getElementById("totalSelected").innerHTML >= 1) {
            console.log("true");
            $("#showSelected").css({ "display": "inline-block" });
            $("#modification").css({ "display": "inline-block" });
        }
        else {

            $("#modification").hide();
            $("#showSelected").hide();

        }
        if (table.rows.length >= 1) {
            $("#selectAllSpan").css({ "display ": "inline-block" });
        }
        else {
            $("#selectAllSpan").hide();
        }


    });

    //table.deleteRow(index);

}
function add() {
    const table = document.getElementById("table");
    const fname = document.getElementById("firstName");
    const lname = document.getElementById("lastName");
    fname.value = fname.value.replace(/\s+/g, ' ').trim();
    lname.value = lname.value.replace(/\s+/g, ' ').trim();
    const backColor = document.getElementById("backColor");
    const textSize = document.getElementById("textSize");

    if (fname.value == "" || lname.value == "" || /^#([0-9A-F]{3}){1,2}$/i.test(backColor.value) == false) {
        alert("Please enter first name ,last name and correct background-color hex value");
    }
    else {
        names.push({ firstName: fname.value, lastName: lname.value, backColor: backColor.value, textSize: ("" + textSize.selectedIndex) });
        let newRow = $(`<tr><td><input type="checkbox" onclick="checkedItems(this.parentNode.parentNode.rowIndex)"/></td>
        <td style="width:40%;border:1px solid gray;background-color:${backColor.value};font-size:${textSize.value}">${fname.value}</td>
        <td style="width:40%;border:1px solid gray;font-size:${textSize.value};background-color:${backColor.value}">${lname.value}</td>
        <td><button class="btn btn-primary" onclick="editRow(this.parentNode.parentNode.rowIndex)">Edit</button></td>
        <td><button class="btn btn-danger" onclick="deleteRow(this.parentNode.parentNode.rowIndex)">Delete</button></td></tr>`).hide().fadeIn("slow");
        $("#table").append(newRow);

        /*

        let row = table.insertRow();
        let cell0 = row.insertCell();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.onclick = () => { checkedItems(row.rowIndex) };

        cell0.appendChild(checkbox);

        let cell1 = row.insertCell();
        let text1 = document.createTextNode(fname.value);


        cell1.appendChild(text1);
        let cell2 = row.insertCell();
        let text2 = document.createTextNode(lname.value);

        cell1.style.backgroundColor = "silver";
        cell2.style.backgroundColor = "silver";
        cell1.style.border = "1px solid black";

        cell2.style.border = "1px solid black";

        cell2.appendChild(text2);

        let cell3 = row.insertCell();
        let edit = document.createElement("button");
        edit.innerHTML = "Edit";
        edit.className = "editButton";
        edit.onclick = () => { editRow(row.rowIndex) };
        edit.style.backgroundColor = "green";
        edit.style.color = "white";
        cell3.appendChild(edit);
        cell1.style.width = "40%";
        cell2.style.width = "40%";

        let cell4 = row.insertCell();
        let del = document.createElement("button");
        del.className = "deleteButton";
        del.innerHTML = "Delete";
        del.style.backgroundColor = "red";
        del.style.color = "white";

        del.onclick = () => { deleteRow(row.rowIndex) };
        cell4.appendChild(del);
  */
        fname.value = "";
        lname.value = "";

        backColor.value = "";
    }
    if (table.rows.length >= 1) {
        document.getElementById("selectAllSpan").style.display = "inline-block";
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }

}

function selectAll() {
    let rows = document.getElementById("table").rows;
    if (document.getElementById("selectAll").checked == true) {


        for (let i = 0; i < rows.length; i++) {

            console.log($(`#table tr:eq(${i}) td:eq(0)`).children().prop("checked"));
            $(`#table tr:eq(${i}) td:eq(0)`).children().prop("checked", true);
            // rows[i].cells[0].innerHTML = `<input type="checkbox" onclick="checkedItems(this.parentNode.parentNode.rowIndex)" checked/>`
            if (checked[i] == undefined) {
                checked[i] = 1
            }


        }
        document.getElementById("totalSelected").innerHTML = rows.length;
    } else {
        for (let i = 0; i < rows.length; i++) {
            console.log($(`#table tr:eq(${i}) td:eq(0)`).children().prop("checked"));
            $(`#table tr:eq(${i}) td:eq(0)`).children().prop("checked", false);

            //rows[i].cells[0].innerHTML = `<input type="checkbox" onclick="checkedItems(this.parentNode.parentNode.rowIndex)"/>`



        }
        checked = {};
        document.getElementById("totalSelected").innerHTML = 0;

    }
    console.log(checked);

    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        $("#showSelected").css({ "display": "inline-block" });
        $("#modification").css({ "display": "inline-block" });
    }
    else {
        console.log("true");
        $("#showSelected").hide();
        $("#modification").hide();
    }
    if (table.rows.length >= 1) {
        $("#selectAllSpan").css({ "display ": "inline-block" });
    }
    else {
        $("#selectAllSpan").hide();
    }
}

function checkedItems(index) {

    if ($(`#table tr:eq(${index}) td:eq(0)`).children().prop("checked")) {


        checked[index] = 1;

    }
    else {


        delete checked[index];
    }
    console.log(checked);
    document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
    if (document.getElementById("totalSelected").innerHTML >= 1) {
        console.log("true");
        $("#showSelected").css({ "display": "inline-block" });
        $("#modification").css({ "display": "inline-block" });
    }
    else {
        console.log("true");
        $("#showSelected").hide();
        $("#modification").hide();
    }
    if (table.rows.length >= 1) {
        $("#selectAllSpan").css({ "display ": "inline-block" });
    }
    else {
        $("#selectAllSpan").hide();
    }
    if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
        document.getElementById("selectAll").checked = true;
    }
    else {
        document.getElementById("selectAll").checked = false;

    }
}
function deleteSelected() {
    let storeChecked = []
    for (let key of Object.keys(checked)) {
        if (checked[key] == 1) {
            storeChecked.push(key);
            delete checked[key];
        }
    }

    if (storeChecked.length >= 1) {
        storeChecked.sort((a, b) => b - a);
        console.log(storeChecked);
        storeChecked.forEach((item) => {
            //   table.deleteRow(item);
            $("#table tr").eq(item).fadeOut("slow", function () {
                $(this).remove();
                names.splice(item, 1);
                console.log(names, checked, table.rows.length);
                document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
                if (document.getElementById("totalSelected").innerHTML >= 1) {
                    console.log("true");
                    $("#showSelected").css({ "display": "inline-block" });
                    $("#modification").css({ "display": "inline-block" });
                }
                else {
                    console.log("true");
                    $("#showSelected").hide();
                    $("#modification").hide();
                }
                if (table.rows.length >= 1) {
                    $("#selectAllSpan").css({ "display ": "inline-block" });
                }
                else {
                    $("#selectAllSpan").hide();
                }
                if (document.getElementById("table").rows.length == Number(Object.keys(checked).length)) {
                    document.getElementById("selectAll").checked = true;
                }
                else {
                    document.getElementById("selectAll").checked = false;

                }
            });

        })



    }
}

function modify() {
    const backColor = document.getElementById("newBackColor");
    const textSize = document.getElementById("newTextSize");

    if (/^#([0-9A-F]{3}){1,2}$/i.test(backColor.value) == false) {
        alert("Please enter correct background-color hex value");
    }
    else {

        let storeChecked = []
        for (let key of Object.keys(checked)) {
            if (checked[key] == 1) {
                storeChecked.push(key);
                delete checked[key];
            }
        }

        if (storeChecked.length >= 1) {

            let table = document.getElementById("table");
            console.log(storeChecked);
            storeChecked.forEach((item) => {
                table.rows[item].cells[0].innerHTML = `<input type="checkbox" onclick="checkedItems(this.parentNode.parentNode.rowIndex)"/>`
                //   table.deleteRow(item);
                table.rows[item].cells[1].style.backgroundColor = backColor.value;
                table.rows[item].cells[2].style.backgroundColor = backColor.value;
                table.rows[item].cells[1].style.fontSize = textSize.value;
                table.rows[item].cells[2].style.fontSize = textSize.value;

                names[item].backColor = backColor.value;
                names[item].textSize = "" + textSize.selectedIndex;
            })
        }
        document.getElementById("selectAll").checked = false;

        document.getElementById("totalSelected").innerHTML = Number(Object.keys(checked).length);
        if (document.getElementById("totalSelected").innerHTML >= 1) {
            console.log("true");
            $("#showSelected").css({ "display": "inline-block" });
            $("#modification").css({ "display": "inline-block" });
        }
        else {
            console.log("true");
            $("#showSelected").hide();
            $("#modification").hide();
        }
        if (table.rows.length >= 1) {
            $("#selectAllSpan").css({ "display ": "inline-block" });
        }
        else {
            $("#selectAllSpan").hide();
        }
        backColor.value = "";
    }
}
