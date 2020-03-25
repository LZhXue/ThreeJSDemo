/**
 * MyModules.js是3D显示模型存放的地方
 * 该文件存放建模相关的内容，库区以及货架货物等都会放在这个文件里面。
 */
/** ***************************************************************** */
//模型材质信息
var planeMat, RackMat, CargoMat, LineMat;
//分区信息
var storageZoneSize = 0,
	storageZoneList = [];
//书架架信息
var shelfSize = 0,
	shelfList = [];
//存书位位信息
var storageUnitSize = 0,
	storageUnitList = [];
//书本信息
var cargoSize = 0,
	cargoList = [],
	CargosExist;
/* 创建书架存书位对象像创建JAVA类的初始化，
对象的获取也是仿照了JAVA的GET方法。
这样在需要创建货架货位的地方只需要调用对象的初始化方法，赋予相应的值。
在需要获取对象的地方调用GET方法就好了。 */

//创建分区对象
function storageZone(StorageZoneId, StorageZoneName,
	coordinateX, coordinateZ,
	width, length,
	textColor, fontSize, textposition) {
	this.StorageZoneId = StorageZoneId;
	this.StorageZoneName = StorageZoneName;
	this.coordinateX = coordinateX;
	this.coordinateZ = coordinateZ;
	this.width = width;
	this.length = length;
	this.textColor = textColor;
	this.fontSize = fontSize;
	this.textposition = textposition;
}

//根据分区编码获取分区对象
function getStorageZoneById(StorageZoneId) {
	for (var i = 0; i < storageZoneSize; i++) {
		if (storageZoneList[i].StorageZoneId == StorageZoneId) {
			return storageZoneList[i];
		}
	}
}

/* 创建的书架没有使用外部导入的3D模型，全部使用ThreeJs创建各类长方体拼接而成，比如单层书架就是一个长方体作书架板面，再加上四个小长方体作支架。 */
//创建书架对象
function shelf(storageZoneId, shelfId, shelfName,
	planeLength, planeWidth, planeHeight,
	holderLength, holderWidth, holderHeight,
	positionX, positionY, positionZ,
	layerNum, columnNum) {
	this.storageZoneId = storageZoneId; //区域
	this.shelfId = shelfId; //ID
	this.shelfName = shelfName; //名字
	this.planeLength = planeLength; //面板长宽高
	this.planeWidth = planeWidth;
	this.planeHeight = planeHeight;
	this.holderLength = holderLength; //支架长宽高
	this.holderWidth = holderWidth;
	this.holderHeight = holderHeight;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.layerNum = layerNum; //层数
	this.columnNum = columnNum; //列数
}

//根据书架编码获取书架对象
function getShelfById(shelfId) {
	for (var i = 0; i < shelfSize; i++) {
		if (shelfList[i].shelfId == shelfId) {
			return shelfList[i];
		}
	}
}

//创建存书位对象
function storageUnit(storageZoneId, shelfId, shelfName,
	inLayerNum, inColumnNum,
	positionX, positionY, positionZ, storageUnitId) {
	this.storageZoneId = storageZoneId;
	this.shelfId = shelfId;
	this.shelfName = shelfName;
	this.inLayerNum = inLayerNum; //层数
	this.inColumnNum = inColumnNum; //列数
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;
	this.storageUnitId = storageUnitId;
}

//根据书架ID、层数、列数获取存书位对象
function getStorageUnitById(shelfId, inLayerNum, inColumnNum) {
	for (var i = 0; i < storageUnitSize; i++) {
		if (storageUnitList[i].shelfId == shelfId && storageUnitList[i].inLayerNum == inLayerNum && storageUnitList[i].inColumnNum ==
			inColumnNum) {
			return storageUnitList[i];
		}
	}
}

//根据存书位ID获取存书位对象
function getStorageUnitByUnitId(storageUnitId) {
	for (var i = 0; i < storageUnitSize; i++) {
		if (storageUnitList[i].storageUnitId == storageUnitId) {
			return storageUnitList[i];
		}
	}
}

/**
 *  初始化材质信息 
 * */
