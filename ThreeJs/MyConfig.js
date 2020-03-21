/**
 * 这是模型的静态常量配置
 * 和货架的配置（一般要从数据库读取，这里仅做演示）
 * @author 谢宁, Created on 2020-01-07
 */
/** ***************************************************************** */
//一些变量
var PLANE_LENGTH = 60; //货架板面长度
var PLANE_WIDTH = 400; //货架板面宽度
var PLANE_HEIGHT = 2; //货架板面高度
var HOLDER_LENGTH = 10; //支架长度
var HOLDER_WIDTH = 10; //支架宽度
var HOLDER_HEIGHT = 50; //支架高度
var LAYER_NUM = 5; //货架层数
var COLUMN_NUM = 1; //货架每层列数
var BOX_SIZE = 20; //货物的大小(立方体)

//货架数组
var shelf_list_zhongyi = new Array();
var shelf_list_zhonger = new Array();
var shelf_list_zhongsan = new Array();
var shelf_list_xiyi = new Array();
var shelf_list_dongyi = new Array();


//中庭二区
var step = 10
var initstep1 = 150;
for (var i = 0; i < 11; i++) {

	shelf_list_zhonger.push({
		StorageZoneId: '中庭二区',
		shelfId: '中二' + (i+1),
		shelfName: '中二书架',
		x: (i - 5) * initstep1,
		y: 27,
		z: -1500
	}); /* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */

}


//西一区
var initstep2 = 120;
for (var i = 0; i < 52; i++) {
	if (i < 26)
		shelf_list_xiyi.push({
			StorageZoneId: '西一区',
			shelfId: '西一' + (i+1),
			shelfName: '西一书架',
			x: (i - 5) * initstep2 - 2780,
			y: 27,
			z: 1000
		}); /* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	else {
		shelf_list_xiyi.push({
			StorageZoneId: '西一区',
			shelfId: '西一' +(i+1),
			shelfName: '西一书架',
			x: (i % 26 - 5) * initstep2 - 2780,
			y: 27,
			z: 500
		});
	}
}

//东一区
var initstep3 = 120;
for (var i = 0; i < 52; i++) {
	if (i < 26)
		shelf_list_dongyi.push({
			StorageZoneId: '东一区',
			shelfId: '东一' +(i+1),
			shelfName: '东一书架',
			x: (i - 5) * initstep3 + 980,
			y: 27,
			z: 1000
		}); /* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	else {
		shelf_list_dongyi.push({
			StorageZoneId: '东一区',
			shelfId: '东一' +(i+1),
			shelfName: '东一书架',
			x: (i % 26 - 5) * initstep3 + 980,
			y: 27,
			z: 500
		});
	}
}

//中庭三区
var initstep4 = 200;
for (var i = 0; i < 10; i++) {

	if (i < 5) {
		shelf_list_zhongsan.push({
			StorageZoneId: '中庭三区',
			shelfId: '中三' + (i+1),
			shelfName: '中三书架',
			x: (i - 5) * initstep4 + 2100,
			y: 27,
			z: -1300
		}); /* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	} else {
		shelf_list_zhongsan.push({
			StorageZoneId: '中庭三区',
			shelfId: '中三' + (i+1),
			shelfName: '中三书架',
			x: (i % 5 - 5) * initstep4 + 2100,
			y: 27,
			z: -800
		});
	}
}

//中庭一区
var initstep5 = 200;
for (var i = 0; i < 10; i++) {
	if (i < 5) {
		shelf_list_zhongyi.push({
			StorageZoneId: '中庭一区',
			shelfId: '中一' + (i+1),
			shelfName: '中一书架',
			x: (i - 5) * initstep5 - 880,
			y: 27,
			z: -1300
		}); /* 添加一个货架，参数的意义是：货架所在的库区、货架的编号、货架的中文名、货架的xyz位置。 */
	} else {
		shelf_list_zhongyi.push({
			StorageZoneId: '中庭一区',
			shelfId: '中一' + (i+1),
			shelfName: '中一书架',
			x: (i % 5 - 5) * initstep5 - 880,
			y: 27,
			z: -800
		});
	}

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


function GET_PLANE_LENGTH() {
	return PLANE_LENGTH;
}

function GET_PLANE_WIDTH() {
	return PLANE_WIDTH;
}

function GET_PLANE_HEIGHT() {
	return PLANE_HEIGHT;
}

function GET_HOLDER_LENGTH() {
	return HOLDER_LENGTH;
}

function GET_HOLDER_WIDTH() {
	return HOLDER_WIDTH;
}

function GET_HOLDER_HEIGHT() {
	return HOLDER_HEIGHT;
}

function GET_LAYER_NUM() {
	return LAYER_NUM;
}

function GET_COLUMN_NUM() {
	return COLUMN_NUM;
}

function GET_BOX_SIZE() {
	return BOX_SIZE;
}

function GET_SHELF_LIST(n) {
	if (n == 1) {
		return shelf_list_zhongyi;
	} else if (n == 2) {
		return shelf_list_zhonger;
	} else if (n == 3) {
		return shelf_list_zhongsan;
	} else if (n == 4) {
		return shelf_list_xiyi;
	} else if (n == 5) {
		return shelf_list_dongyi;
	} else {
		var result = shelf_list_zhongyi.concat(shelf_list_zhonger, shelf_list_zhongsan, shelf_list_xiyi, shelf_list_dongyi);
		return result;
	}


}
