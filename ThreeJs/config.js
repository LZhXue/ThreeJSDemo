/**
 * 这是模型的静态常量配置
 * 和货架的配置（一般要从数据库读取，这里仅做演示）
 * @author 谢宁, Created on 2020-01-07
 */
/** ***************************************************************** */
//一些变量
var PLANE_LENGTH = 20;  //货架板面长度
var PLANE_WIDTH = 90;   //货架板面宽度
var PLANE_HEIGHT = 1;   //货架板面高度
var HOLDER_LENGTH = 4;  //支架长度
var HOLDER_WIDTH = 2;   //支架宽度
var HOLDER_HEIGHT = 60; //支架高度
var LAYER_NUM = 10;      //货架层数
var COLUMN_NUM = 1;     //货架每层列数
var BOX_SIZE = 10;      //货物的大小(立方体)

//货架数组
var shelf_list = new Array();


//中庭二区
var step=100
var initstep=100;
for(var i=0;i<22;i++)
{
	if(i<11)
	shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i-5)*initstep,y:27,z:-900});/* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	else{
		shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i%10-5)*initstep,y:27,z:-600});
	}
 }


//西一区
var step=100
var initstep=100;
for(var i=0;i<22;i++)
{
	if(i<11)
	shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i-5)*initstep-1000,y:27,z:1000});/* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	else{
		shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i%10-5)*initstep-1000,y:27,z:500});
	}
}

//东一区
var step=100
var initstep=100;
for(var i=0;i<22;i++)
{
	if(i<11)
	shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i-5)*initstep+1000,y:27,z:1000});/* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	else{
		shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:(i%10-5)*initstep+1000,y:27,z:500});
	}
}

//中庭三区
var step=100
var initstep=100;
for(var i=0;i<22;i++)
{
	if(i<10)
	shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:800,y:27,z:(i%10-6)*initstep});/* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	/* else{
		shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:1000,y:27,z:(i%10-5)*initstep});
	} */
}

//中庭二区
var step=100
var initstep=100;
for(var i=0;i<22;i++)
{
	if(i<10)
	shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:-900,y:27,z:(i%10-6)*initstep});/* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	/* else{
		shelf_list.push({StorageZoneId:'Z1',shelfId:'A'+i,shelfName:'货架A1',x:1000,y:27,z:(i%10-5)*initstep});
	} */
}




//shelf_list.push({StorageZoneId:'Z1',shelfId:'A1',shelfName:'货架A1',x:-300,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A2',shelfName:'货架A2',x:-200,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A3',shelfName:'货架A3',x:-100,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A10',shelfName:'货架A93',x:000,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A11',shelfName:'货架A10',x:100,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A4',shelfName:'货架A4',x:200,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A5',shelfName:'货架A5',x:300,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A6',shelfName:'货架A6',x:400,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A7',shelfName:'货架A7',x:500,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A8',shelfName:'货架A8',x:600,y:27,z:0});
//shelf_list.push({StorageZoneId:'Z1',shelfId:'A9',shelfName:'货架A9',x:700,y:27,z:0});


function GET_PLANE_LENGTH(){
  return PLANE_LENGTH;
}

function GET_PLANE_WIDTH(){
  return PLANE_WIDTH;
}

function GET_PLANE_HEIGHT(){
  return PLANE_HEIGHT;
}

function GET_HOLDER_LENGTH(){
  return HOLDER_LENGTH;
}

function GET_HOLDER_WIDTH(){
  return HOLDER_WIDTH;
}

function GET_HOLDER_HEIGHT(){
  return HOLDER_HEIGHT;
}

function GET_LAYER_NUM(){
  return LAYER_NUM;
}

function GET_COLUMN_NUM(){
  return COLUMN_NUM;
}

function GET_BOX_SIZE(){
  return BOX_SIZE;
}

function GET_SHELF_LIST(){
  return shelf_list;
}