function initMat() {
	RackMat = new THREE.MeshLambertMaterial();
	CargoMat = new THREE.MeshBasicMaterial();
	LineMat = new THREE.MeshLambertMaterial();
	//加载获取纹理里面的图片，引入纹理，把纹理传给该材质
	//创建材质 里面加纹理 因为上面的纹理里面有图片 所以相当于在材质上面贴图片
	new THREE.TextureLoader().load("./ThreeJs/images/rack.png", function(map) {
		RackMat.map = map;
		RackMat.needsUpdate = true;
	}); //书架纹理
	var materials = [];
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍正面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍正面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍上面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍上面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍右面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	materials.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./ThreeJs/images/书籍左面.jpg', {}, function() {
			renderer.render(scene, camera);
		}),
		overdraw: true
	}));
	CargoMat = materials; //书籍纹理

	new THREE.TextureLoader().load("./ThreeJs/images/line.png", function(map) {
		LineMat.map = map;
		LineMat.needsUpdate = true;
	}); //分区边界线纹理
}

//region 放置天空盒
function addSkybox(size, scene) {
	urls = [
		//要贴的六个面对应的六张图片，
		'./ThreeJs/images/skybox/远山_RT.jpg', // 右right
		'./ThreeJs/images/skybox/远山_LF.jpg', // 左left
		'./ThreeJs/images/skybox/远山_UP.jpg', // 上up
		'./ThreeJs/images/skybox/远山_DN.jpg', // 下down
		'./ThreeJs/images/skybox/远山_BK.jpg', // 后back
		'./ThreeJs/images/skybox/远山_FR.jpg' // 前front
	];
	//对场景Scene的背景进行贴图，使之成为一个天空盒，只不过这个天空盒不能看见其外面的情景，无论怎么缩放，始终都在全景内，
	var skyboxCubemap = new THREE.CubeTextureLoader().load(urls); //全景贴图
	skyboxCubemap.format = THREE.RGBFormat; //format：表示加载的图片的格式，RGBFormat不使用透明，也就是说纹理不会有透明的效果。

	var skyboxShader = THREE.ShaderLib['cube']; //一个特别的着色器（Three.ShaderLib[“cube”]）,结合THREE.ShaderMaterial类，我们可以基于CubeMap对象创建一个环境
	skyboxShader.uniforms['tCube'].value = skyboxCubemap;
	var obj = new THREE.Mesh(
		new THREE.BoxGeometry(size, size, size),
		new THREE.ShaderMaterial({
			//ShaderMaterial创建自己的着色器，要使用ShaderMaterial，必须传入两个着色器：fragmentShader，vertexShader
			fragmentShader: skyboxShader.fragmentShader, //定义每个传入的像素的颜色
			vertexShader: skyboxShader.vertexShader, //允许你修改每一个传入的顶点的位置
			uniforms: skyboxShader.uniforms, ////该属性可以向你的着色器发送消息，将同样的消息发送到每个顶点和片段
			depthWrite: false,
			side: THREE.BackSide //运用到几何体的内面
		})
	);
	obj.position.set(0, 1000, 0);
	scene.add(obj);
}
//end region

//region 添加太阳炫光
// function addSun() {

// 	var spotLight = new THREE.SpotLight(0xffffff);
// 	spotLight.position.set(50, 10, -50);
// 	scene.add(spotLight);

// 	var textureFlare0 = THREE.ImageUtils.loadTexture("ThreeJs/images/太阳炫光白.png");
// 	var textureFlare3 = THREE.ImageUtils.loadTexture("ThreeJs/images/太阳炫光黑.png");
// 	var flareColor = new THREE.Color(0xffffff);
// 	let lensFlare = new THREE.LensFlare(textureFlare0, 350, 0, THREE.AdditiveBlending, flareColor);
// 	lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
// 	lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
// 	lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
// 	lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
// 	lensFlare.position = spotLight.position;
// 	scene.add(lensFlare);
// }
// //end region

//region 创建地板
function createFloor(chang, kuan, gao) {
	var loader = new THREE.TextureLoader();
	loader.load("ThreeJs/images/方格小方点瓷砖.jpg", function(texture) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(15, 15);
		var floorGeometry = new THREE.BoxGeometry(chang, kuan, gao);
		var floorMaterial = new THREE.MeshBasicMaterial({
			map: texture,
		});
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.rotation.x = -Math.PI / 2;
		floor.name = "墙";
		scene.add(floor);
	});
}
//endregion
//region 创建中间圆形区域
function createCircle(r) {
	var loader = new THREE.TextureLoader();
	loader.load("ThreeJs/images/圆形复古瓷砖纹理.jpg", function(texture) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		var circleGeometry = new THREE.BoxGeometry(r, 5, r);
		var circleMaterial = new THREE.MeshBasicMaterial({
			map: texture,
		});
		var circle = new THREE.Mesh(circleGeometry, circleMaterial);
		circle.name = "墙";
		scene.add(circle);
	});
}
//endregion

