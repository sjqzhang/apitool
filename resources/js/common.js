var JsonUti = {
            //定义换行符
            n: "\n",
            //定义制表符
            t: "\t",
            //转换String
            toString:function(obj){
            	 return JsonUti.__writeObj(obj, 1);
            },
            convertToString: function(obj) {
                return JsonUti.__writeObj(obj, 1);
            },
            //写对象
            __writeObj: function(obj    //对象
                    , level             //层次（基数为1）
                    , isInArray) {       //此对象是否在一个集合内
                //如果为空，直接输出null
                if (obj == null) {
                    return "null";
                }
                //为普通类型，直接输出值
                if (obj.constructor == Number || obj.constructor == Date || obj.constructor == String || obj.constructor == Boolean) {
                    var v = obj.toString();
                    var tab = isInArray ? JsonUti.__repeatStr(JsonUti.t, level - 1) : "";
                    if (obj.constructor == String || obj.constructor == Date) {
                        //时间格式化只是单纯输出字符串，而不是Date对象
                        return tab + ("\"" + v + "\"");
                    }
                    else if (obj.constructor == Boolean) {
                        return tab + v.toLowerCase();
                    }
                    else {
                        return tab + (v);
                    }
                }
 
                //写Json对象，缓存字符串
                var currentObjStrings = [];
                //遍历属性
                for (var name in obj) {
                    var temp = [];
                    //格式化Tab
                    var paddingTab = JsonUti.__repeatStr(JsonUti.t, level);
                    temp.push(paddingTab);
                    //写出属性名
                    temp.push(name + " : ");
 
                    var val = obj[name];
                    if (val == null) {
                        temp.push("null");
                    }
                    else {
                        var c = val.constructor;
 
                        if (c == Array) { //如果为集合，循环内部对象
                            temp.push(JsonUti.n + paddingTab + "[" + JsonUti.n);
                            var levelUp = level + 2;    //层级+2
 
                            var tempArrValue = [];      //集合元素相关字符串缓存片段
                            for (var i = 0; i < val.length; i++) {
                                //递归写对象                         
                                tempArrValue.push(JsonUti.__writeObj(val[i], levelUp, true));
                            }
 
                            temp.push(tempArrValue.join("," + JsonUti.n));
                            temp.push(JsonUti.n + paddingTab + "]");
                        }
                        else if (c == Function) {
                            temp.push("[Function]");
                        }
                        else {
                            //递归写对象
                            temp.push(JsonUti.__writeObj(val, level + 1));
                        }
                    }
                    //加入当前对象“属性”字符串
                    currentObjStrings.push(temp.join(""));
                }
                return (level > 1 && !isInArray ? JsonUti.n : "")                       //如果Json对象是内部，就要换行格式化
                    + JsonUti.__repeatStr(JsonUti.t, level - 1) + "{" + JsonUti.n     //加层次Tab格式化
                    + currentObjStrings.join("," + JsonUti.n)                       //串联所有属性值
                    + JsonUti.n + JsonUti.__repeatStr(JsonUti.t, level - 1) + "}";   //封闭对象
            },
            __isArray: function(obj) {
                if (obj) {
                    return obj.constructor == Array;
                }
                return false;
            },
            __repeatStr: function(str, times) {
                var newStr = [];
                if (times > 0) {
                    for (var i = 0; i < times; i++) {
                        newStr.push(str);
                    }
                }
                return newStr.join("");
            }
        };
 
 
 
 function request(paras){ 
	 var url = location.href; 
	 var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	 var paraObj = {} ;
	 for (i=0; j=paraString[i]; i++){ 
	 paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	 } 
	 var returnValue = paraObj[paras.toLowerCase()]; 
	 if(typeof(returnValue)=="undefined"){ 
	 return ""; 
	 }else{ 
	 return returnValue; 
	 } 
	 } 
 
   function json2bean(json){
	   
	   function firstUpper(field){
		   return field.substring(0,1).toUpperCase()+field.substring(1,field.length);
	   }
	   function fieldName(field){
			 var pa=field.split(/\_/);
			 var alias=pa[0];
			  for(var j=1;j<pa.length;j++)
			 {
			   alias+= pa[j][0].toUpperCase()+ pa[j].substring(1,pa[j].length);
			 }
			 return alias;
	   }
	   
	   function field(f){
		  return f.replace(/[A-Z]/g,function(s,p,src){
			   return '_'+s.toLowerCase();
		   })
	   }

	var tpl_def ="\tprivate {type} {field};\r\n";
	var tpl_set= "\tpublic void set{field2}({type} {field}){\r\n\t\tthis.{field}={field};\r\n\t}\r\n";
	var tpl_get= "\tpublic {type} get{field2}(){\r\n\t\treturn this.{field};\r\n\t}\r\n";
	var tpl_class='class XX\r\n{\r\n{define}{method}}\r\n';
	var tpl_table='DROP TABLE `XX`;\r\nCREATE TABLE `XX` (\r\n\t{colums}) ENGINE=INNODB DEFAULT CHARSET=utf8;';
	var tpl_field="`{field}` {type}  NULL COMMENT '',\r\n\t";
	json=json['returnValue']||json['reply']?json['returnValue']||json['reply']:json;
	var define='';
	var method='';
	var fileds='';
	for(var key in json){
		if(key.match(/^\d+$/)) 
		{
		  json=json[key];
		  break;
		}
	}
	var type='Object';
	var ftype=' int(10) ';
	 for( var pro in json) {
		 var opro=pro;
		 pro= fieldName(pro);
		 fn=field(pro);
		 json[pro]=json[opro];
		  if( typeof(json[pro])== 'number') {
			  var t=''+json[pro];
			  if(t.match(/^\d+$/)) {
				  type='Integer';
				  ftype=' int(10) ';
				  fileds+=tpl_field.replace(/{field}/ig,fn).replace(/{type}/ig,ftype);
				  define+= tpl_def.replace(/{field}/ig,pro).replace(/{type}/ig,type);
				  method+=tpl_set.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
				  method+=tpl_get.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
				  } else {
					  type='Double';
					  ftype=' decimal(10,2) ';
					  fileds+=tpl_field.replace(/{field}/ig,fn).replace(/{type}/ig,ftype);
					  define+= tpl_def.replace(/{field}/ig,pro).replace(/{type}/ig,type);
					  method+=tpl_set.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
					  method+=tpl_get.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
				 }
		  }else if(typeof(json[pro])== 'object') {
			  if(json[pro] instanceof Date){
				  type='java.util.Date';
				  ftype=' datetime ';
				  fileds+=tpl_field.replace(/{field}/ig,fn).replace(/{type}/ig,ftype);
				  define+= tpl_def.replace(/{field}/ig,pro).replace(/{type}/ig,type);
				  method+=tpl_set.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
				  method+=tpl_get.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
			  } else {
				  type='Object';
				  ftype=' varchar(50) ';
				  fileds+=tpl_field.replace(/{field}/ig,fn).replace(/{type}/ig,ftype);
				  define+= tpl_def.replace(/{field}/ig,pro).replace(/{type}/ig,type);
				  method+=tpl_set.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
				  method+=tpl_get.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
			  }

		  } else {
			  type='String';
			  ftype=' varchar(50) ';
			  fileds+=tpl_field.replace(/{field}/ig,fn).replace(/{type}/ig,ftype);
			  define+= tpl_def.replace(/{field}/ig,pro).replace(/{type}/ig,type);
			  method+=tpl_set.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
			  method+=tpl_get.replace(/{field}/ig,pro).replace(/{field2}/ig,firstUpper(pro)).replace(/{type}/ig,type);
		  }
	   }
	 var cl=tpl_class.replace(/{define}/ig,define).replace(/{method}/ig,method);
	 var tl=tpl_table.replace(/{colums}/ig,fileds.substring(0,fileds.length-4)+'\r\n');
	 result={'class':cl,'table':tl};
	 return  result;
	   
   }
   
   
   function obj2str(o){
	    var r = [];
	    if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
	    if(typeof o == "object"){
	        if(!o.sort){
	            for(var i in o)
	                r.push('"'+i+'":'+obj2str(o[i]));
	            if(!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
	                r.push("toString:"+o.toString.toString());
	            }
	            r="{"+r.join()+"}";
	        }else{
	            for(var i =0;i<o.length;i++)
	                r.push(obj2str(o[i]));
	            r="["+r.join()+"]";
	        }
	        return r;
	    }
	    return o.toString();
	}
   
   
	function re2array(pat,str){
		var tmp=pat.exec(str);
		var result=[];var j=0;
		var c=0;
		while(tmp&&c<200){
			try{
				c=c+1; 
				var tr=[]; 
				for ( var i = 1; i < tmp.length; i++) {
					if(!tmp[i]) {
						tmp[i]='';	 
					}
					tr.push('"'+i+'":"'+tmp[i].replace(/\n/ig,'').replace(/\"/ig,'')+'",');
				}
				if(tr.length>0) {
					var t=tr.join('');
					result[j]= eval('({'+ t.substring(0,t.length-1)+'})');
				}
				j++;
				tmp=pat.exec(str);
			}catch(e) {
				if(console&&console.log) {
					console.log(tr);
				} 
			}
		}
		return result;
	}