var Database_Name = 'caseStudy';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
console.log(dbObj);
if (!dbObj) {
    alert("Not Created");
}
else {
    dbObj.transaction(function (tx) {
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS item (id, Name, price, active,DateofLaunch, Category, Delivery)');
	    tx.executeSql('SELECT * FROM item', [], function (tx, results) {
        // This function is for manual insertion of data by developer. 
            var len = results.rows.length, i;
            if(len==0){
			tx.executeSql('insert into item values(1, "Pasta", 99, "Yes", "15/03/2017", "Main Course", "Yes")');
      			  tx.executeSql('insert into item values(2, "Burger", 199, "No", "15/04/2017", "Starters", "Yes")');
       			 tx.executeSql('insert into item values(3, "Pizza", 299, "Yes", "15/05/2017", "Main Course", "No")');
       			 tx.executeSql('insert into item values(4, "Sandwitch", 99, "No", "15/06/2017", "Drinks", "No")');
		}


        });
    });

}