//region 形成分区的矩形区域
function addPlane(x, z, width, length, scene) {
	var lineWidth = 8
	var geometry = new THREE.PlaneGeometry(lineWidth, length);
	var obj = new THREE.Mesh(geometry, LineMat);
	obj.position.set(x, 1.5, z);
	obj.rotation.x = -Math.PI / 2.0;
	var obj2 = obj.clone();
	obj2.translateX(width);

	var geometry2 = new THREE.PlaneGeometry(lineWidth, width);
	var obj3 = new THREE.Mesh(geometry2, LineMat);
	obj3.position.set(x + width / 2, 1.5, z - length / 2 + lineWidth / 2);
	obj3.rotation.x = -Math.PI / 2.0;
	obj3.rotation.z = -Math.PI / 2.0;
	var obj4 = obj3.clone();
	obj4.translateX(length - lineWidth);

	var group = new THREE.Group();
	group.add(obj);
	group.add(obj2);
	group.add(obj3);
	group.add(obj4);
	group.translateX(-width / 2);
	scene.add(group);
}
//endregion

//region 分区
/** 放置分区和设置分区名称 */
function addArea(x, z, width, length, scene, name, textColor, font_size, textposition) {
	addPlane(x, z, width, length, scene);
	new THREE.FontLoader().load('./ThreeJs/FZYaoTi_Regular.json', function(font) { //加入立体文字
		var text = new THREE.TextGeometry(name.split("$")[1], {
			font: font, // 设定文字字体
			size: font_size, //尺寸
			height: 0.5 //厚度
		});
		text.computeBoundingBox(); //使用TextGeometry这个类来创建文本，给场景添加必要的文字说明
		//3D文字材质
		var m = new THREE.MeshStandardMaterial({
			color: "#" + textColor
		});
		var mesh = new THREE.Mesh(text, m)
		if (textposition == "左对齐") {
			mesh.position.x = x - width / 2 + 10;
		} else if (textposition == "居中") {
			mesh.position.x = x - 15;
		} else if (textposition == "右对齐") {
			mesh.position.x = x + width / 2 - 60;
		}
		mesh.position.y = 1.3;
		mesh.position.z = z + length / 2 - 20;
		mesh.rotation.x = -Math.PI / 2.0;
		scene.add(mesh);
	});
}
//endregion

//创建墙纹理
//左、右、上、下、后、前面的材质信息
function createWallMaterail() {
	//透明蓝玻璃材质
	var materialBlueClass = new THREE.MeshLambertMaterial({
		color: 0x6495ED,
		opacity: 0.2, //0~1之间0是全透明，1是不透明
		transparent: true //是否开启透明度效果
	}); //材质对象Material，MeshLambertMaterial漫反射
	//高光蓝色材质
	var sphereMaterial = new THREE.MeshPhongMaterial({
		color: 0x0000ff,
		specular: 0x4488ee,
		shininess: 12
	}); //材质对象，有高光效果哟 MeshPhongMaterial镜面反射
}

//region创建墙
function createCubeWall(width, height, depth, angle, material, x, y, z, name) {
	var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
	var cube = new THREE.Mesh(cubeGeometry, material);
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;
	cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
	cube.name = name;
	scene.add(cube);
}
//endregion

//region创建前排柱子
function createPillar(scene) {
	for (var i = 0; i < 10; i++) { //画十棵柱子
		//细的柱子
		var smallTexture = THREE.ImageUtils.loadTexture('ThreeJs/images/灰色水磨石纹理.jpg', {}, function() { //将图片导入到纹理中
			renderer.render(scene, camera);
		});
		var smallPillarGeometry = new THREE.CylinderGeometry(25, 25, 400, 25, 25, false);
		var smallPillarMaterial = new THREE.MeshBasicMaterial({
			map: smallTexture,
		});
		var smallPillar = new THREE.Mesh(smallPillarGeometry, smallPillarMaterial);
		smallPillar.position.set(290 * i - 1280, 200, 2500); //设置mesh3模型对象的xyz坐标为120,0,0
		scene.add(smallPillar);
		//粗的柱子
		var bigTexture = THREE.ImageUtils.loadTexture('ThreeJs/images/白色水磨石.jpg', {}, function() { //将图片导入到纹理中
			renderer.render(scene, camera);
		});
		var bigPillarGeometry = new THREE.CylinderGeometry(55, 55, 90, 25, 25, false);
		var bigPillarMaterial = new THREE.MeshBasicMaterial({
			map: bigTexture,
		});
		var bigPillar = new THREE.Mesh(bigPillarGeometry, bigPillarMaterial);
		bigPillar.position.set(290 * i - 1280, 45, 2500); //设置mesh3模型对象的xyz坐标为120,0,0
		scene.add(bigPillar);
	}
}
//endregion

