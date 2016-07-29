/**
 * 使用说明 格式: { '模块' : [ '请求的URL1||JSON参数,请求的URL2||JSON参数]}
 */
var apis = {

	'测试接口' : [
			{"desc":"测试一下","request":{"url":"/api/test","param":{"start-开始":"0","limit":"10"},"doc":{'test':'test',"aliasName":"别名"}},"test":{"autoTest":true,"assert":"json"},"monitor":{"isMonitor":true,"cron":"* 5/* * * * *"},"assert":{"expect":"returnCode->:0","rule":"json"}}
			 ]

};

var apis2 = {

	'测试接口' : [
			{"desc":"测试一下","request":{"url":"/api/test","param":{"start-开始":"0","limit":"10"},"doc":{'test':'test',"aliasName":"别名"}},"test":{"autoTest":true,"assert":"json"},"monitor":{"isMonitor":true,"cron":"* 5/* * * * *"},"assert":{"expect":"returnCode->:0","rule":"json"}}
	]
};