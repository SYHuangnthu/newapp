var profileDataDB = new Mongo.Collection("profileData");//建立一個變數=新建立的小資料庫
var conversationLogDB = new Mongo.Collection("conversationLog");

var stupidResponse = function(msg) {
	return "What is "+msg+"?";
};

Meteor.startup(function() {
	//profileDataDB.remove({});//清空資料庫(放個空物件=沒有條件的清空
	conversationLogDB.remove({});
	let searchResults = conversationLogDB.find();
	if(searchResults.fetch().length < 1){
		conversationLogDB.insert(
			{
				source: "ELIZA",
				msg: "How are you doing",
				time: new Date()
			}
		);
	}
	console.log(conversationLogDB.find().fetch());
});

Meteor.methods({
	msgReceiver: function(msg) {
		conversationLogDB.insert(
			{
				source: "You",
				msg: msg,//左邊是欄位名稱,右邊是收到的變數
				time: new Date,//取得伺服器目前時間
			}
		);//在logDB放入msg
		let ELIZAResponse = stupidResponse(msg);
		conversationLogDB.insert(
			{
				source: "ELIZA",
				msg: ELIZAResponse,//左邊是欄位名稱,右邊是收到的變數
				time: new Date,//取得伺服器目前時間
			}
		);
		//console.log(conversationLogDB.find().fetch());//find無條件找出+fetch變陣列
		//return stupidResponse(msg);
		return;
	},
	serverFunc: function(data1, data2) {
		console.log(data1);
		console.log(data2);
		return "done!";
	},
	addNumbers: function(nums) {
		let result = 0;
		for(let index=0 ; index<nums.length ; index++) {
			result = result + nums[index];
		}
		//console.log(result);
		return result;
	}
});