//region创建第二层柱子
function createPillarUp(scene) {
	for (var i = 0; i < 14; i++) { //画14棵柱子
		//细的柱子
		var smallTexture = THREE.ImageUtils.loadTexture('ThreeJs/images/灰色水磨石纹理.jpg', {}, function() { //将图片导入到纹理中
			renderer.render(scene, camera);
		});
		var smallPillarGeometry = new THREE.CylinderGeometry(45, 45, 930, 25, 25, false);
		var smallPillarMaterial = new THREE.MeshBasicMaterial({
			map: smallTexture,
		});
		var smallPillar = new THREE.Mesh(smallPillarGeometry, smallPillarMaterial);
		smallPillar.position.set(290 * i - 1880, 1540, 1510); //设置mesh3模型对象的xyz坐标为120,0,0
		scene.add(smallPillar);
		//粗的柱子
		var bigTexture = THREE.ImageUtils.loadTexture('ThreeJs/images/白色水磨石.jpg', {}, function() { //将图片导入到纹理中
			renderer.render(scene, camera);
		});
		var bigPillarGeometry = new THREE.CylinderGeometry(80, 80, 100, 25, 25, false);
		var bigPillarMaterial = new THREE.MeshBasicMaterial({
			map: bigTexture,
		});
		var bigPillar = new THREE.Mesh(bigPillarGeometry, bigPillarMaterial);
		bigPillar.position.set(290 * i - 1880, 1100, 1510); //设置mesh3模型对象的xyz坐标为120,0,0
		scene.add(bigPillar);
	}
}
//endregion

//region 创建门和窗
///创建门_左侧
function createDoor_left(width, height, depth, angle, x, y, z, name) {
	var loader = new THREE.TextureLoader();
	loader.load("ThreeJs/images/door_left.png" /*tpa=http://www.yuyaowujin.top/ThreeJs/images/door_left.png*/ ,
		function(texture) {
			var doorgeometry = new THREE.BoxGeometry(width, height, depth);
			doorgeometry.translate(50, 0, 0);
			var doormaterial = new THREE.MeshBasicMaterial({
				map: texture,
				color: 0xffffff
			});
			doormaterial.opacity = 1.0;
			doormaterial.transparent = true;
			var door = new THREE.Mesh(doorgeometry, doormaterial);
			door.position.set(x, y, z);
			door.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
			door.name = name;
			scene.add(door);
		});
}

//创建门_右侧
function createDoor_right(width, height, depth, angle, x, y, z, name) {
	var loader = new THREE.TextureLoader();
	loader.load("ThreeJs/images/door_right.png" /*tpa=http://www.yuyaowujin.top/ThreeJs/images/door_right.png*/ ,
		function(texture) {
			var doorgeometry = new THREE.BoxGeometry(width, height, depth);
			doorgeometry.translate(-50, 0, 0);
			var doormaterial = new THREE.MeshBasicMaterial({
				map: texture,
				color: 0xffffff
			});
			doormaterial.opacity = 1.0;
			doormaterial.transparent = true;
			var door = new THREE.Mesh(doorgeometry, doormaterial);
			door.position.set(x, y, z);
			door.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针8
			door.name = name;
			scene.add(door);
		});
}

//创建窗户
function createWindow(width, height, depth, angle, x, y, z, name) {
	var loader = new THREE.TextureLoader();
	loader.load("ThreeJs/images/window.png" /*tpa=http://www.yuyaowujin.top/ThreeJs/images/window.png*/ , function(
		texture) {
		var windowgeometry = new THREE.BoxGeometry(width, height, depth);
		var windowmaterial = new THREE.MeshBasicMaterial({
			map: texture,
			color: 0xffffff
		});
		windowmaterial.opacity = 1.0;
		windowmaterial.transparent = true;
		var window = new THREE.Mesh(windowgeometry, windowmaterial);
		window.position.set(x, y, z);
		window.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
		window.name = name;
		scene.add(window);
	});
}

