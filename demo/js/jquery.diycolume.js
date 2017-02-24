/**
 * 表格列自定义JQuery插件示例
 *
 * Author Hyman
 * Custom Table Colume Plugin For jQuery
 * Version 0.1
 * Copyright (c) 2016 Hyman 
 * License hyman
 * WebSite http://www.an2.net
 */
(function($){

	function removeHtmlTag(html){
	    var p=/<.*?>/g;
	    return (html.replace(p,''));
	}
	function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return '';
    }
    function setCookie(name,value,expTime)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() + expTime);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/";
    }

    var myFunction = function(element, options) {     
		this.element = $(element);
		this.options = options;					
		this.titleElementId = $('#' + options.titleElementId);
		this.checkedIndex =  options.checkedIndex;
		this.cookieKey =  options.cookieKey;
		var me = this;
		this.changeTable = function(me){
		  	me.titleElementId.find(".is-hide-co").each(function(index, el) {
		        if($(this).prop('checked')){
		        	console.log(this.element);
		           	me.element.find("tr th").eq(index).show();
		           	me.element.find("tr").each(function() {
		             	$(this).children('td').eq(index).show();
		           	});
		        }else{
		           	me.element.find("tr th").eq(index).hide();
		           	me.element.find("tr").each(function() {
		             	$(this).children('td').eq(index).hide();
		           	});
		        }        
		    });
		    this.recordTableTitle(me,true);
		}

		this.recordTableTitle = function(me,isRecord){
		    isRecord=isRecord||false;
		    var fromCookieRecord = true;
		    if(!isRecord){
		        fromCookieRecord = getCookie(me.cookieKey);
		        if(!fromCookieRecord){
		            fromCookieRecord = me.checkedIndex;
		        }
		        if(fromCookieRecord){
		            me.initTableTitle(fromCookieRecord);
		        }
		        return;
		    }
		    if(!fromCookieRecord||isRecord){
		        var str='';
		        me.titleElementId.find(".is-hide-co").each(function(index, el) {
		            if($(this).prop('checked')){
		                if(str){
		                    str+=","+index; 
		                }else{
		                    str+=index;
		                }                
		            }            
		        });
		        setCookie(me.cookieKey,str,365*24*3600*1000);
		    }
		}

		this.initTableTitle = function(record){
		    if(record){
		        ids=record.split(',');
		        for(i=0;i<ids.length;i++){
		            me.titleElementId.find(".is-hide-co").eq(ids[i]).prop("checked",true);
		        }
		    }
		}

		this.initTableCheckbox = function(me){
		    var html="";
		    checkedIndex=this.checkedIndex||false;
		    if(checkedIndex){
		        var checkedIndex=checkedIndex.split(',');
		        var checkAll=false;
		    }else{
		        var checkAll=true;
		    }
		    me.element.find("tr th").each(function(index,el) {

		        html+='<span><input type="checkbox" class="is-hide-co" name="is-hide-co[]" > '+removeHtmlTag($(this).html())+'</span>';
		    });
		    me.titleElementId.html(html);
		}
		this.init = function(){
			this.initTableCheckbox(me);
            this.recordTableTitle(me);
            this.changeTable(me);
            this.titleElementId.find(".is-hide-co").change(function(event) {
                me.changeTable(me);
            });
		}
		

    };

    myFunction.defaults = {    
		cookieKey: 'table-title',    
		checkedIndex: '1,2,3,5,6,7,8,9',
		titleElementId:'table_title'   
	};
	$.fn.diyColume = function(option){
		return this.each(function () {
            var $this = $(this);
            var options = $.extend({}, myFunction.defaults, typeof option == 'object' && option);
            return new myFunction(this, options).init();			            
        })
	}   
})(jQuery);