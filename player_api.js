var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return 10>a?"0"+a:a}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,!b||"function"==typeof b||"object"==typeof b&&"number"==typeof b.length)return str("",{"":a});throw new Error("JSON.stringify")}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();var SV;SV||(SV={}),function(){SV.players||(SV.players={}),SV.Player||(SV.Player=function(options){var _videoId=options.videoId,_volume=1,_duration=0,_currentTime=0,_loaded=0,_email=null,_sendMessage=function(message){_iframe.contentWindow.postMessage(message,"http://videos.sproutvideo.com")},_getIframeByVideoId=function(id){for(var players=SV.utils.getElementsByClassName("sproutvideo-player"),len=players.length,i=0;len>i;i++)if(players[i].src.indexOf(id)>-1)return players[i]},_iframe=_getIframeByVideoId(_videoId);if(!_iframe)throw"Can not find video iframe";var public={events:options.events,play:function(){_sendMessage('{"name":"play"}')},pause:function(){_sendMessage('{"name":"pause"}')},setVolume:function(vol){_sendMessage('{"name":"volume", "data":"'+vol+'"}')},getVolume:function(){return _volume},seek:function(loc){_sendMessage('{"name":"seek", "data":"'+loc+'"}')},toggleHD:function(){_sendMessage('{"name":"toggleHD"}')},getCurrentTime:function(){return _currentTime},getPercentLoaded:function(){return _loaded},getDuration:function(){return _duration},getEmail:function(){return _email},updateStatus:function(message){switch(message.type){case"volume":_volume=message.data;break;case"progress":_currentTime=message.data.time;break;case"loading":_loaded=message.data;break;case"ready":_duration=message.data.duration,_email=message.data.email}}};return SV.players[_videoId]=public,public}),SV.utils||(SV.utils={getElementsByClassName:function(classname){if(document.getElementsByClassName)return document.getElementsByClassName(classname);var classElements=new Array,els=document.getElementsByTagName("*"),elsLen=els.length,pattern=new RegExp("(^|\\s)"+classname+"(\\s|$)");for(i=0,j=0;elsLen>i;i++)pattern.test(els[i].className)&&(classElements[j]=els[i],j++);return classElements}}),SV.routePlayerEvent||(SV.routePlayerEvent=function(e){if("videos.sproutvideo.com"==e.origin.split("//")[1])try{var message=JSON.parse(e.data),player=SV.players[message.id];player.updateStatus(message),player&&player.events&&player.events.onStatus&&player.events.onStatus(message)}catch(e){}}),window.addEventListener?window.addEventListener("message",SV.routePlayerEvent,!1):window.attachEvent("onmessage",SV.routePlayerEvent)}();