//返回墙对象
function returnWallObject(width, height, depth, angle, material, x, y, z, name) {
	var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
	var cube = new THREE.Mesh(cubeGeometry, material); //Mesh( geometry, material ) geometry是它的形状，material是它的材质。 
	cube.position.x = x;
	cube.position.y = y;
	cube.position.z = z;
	cube.rotation.y += angle * Math.PI;
	cube.name = name;
	return cube;
}

//墙上挖门，通过两个几何体生成BSP对象
function createResultBsp(bsp, objects_cube, material) {
	var BSP = new ThreeBSP(bsp);
	for (var i = 0; i < objects_cube.length; i++) {
		var less_bsp = new ThreeBSP(objects_cube[i]);
		BSP = BSP.subtract(less_bsp);
	}
	var result = BSP.toMesh(material);
	result.material.flatshading = THREE.FlatShading;
	result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
	result.geometry.computeVertexNormals();
	result.material.needsUpdate = true; //更新纹理
	result.geometry.buffersNeedUpdate = true;
	result.geometry.uvsNeedUpdate = true;
	scene.add(result);
}
//endregion创建门窗

//region 画顶部半球体
function dingQiu(r) {
	var sphereGeom = new THREE.SphereGeometry(r, 8, 2, 0, Math.PI * 2, 0, Math.PI / 2);
	//高光蓝色材质
	var sphereMaterial = new THREE.MeshPhongMaterial({
		color: 0x2F4F4F,
		specular: 0xAFEEEE,
		shininess: 5
	}); //材质对象，有高光效果哟 MeshPhongMaterial镜面反射
	var edgesMtl = new THREE.LineBasicMaterial({
		color: 0xF0F8FF
	});//边缘线材质
	var sphere = new THREE.Mesh(sphereGeom.clone(), sphereMaterial);
	//添加边缘线
	var sphereEdges = new THREE.EdgesGeometry(sphereGeom, 1);
	var sphereLine = new THREE.LineSegments(sphereEdges, edgesMtl);
	sphere.add(sphereLine);
	sphere.position.set(0, 2000, 0);
	scene.add(sphere);
}
//endregion创建门窗


//region 书架存书位
/** 放置单层书架 */
/** x,y,z 整个模型在场景中的位置 */
/** plane_x,plane_y,plane_z 货架板面的长高宽 */
/** holder_x,holder_y,holder_z 货架支架的长高宽 */
/** scene,name,num 要添加的场景,货架的名字,单层货架的库位数量 */
/* 在HTML文件的init()方法中添加addShelf(scene);就可以实现添加货架的功能 */
function addRack(x, y, z, plane_x, plane_y, plane_z, holder_x, holder_y, holder_z, scene, name, num) {
	var plane = new THREE.BoxGeometry(plane_x, plane_y, plane_z / num);
	var gz = [];
	for (var i = 0; i < num; i++) {
		gz.push(z + plane_z / num / 2 + (plane_z / num) * i);
		var obj = new THREE.Mesh(plane, RackMat);
		obj.position.set(x, y, gz[i]);
		var msg = name + "$" + (GET_COLUMN_NUM() - i);

		var storageUnitId = msg.split("$")[1] + "$" + msg.split("$")[3] + "$" + msg.split("$")[4];

		//添加存书位
		var storageUnit_obj = new storageUnit(msg.split("$")[0],
			msg.split("$")[1],
			msg.split("$")[2],
			msg.split("$")[3],
			msg.split("$")[4],
			x, y, gz[i], storageUnitId);
		storageUnitList.push(storageUnit_obj);
		storageUnitSize++;

		var Unit = getStorageUnitById(msg.split("$")[1], msg.split("$")[3], msg.split("$")[4]);
		obj.name = "存书位：" + "$" + Unit.storageUnitId;
		scene.add(obj);
	}

	var holder = new THREE.BoxGeometry(holder_x, holder_y, holder_z);
	var obj2 = new THREE.Mesh(holder, RackMat, 0);
	var obj3 = new THREE.Mesh(holder, RackMat, 0);
	var obj4 = new THREE.Mesh(holder, RackMat, 0);
	var obj5 = new THREE.Mesh(holder, RackMat, 0);

	obj2.position.set(x - plane_x / 2 + holder_x / 2, y - holder_y / 2 - plane_y / 2, z + holder_z / 2);
	obj3.position.set(x + plane_x / 2 - holder_x / 2, y - holder_y / 2 - plane_y / 2, z + holder_z / 2);
	obj4.position.set(x - plane_x / 2 + holder_x / 2, y - holder_y / 2 - plane_y / 2, z + plane_z - holder_z / 2);
	obj5.position.set(x + plane_x / 2 - holder_x / 2, y - holder_y / 2 - plane_y / 2, z + plane_z - holder_z / 2);
	scene.add(obj2);
	scene.add(obj3);
	scene.add(obj4);
	scene.add(obj5);
}

