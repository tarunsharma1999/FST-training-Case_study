var Database_Name = 'caseStudy';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
var cartarr = [];
function checkItems() {

    
    
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * FROM item', [], function (tx, results) {

            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                document.getElementById("menu-table").innerHTML += "<td>" + results.rows.item(i).Name + "</td><td>Rs." + results.rows.item(i).price
                    + "</td><td>" + results.rows.item(i).active + "</td><td>" + results.rows.item(i).DateofLaunch + "</td><td>" + results.rows.item(i).Category
                    + "</td><td>" + results.rows.item(i).Delivery + "</td><td>" + "<a class='editLink' href='edit-menu-item.html?item=" + (results.rows.item(i).id) + "'> Edit </a>";
            };


        });
    });
}
function availableitem() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * FROM item', [], function (tx, results) {

            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                if (results.rows.item(i).active == "Yes") {
                    document.getElementById("item-table").innerHTML += "<td>" + results.rows.item(i).Name + "</td><td>" + results.rows.item(i).Delivery + "</td><td>Rs." + results.rows.item(i).price + "</td><td>" + results.rows.item(i).Category + "</td><td> <button onclick='addCart(" + results.rows.item(i).id + ")' class='button-addCart'> Add to Cart </button> </td>";
                }
            }
        });
    });
}
function getItems(){

    var params = new URLSearchParams(window.location.search);
    var para = params.get('item');
    
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * FROM item', [], function (tx, results) {

            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                if (para == (i + 1)) {
                    document.getElementsByName("item-id")[0].setAttribute("value", para);
                    document.getElementsByName("item-Name")[0].setAttribute("value", results.rows.item(i).Name);
                    document.getElementsByName("item-price")[0].setAttribute("value", results.rows.item(i).price);
                    document.getElementsByName("item-dateOfLaunch")[0].setAttribute("value", results.rows.item(i).DateofLaunch);

                    
                    if (results.rows.item(i).active === "Yes") {
                        document.getElementById("item-stock-yes").checked = true;
                    } else {
                        document.getElementById("item-stock-no").checked = true;
                    }

                    if (results.rows.item(i).Delivery === "Yes") {
                        document.getElementsByName("item-Delivery")[0].checked = true;

                    } else {
                        document.getElementsByName("item-Delivery")[0].checked = false;
                    }
                }
            };


        });
    });
}

function update() {

    var params = new URLSearchParams(window.location.search);


    var id = params.get('item-id');
    var name = params.get('item-Name');
    var price = params.get("item-price");
    var dol = params.get("item-dateOfLaunch");
    var category = params.get("item-category");
    var active,delivery;
    if (params.get("item-stock") == "on") {

        active = "Yes";

    } else {
        active = "No";
    }
    if (params.get("item-Delivery")== "on") {

        delivery = "Yes";

    } else {
        delivery = "No";
    }
    var qry = 'update item set name="' +name +'",price="' + price + '",active="' + active + '",DateofLaunch="' + dol + '",Category="' + category +
        '",Delivery="' + delivery + '" where id=' + id ;
    dbObj.transaction(function (tx) {
       
        tx.executeSql(qry);
    });
}

function addCart(id) {
    document.getElementById("Cart-msg").style.display = "inline-block";

    dbObj.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS cart (id unique)');
        
        tx.executeSql('INSERT into cart VALUES( ' + id + ')');
    });

    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT * FROM item ', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                if (id == (i + 1)) {
                    document.getElementById('item-name').innerHTML = results.rows.item(i).Name;
                   
                }
            }
        });
    });

}
var total = 0;
function showcart() {
    
    emptycart();

    
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT DISTINCT id FROM cart ', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                //console.log(results.rows.item(i).id);
                let x = results.rows.item(i).id;
                dbObj.transaction(function (tx2) {
                    
                    var q = 'SELECT * FROM item WHERE id=' + x ;
                    tx2.executeSql(q, [], function (tx2, result) {
                        
                        //console.log(result.rows.item(0).Name);
                        document.getElementById('item-table').innerHTML += "<tr class='item-" + result.rows.item(0).id + "'><td>" + result.rows.item(0).Name + "</td><td>" + result.rows.item(0).Delivery + "</td><td class='item-" + result.rows.item(0).id + "-price'>" + result.rows.item(0).price + "</td><td> <input type='button' class='button-addCart' onclick='deleteitem(" + result.rows.item(0).id + ")' value='delete item'/></tr>";
                        total += parseInt(result.rows.item(0).price);
                        document.getElementById('Total').value = total;
                        updatetotal();
                    });

                     
                });
            } 
        });
    });
    
}
function updatetotal() {
    document.getElementById('totalPrice').innerHTML = document.getElementById('Total').value;
}

function emptycart() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT id FROM cart', [], function (tx, result) {
            if (result.rows.length == 0) {
                var myobj = document.getElementById("item-table");
                myobj.remove();
                var myobj = document.getElementById("total-table");
                myobj.remove();
                document.getElementsByClassName('no-item')[0].style.display = "inline-block";
            }

        });
    });
}
function deleteitem(id) {

    dbObj.transaction(function (tx) {
        tx.executeSql('DELETE FROM cart WHERE id=' + id);
    });
    emptycart();
    //console.log('item-' + id);
    var price = parseInt(document.getElementsByClassName('item-' + id + '-price')[0].innerHTML);
    


    document.getElementsByClassName('item-' + id )[0].style.display = "none";
    document.getElementById('Total').value = parseInt(document.getElementById('Total').value) - price;
    updatetotal();
}