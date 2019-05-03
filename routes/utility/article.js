'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

// list() : 撈資料庫中「所有文章列表」
var list = async function(){
    var result=[];
	
    await sql('SELECT * FROM article')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//匯出
module.exports = {list};