/** 放置一叠书架 */
/** stack_num 书架的叠数 */
function addStackOfRack(x, y, z, plane_x, plane_y, plane_z, holder_x, holder_y, holder_z, scene, name, num, stack_num) {
	for (var i = 0; i < stack_num; i++) {
		addRack(x, y * (i + 1), z, plane_x, plane_y, plane_z, holder_x, holder_y, holder_z, scene, name + "$" + (i + 1), num);
	}
}

/** 根据书架配置表添加书架 */
function addShelf(scene, n) {
	var shelf_list = GET_SHELF_LIST(n);
	shelfSize = shelf_list.length; //总共的书架个数
	for (var i = 0; i < shelfSize; i++) {
		var shelf_obj = new shelf(shelf_list[i].StorageZoneId,
			shelf_list[i].shelfId,
			shelf_list[i].shelfName,
			GET_PLANE_LENGTH(), GET_PLANE_WIDTH(), GET_PLANE_HEIGHT(),
			GET_HOLDER_LENGTH(), GET_HOLDER_WIDTH(), GET_HOLDER_HEIGHT(),
			shelf_list[i].x,
			shelf_list[i].y,
			shelf_list[i].z,
			GET_LAYER_NUM(), GET_COLUMN_NUM());
		shelfList.push(shelf_obj);
	}

	for (var i = 0; i < shelfSize; i++) {
		addStackOfRack(shelfList[i].positionX, shelfList[i].positionY, shelfList[i].positionZ, shelfList[i].planeLength,
			shelfList[i].planeHeight, shelfList[i].planeWidth, shelfList[i].holderLength, shelfList[i].holderHeight, shelfList[
				i].holderWidth, scene, shelfList[i].storageZoneId + "$" + shelfList[i].shelfId + "$" + shelfList[i].shelfName,
			shelfList[i].columnNum, shelfList[i].layerNum);
	}
}

//region 货物
/** 放置单个货物 */
function addCargo(x, y, z, box_x, box_y, box_z, scene, name) {
	var geometry = new THREE.BoxGeometry(box_x, box_y, box_z);
	var obj = new THREE.Mesh(geometry, CargoMat);
	obj.position.set(x, y, z);
	obj.name = name;
	scene.add(obj);
}

/** 添加单个货位上的货物 */
function addOneUnitCargos(shelfId, inLayerNum, inColumnNum, scene) {
	var storageUnit = getStorageUnitById(shelfId, inLayerNum, inColumnNum);
	var shelf = getShelfById(storageUnit.shelfId);
	var storageUnitid = storageUnit.storageUnitId;
	var x = storageUnit.positionX;
	var y = storageUnit.positionY + GET_BOX_SIZE() / 2 + shelf.planeHeight / 2;
	var z = storageUnit.positionZ;
	// addCargo(x, y, z, GET_BOX_SIZE() * 2, GET_BOX_SIZE() * 0.8, GET_BOX_SIZE() * 3, scene, "货物" + "$" + storageUnitid)
	addCargo(x, y, z, GET_BOX_SIZE() * 2, GET_BOX_SIZE() * 0.8, GET_BOX_SIZE() * 3, scene, "书本")
}
//endregion

//region寻找书架
function searchShelf(shelfID) {
	for (var i = 0; i < scene.children.length; i++) {
		oo1 = getShelfById(shelfID);
		var posx = oo1.positionX;
		var posy = oo1.positionY;
		var posz = oo1.positionZ;
		var cubeGeometry = new THREE.BoxGeometry(100, 250, 500);
		var material = new THREE.MeshLambertMaterial({
			color: 0xFF0000,
			opacity:0.2, //0~1之间0是全透明，1是不透明
			transparent: true //是否开启透明度效果
		}); 
		var edgesMtl = new THREE.LineBasicMaterial({
			color: 0xff0000
		});
		cube = new THREE.Mesh(cubeGeometry, material);
		cube.position.set(posx,posy,posz+190);
		var cubeEdges = new THREE.EdgesGeometry(cubeGeometry, 0.1);
		var cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
		cube.add(cubeLine);
		scene.add(cube);
		break;
	}
}
//endregion
