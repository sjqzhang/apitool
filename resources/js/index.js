
 
   


   
   
   function bindApi()
   {
	   
		 var pf=request('platform');
		 $('#tool_container').hide();
		 if(pf=='browser') {
			 apis=apis2; 
		 } else if(pf=='tool'){
			 $('#tool_container').show();
		 }
		 
		var apitype='';
		for(var api in apis){
			apitype+=	'<option value="'+api+'">'+api+'</option>';
		}
		
		
		
		 $('#apiname').change(function(){
			var param=$(this).find('option:selected').attr('param'); 
			var tpl= $('#tpl_param').html();
			try{
			var p=eval('('+ decodeURIComponent( param)+')');
			$('#left_part_param').html('');
			for(var key in p){
				var tmp=tpl;
				var desc='';
				var key2='';
				var keys=key.split(/\-/ig);
				if(keys.length>1){
					var key2=keys[0];
					desc=keys[1];
				} else {
					key2=keys[0];
				}
				tmp=tmp.replace(/value\=["]?Key["]?/,'value="'+key2+'"');
				if(typeof(p[key])=='object') {
				  tmp=tmp.replace(/value\=["]?Value["]?/,'value="'+obj2str(p[key]).replace(/\"/ig,"'")+'"');
				} else {
				tmp=tmp.replace(/value\=["]?Value["]?/,'value="'+p[key]+'"');
				}
				tmp=tmp.replace(/{desc}/,desc);
				$('#left_part_param').append(tmp);
				$('.del').click(function() {
					$(this).parent().remove();
				})//end click;
			}
			
			}catch(E) {
				alert('参数错误,请联系开发人员')
			}
		 });
		
		$('#apitype').change(function(){
			  var type=$(this).val();
			  var apitmp='';
			    var apinames= apis[type];
			    
			    for(var index in apinames ){
			    	var url=apinames[index];
			    	
			    	try {
			    		var params=apinames[index]; 
				    	 
				    		apitmp+='<option param="'+ encodeURIComponent(obj2str(params['request']['param'])) +'" value="'+params['request']['url']+'">'+params['desc']+'\t'+params['request']['url']+'</option>';
				    		try {
					    		if(params['request']['doc']) {
					    			$('#response').attr('title',JsonUti.toString(params['request']['doc'])); 	
					    		} 
				    		} catch (E){
				    			
				    		}
				 
			    		
			    	} catch (e) {
				    	var params=url.split(/\|\|/g);
				    	if(params.length==3){
				    		apitmp+='<option param="'+ encodeURIComponent(params[2]) +'" value="'+params[1]+'">'+params[0]+'\t'+params[1]+'</option>';
				    	} else {
				    		try{
				    		var json= eval('('+ decodeURIComponent( params[1])+')');
				    		} catch(E){
				    			
				    		}
				    		if(json) {
				    			apitmp+='<option param="'+ encodeURIComponent(params[1]) +'" value="'+params[0]+'">'+params[0]+'</option>';
				    		} else {
				    			apitmp+='<option  value="'+params[1]+'">'+params[0]+'\t'+params[1]+'</option>';
				    		}
				    		
				    	}
						
					}
			    	
			    	
			    	

			    	
			    }
			    $('#apiname').html(apitmp);
			    $('#apiname').trigger('change');
			});
		
		$('#apitype').html(apitype).trigger('change');
   }
   

   

    



	$(document).ready(function() {
	
	 var projectinfo={};
	 
	 $('#projects').change(function(v){
		 projectinfo=projects[$(this).val()];
		 $.getScript('/resources/conf/'+projectinfo.jsfile,function(){
			 bindApi(); 
			
			    //ping 
				$.post('/systemping/',{'__host':projectinfo.host},function(data){
					$('#ping').val(data);  
				}); 
			 
		 });

	 });
	
	 var prohtml='';
	 for(var p in projects){
		 prohtml+=	'<option value="'+p+'">'+p+'</option>';
		}
	 
	 $('#projects').html(prohtml);
	 $('#projects').trigger('change');
	 
		
		/*
		var apitype='';
		for(var api in apis){
			apitype+=	'<option value="'+api+'">'+api+'</option>';
		}


		
		 $('#apiname').change(function(){
			var param=$(this).find('option:selected').attr('param'); 
			var tpl= $('#tpl_param').html();
			try{
			var p=eval('('+ decodeURIComponent( param)+')');
			$('#left_part_param').html('');
			for(var key in p){
				var tmp=tpl;
				var desc='';
				var keys=key.split(/\-/ig);
				if(keys.length>1){
					key=keys[0];
					desc=keys[1];
				} else {
					key=keys[0];
				}
				tmp=tmp.replace(/value\=["]?Key["]?/,'value="'+key+'"');
				tmp=tmp.replace(/value\=["]?Value["]?/,'value="'+p[key]+'"');
				tmp=tmp.replace(/{desc}/,desc);
				$('#left_part_param').append(tmp);
				$('.del').click(function() {
					$(this).parent().remove();
				})//end click;
			}
			
			}catch(E) {
				alert('参数错误,请联系开发人员')
			}
		 });
		
		
		$('#apitype').html(apitype).trigger('change');
		*/
		

		$('#add').click(function() {

			$('#left_part_param').append($('#tpl_param').html());
			$('.del').click(function() {
				$(this).parent().remove();
			})//end click;

		});//end click; 
		
		
		$('#web_request').click(function(){
			//build param
			$('#response,#responsejava').val('');
			var p={};
			var url_param='__host='+projectinfo.host+'&';
			var post_param='{"__host":"'+projectinfo.host+'",';
			$('#left_part_param').find('div').each(function(){
			   	var key=$('input[name=key]',this).val();
				var val=$('input[name=val]',this).val();
				if(key!='Key') {
				url_param+=key+'='+ encodeURIComponent(val)+'&';
				post_param+='"'+key+'":"'+encodeURIComponent(val)+'",';
				}
			});
			post_param+='"'+'_request_uri_'+'":"'+encodeURIComponent($('#apiname').val())+'",';
			if(url_param.length>0)
			url_param=url_param.substring(0,url_param.length-1);
			if(post_param.length>1) {
			post_param=post_param.substring(0,post_param.length-1)+'}';
			 p= eval('('+post_param+')');
			}
			//alert(url_param);
			//alert(post_param);

			//debugger;
			
			var request_type= $('input[name=request_type]:checked').val();
			var url_param=url_param+'&_request_uri_='+encodeURIComponent($('#apiname').val());
			var apiurl=basePath+'/api/apitool'
			$('#request').val('请求方式:\t'+request_type.toUpperCase()+'\r\n请求URL:\t'+projectinfo.host+$('#apiname').val()+ '\r\n请求参数:\t'+url_param);
			if(request_type=='get') {
			
			$.get(apiurl+'?'+url_param,function(data){
				try{
				$('#responsejava').val( json2bean(eval('('+data+')'))['class']);
				}catch(e) {
					
					$('#response').val(data);
					
				};
				try {
				$('#response').val(JsonUti.toString(eval('('+data+')')));
				}catch(e){
					$('#response').val(data);
				}
			});//end get
			} else {
				
				$.post(apiurl,p,function(data){
					try{
					$('#responsejava').val( json2bean(eval('('+data+')'))['class']);
					}catch(e) {
						$('#response').val(data);
					};
					try{
					$('#response').val(JsonUti.toString(eval('('+data+')')));
				}catch(e){
					$('#response').val(data);
				}
				});//end post
			}
			
			
			
			
			
		
			
		});//end click
		
		$('#json2bean').click(function(){
			try{
			$('#responsejava').val( json2bean(eval('('+$('#response').val()+')'))['class']);
			}catch(e){
				alert('请检查参数');
			}
		});//end click;
		
		$('#map2bean').click(function(){
			$('#responsejava').val($('#tpl_map2bean').val());
		});
		
		$('#json2table').click(function(){
			try{
			$('#responsejava').val( json2bean(eval('('+$('#response').val()+')'))['table']);
			}catch(e){
				alert('请检查参数');
			}
		});//end click;
		
		 

		
		$('#cls2url').click(function(){
			
			var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
			
			var reg2=/(?:\s*\/\*\*\n\s*\*([\s\S]+?)\n[\s\S]*?(?:\*\/|@)[\s\S]*?)?public\s*[<>,\w\s]+?\s*(\w+)(\([\s\S]*?\))/g; 
			
			
			
			var pat=/public\s[<,a-zA-Z> ]+?(\w+)(\([\s\S]*?\))/ig;
			
			var src=$('#response').val();  
			
			src=src.replace(/\@RequestParam\(\s*"\w+"\s*\)/ig,''); 
			
			src=src.replace(/HttpServletRequest\s*\w+\,?/ig,''); 
			
			src=src.replace(/HttpServletResponse\s*\w+\,?/ig,''); 
			
			
			
			src=src.replace(/\@Param\(\s*"\w+"\s*\)/ig,'');
			
			src=src.replace(reg, function(word) { 
				//alert(word);  
				if(word.match(pat)){
					return '';
				} else {
					return word;
				}
			   // return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
			});
			
			
			
			var base_url=$('#request').val();
			
			var result=	re2array(reg2,src);
			
			var url=[];
			
			var dwr=request('dwr')=='1'?true:false;
			for ( var i = 0; i < result.length; i++) {
				var name=result[i][2];
				var desc=result[i][1]?result[i][1]:'';
				var params=result[i][3].replace(/\(|\)/ig,'').replace(/\@Param\(\s*"\w+"\s*\)/ig,'').replace(/\<[\s\S]+?\>/ig,'').split(/\,/ig);
				var param='';
				for ( var j = 0; j < params.length; j++) { 
					var pnv=$.trim(params[j]).split(/\s+/);
					if($.trim(pnv[0])=='int'||$.trim(pnv[0])=='long'||$.trim(pnv[0])=='Integer'||$.trim(pnv[0])=='Long'){
						var pv=0;
					} else if($.trim(pnv[0])=='String') {
						var pv='""';
					}else if($.trim(pnv[0])=='boolean'||$.trim(pnv[0])=='Boolean') {
						var pv=false;
					}  else {
						var pv="{}";
					}
					if(dwr) {
						if(pnv[1]){
							param+= '"p'+j+'-'+pnv[1] +'":'+''+pv+',';
						}
					} else {
						if(pnv[1]){
						param+= '"'+ pnv[1]+'":'+''+pv+',';
						}
					}
					
				}
				if(dwr){  
					url.push('{"desc":"'+desc+'","request":{"url":"'+base_url+name+'.jsonp","param":{'+ param.substring(0,param.length-1)+'},"doc":{}},"test":{"autoTest":true,"assert":"json"},"monitor":{"isMonitor":true,"cron":"* 5/* * * * *"},"assert":{"expect":"reply","rule":"json"}}');
				} else { 
					url.push('{"desc":"'+desc+'","request":{"url":"'+base_url+name+'","param":{'+ param.substring(0,param.length-1)+'},"doc":{}},"test":{"autoTest":true,"assert":"json"},"monitor":{"isMonitor":true,"cron":"* 5/* * * * *"},"assert":{"expect":"reply","rule":"json"}}'); 
				}
			}
			
			var apis='var apis = {\n"你的接口名称":[\n{apis}\n]};\nvar apis2 = {\n"你的接口名称":[\n{apis}\n]};'; 
			$('#responsejava').val(apis.replace(/\{apis\}/ig,url.join(',\r\n'))); 
					
						
			
		});//end click
		
		
		$('#setting').click(function(){
			
			try {
			var set=eval('('+$('#setting_txt').val()+')');
				$.post('/api/setting',{'setting':$('#setting_txt').val(),'__host':projectinfo.host},function(data){
					if(data.indexOf('fail')>0) {
						$('#setting').css({'color':'red'});
					} else {
						$('#setting').css({'color':'green'});
					}
					$('#response').val(data); 	
				});
			}catch(e){
				alert('setting must be json');
			};
			
		});//end click
		
		$('#addmonitor').click(function(){
			$.post('/systemmonitor/',{'apis':obj2str(apis),'__host':projectinfo.host,'email':projectinfo.email?projectinfo.email:'','action':'add'},function(data){
				$('#response').val(data); 	
			}); 
			
		});//end click
		
		$('#delmonitor').click(function(){
			$.post('/systemmonitor/',{'apis':obj2str(apis),'__host':projectinfo.host,'email':projectinfo.email?projectinfo.email:'','action':'del'},function(data){
				$('#response').val(data); 
			}); 
			
		});//end click
		
		
		
		$('#addtest').click(function(){
			$.post('/systemtest/',{'apis':obj2str(apis),'__host':projectinfo.host},function(data){
				$('#response').val(data); 
				
			}); 
			
		});//end click
		
		

		

		
		
		

	});