/**
 * 使用说明 格式: { '模块' : [ '请求的URL1||JSON参数,请求的URL2||JSON参数]}
 */
var apis = {

	'广场接口' : [
			'热||/c/android/photo/showhot||{"start":"0","limit":"10"}',
			'新||/android/photo/shownew||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'标签||/c/android/photo/showtag||{"tagId":"232","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'活动||/c/android/photo/showactivity||{"activityId":"2","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}' ],
	'详情接口' : [
			'照片详情||/c/android/photo/view||{"imgId":"1"}',
			'赞||/android/photo/increaselikes||{"imgId":"1",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'取消赞||/android/photo/deletelike||{"imgId":"1"}',
			'添加评论||/android/comments/create||{"imgId":"1","replyUserId":"4245077(可选)","replyCommentId":"287(可选)","comment":"评论内容",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'删除评论||/android/comments/delete||{"commentId":"1"}',
			'添加浏览||/android/photo/addview||{"imgId":"1"}',
			'评论列表||/android/comments/list||{"imgId":"1","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'投诉||/android/system/complain||{"imgId":"1"}',
			'是否赞过||/android/photo/liked||{"imgId":"1"}',
			'删除||/android/photo/delete||{"imgId":"1"}',
			'热门标签||/android/tag/recommand||{"start":"0","limit":"10"}',
			'该图的TAG||/android/photo/tags||{"imgId":"7","start":"0","limit":"10"}',
			'贴标签||/android/photo/pintag||{"imgId":"5","tagName":"标签名称","continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'活动详情||/android/activity/view||{"activityId":"2"}',
			'活动列表||/android/activity/list||{"startTime":"2012-13-20(闭区间)","endTime":"2014-12-30(开区间)","posId":"1000","limit":"10","pageForward":"asc向前翻|desc向后翻" }' ],
	'用户接口' : [
			'用户主页||/android/photo/showpost||{"userId":"1462350","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的主页||/android/photo/selfpost||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'用户喜欢||/android/photo/showlike||{"userId":"1462350","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的喜欢||/android/photo/selflike||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的足迹||/android/user/showmark||{"start":"0","limit":"10"}',
			'我的消息||/android/user/showmsg||{"limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'删除消息||/android/message/delete||{"messageId":"10"}',
			'我的消息数||/android/user/msgcount',
			'用户信息||/android/user/view||{"userId":"1462350"}',
			'用户热度||/android/user/hotcount||{"userId":"1462350"}',
			'修改用户||/android/user/modify||{"aliasName":"用户昵称","comment":"个性签名"}',
			'设置头像||/android/user/headicon||{"reset":"1","file":"文件上传组件"}',
			'我的信息||/android/user/self||{}',
			'用户标签||/android/user/pinedtags||{"userId":"1462350","start":"0","limit":"10"}',
			'关注用户||/android/user/followed||{"userId":"1462350","limit":"10","pageForward":"asc向前翻|desc向后翻","cdate":"0"}' ],
	'上传接口' : [

			'图片预上传||/android/photo/preUpload||{"fingerprint":"指纹","file":"请参考　http://mshow.meizu.com/web/oauth/preUpload.html"}',
			'照片上传||/android/photo/post||{"file":"这里要用文件组件","device":"nokia lumia920","activityId":"2","desc":"这里是描述","filterName":"滤镜名称","tag":"新增标签1","tag":"新增标签2","tag":"新增标签3","tagId":"1","tagId":"2",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'推荐的标签||/android/tag/recommand||{"start":"0","limit":"10"}' ],
	'搜索接口' : [
			'/android/search/user||{"keyWord":"a","start":"0","limit":"10"}',
			'/android/search/tag||{"keyWord":"a","start":"0","limit":"10"}',
			'/android/search/photo||{"keyWord":"a","start":"0","limit":"10"}' ],
	'认证接口' : [
			'FLYME登录||/android/oauth/flyme||{"token":"fY3qICPZxliE9vy_RyDBu2XwA2P9p577N-8przAxAQxe7ybqwmeVbHBfCZoIRYoIZKoUk3fN03uGBPSSh4wHLAgKF851kcshUogpTfmn7pmYasRO8CN7e04rgcDYZDiJFRE7uY2FFtXvSOxMQZ19zi-wG8Q_a_mGNnU9q3a0VNU*lY2uzrUoQW61LTG1BOWyuDwv4S7U53Yc6Q0NpQguIPyfJma6lqL1TR-fb-Z6lSV0Sw6_QfE0Lbu153pG8YqKlOFK95N69dUT2Te1EA0HxunqW1jUhVDagJVSKPwjXseHY8Xw4VxXXJlSFuoaGDMUA_y0AlmpIiqBWqSHWXKku-KQzWdk0bgXr6j91KPQGilfNzgHmoKc65c09YnhYvAvGqyjZCQ2LL-ag0ZmEUwnkDezVK1riSBvEMoYyPwAnCe4soZeHrrj2eIKYVt6eBfPrzrdMuwxUYT0N6OMp-kLCdY5xSkXB2JoqbunAUTjv2VAwVel4jaILQbR5cvtRLKNecVisT6ZiQcIblK_NZ9Ez4OWi2yyNsqiDO2O80FgBa6Pm8wr0I-otp0vDnL9NJScUg"}',
			'FLYME登出||/android/oauth/logout||{}' ],
	'系统更新接口' : [ '检查系统是否需要更新||/android/system/checkUpdate||{"version":"1"}' ]
};

var apis2 = {

	'广场接口' : [
			'热||/browser/photo/showhot||{"start":"0","limit":"10"}',
			'新||/browser/photo/shownew||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'标签||/browser/photo/showtag||{"tagId":"232","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'地图||/browser/photo/mapview||{"start":"0","limit":"10"}',
			'地图热图||/browser/photo/maphot||{"start":"0","limit":"10"}',
			'城市图片||/browser/photo/showcity||{"province":"province","city":"city","posId":"posId","start":"0","limit":"10"}',
			'活动||/browser/photo/showactivity||{"activityId":"232","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}' ],
	'详情接口' : [
			'照片详情||/browser/photo/view||{"imgId":"1"}',
			'赞||/browser/photo/increaselikes||{"imgId":"1",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'取消赞||/browser/photo/deletelike||{"imgId":"1"}',
			'添加评论||/browser/comments/create||{"imgId":"1","replyUserId":"4245124(可选)","replyCommentId":"287(可选)","comment":"评论内容",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'删除评论||/browser/comments/delete||{"commentId":"1"}',
			'评论列表||/browser/comments/list||{"imgId":"1","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"posId从哪条记录开始"}',
			'喜欢的用户||/browser/photo/likeusers||{"imgId":"1","start":"0","limit":"10"}',
			'该图的TAG||/browser/photo/tags||{"imgId":"7","start":"0","limit":"10"}',
			'是否赞过||/browser/photo/liked||{"imgId":"7"}',
			'投诉||/browser/system/complain||{"imgId":"1"}',
			'删除||/browser/photo/delete||{"imgId":"1"}',
			'热门标签||/browser/tag/recommand||{"start":"0","limit":"10"}',
			'贴标签||/browser/photo/pintag||{"imgId":"5","tagName":"标签名称",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'活动详情||/browser/activity/view||{"activityId":"2"}',
			'活动列表||/browser/activity/list||{"startTime":"2012-12-20(闭区间)","endTime":"2014-12-30(开区间)","posId":"1000","limit":"10","pageForward":"asc向前翻|desc向后翻" }' ],
	'用户接口' : [
			'用户主页||/browser/photo/showpost||{"userId":"1462350","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的主页||/browser/photo/selfpost||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'用户喜欢||/browser/photo/showlike||{"userId":"1462350","start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的喜欢||/browser/photo/selflike||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'我的足迹||/browser/user/showmark||{"start":"0","limit":"10"}',
			'我的消息||/browser/user/showmsg||{"start":"0","limit":"10","pageForward":"asc向前翻|desc向后翻","posId":"0"}',
			'删除消息||/browser/message/delete||{"messageId":"10"}',
			'我的消息数||/browser/user/msgcount',
			'用户信息||/browser/user/view||{"userId":"1462350"}',
			'用户热度||/browser/user/hotcount||{"userId":"1462350"}',
			'修改用户||/browser/user/modify||{"aliasName":"用户昵称","comment":"个性签名"}',
			'设置头像||/browser/user/headicon||{"reset":"1","file":"文件上传对像"}',
			'我的信息||/browser/user/self||{}',
			'用户标签||/browser/user/pinedtags||{"userId":"1462350","start":"0","limit":"10"}',
			'关注用户||/android/user/followed||{"userId":"1462350","limit":"10","pageForward":"asc向前翻|desc向后翻","cdate":"0"}' ],
	'上传接口' : [
			'照片上传||/browser/photo/post||{"file":"这里要用文件组件","device":"nokia lumia920","activityId":"2","desc":"这里是描述","filterName":"滤镜名称","tag":"新增标签1","tag":"新增标签2","tag":"新增标签3","tagId":"1","tagId":"2",	"continent":"洲","country":"国","province":"省","city":"市","district":"区","street":"街","streetNumber":"街道号","lng":"经度number(10,6)","lng":"经度number(10,6)","lat":"纬度number(10,6)"}',
			'推荐的标签||/browser/tag/recommand||{"start":"0","limit":"10"}' ],
	'搜索接口' : [
			'/browser/search/user||{"keyWord":"a","start":"0","limit":"10"}',
			'/browser/search/tag||{"keyWord":"a","start":"0","limit":"10"}',
			'/browser/search/photo||{"keyWord":"a","start":"0","limit":"10"}' ],
	'地区接口' : [

	'取城市||/browser/system/getcity||{"pid":"1"}',
			'取城市||/browser/system/getcityinfo||{}' ],
	'认证接口' : [
			'FLYME登录||/browser/oauth/toflymelogin||{"说明":"拷出来看：这个接口不是异步调用的，请求即定向到flyme,flyme认证后会自动跳转到oauth/flyme接口"}',
			'FLYME登录||/browser/oauth/flyme||{"token":"fY3qICPZxliE9vy_RyDBu2XwA2P9p577N-8przAxAQxe7ybqwmeVbHBfCZoIRYoIZKoUk3fN03uGBPSSh4wHLAgKF851kcshUogpTfmn7pmYasRO8CN7e04rgcDYZDiJFRE7uY2FFtXvSOxMQZ19zi-wG8Q_a_mGNnU9q3a0VNU*lY2uzrUoQW61LTG1BOWyuDwv4S7U53Yc6Q0NpQguIPyfJma6lqL1TR-fb-Z6lSV0Sw6_QfE0Lbu153pG8YqKlOFK95N69dUT2Te1EA0HxunqW1jUhVDagJVSKPwjXseHY8Xw4VxXXJlSFuoaGDMUA_y0AlmpIiqBWqSHWXKku-KQzWdk0bgXr6j91KPQGilfNzgHmoKc65c09YnhYvAvGqyjZCQ2LL-ag0ZmEUwnkDezVK1riSBvEMoYyPwAnCe4soZeHrrj2eIKYVt6eBfPrzrdMuwxUYT0N6OMp-kLCdY5xSkXB2JoqbunAUTjv2VAwVel4jaILQbR5cvtRLKNecVisT6ZiQcIblK_NZ9Ez4OWi2yyNsqiDO2O80FgBa6Pm8wr0I-otp0vDnL9NJScUg"}',
			'FLYME登出||/browser/oauth/logout||{}' ]
};