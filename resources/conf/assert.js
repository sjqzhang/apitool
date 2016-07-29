function getIndex(ns){
  var m=ns.match(/\[\d+\]/ig)
  if(m) {
	return m[0].replace(/\[|\]/ig,'');
  }
 return -1;
}

function getColon(ns) {


}

function getName(ns){
  var m=ns.match(/\[\d+\]/ig)
  if(m) {
	return ns.replace(m[0],'');
  }
 return -1;
}

function isJson(str){
	try{
	   eval('('+str+')');
		return true;
	}
	catch(e)
	{
		return false;
	}
}

function toJson(str){
	if(isJson(str)){
		return  eval('('+str+')');
	} else {
		return {};
	}
}

function regex(str,pat) {
    if(str.match(pat)) {
	return true;
	} else {
	return false;
	}
}

function txt(str,text){
  if(str.indexOf(text)>=0) {
    return true;
  } else {
    return false;
  }
}

function test(){


}

function split(str,pat){
  
}



function json(str,nodes){
	var json=toJson(str);
	var ns= nodes.split(/\-\>/ig);
	var i=0;
	var v='';
	while(i<ns.length) {
	  if(ns[i].indexOf(':')>=0) {
	    v= ns[i].substring(1,ns[i].length);
		if(json==v) {
			return true;
		}
	  } else {
	    v='';
	  }
	  var pos= getIndex(ns[i]);
	  if(pos>=0) {
	   var n= getName(ns[i]);
	   json=json[n][pos];
	  } else if(json[ns[i]]!=undefined) {
	    json=json[ns[i]];
	  } else {
		return false;
	  }
	  i++;
	}
	return true;

}






//alert( json('{"aa":"bb","cc":{"abc":{"ab":"dddddd"}},"dd":[{"aa":"cc"}]}',"cc->abc[2]->ab->:dddddd"));

//alert( json('{"aa":"bb","cc":{"abc":{"ab":"dddddd"}},"dd":[{"aa":"cc"},{"aa":"aaa"},{"aa":"ff"}]}',"dd[1]->aa->:aaa"));

//alert( json('{"aa":"bb","cc":{"abc":{"ab":"dddddd"}},"dd":[{"aa":"cc"},{"aa":"aaa"},{"aa":"ff"}]}',"dd[1]->aa->:aaa"));


//alert(regex('{"aa":"bb","cc":{"abc":{"ab":"dddddd"}}','abc'));