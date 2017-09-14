function getQueryString(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
}

 $(function(){
	 
	 ifrm = getQueryString("name");
   
     var s = 0;
     var ss = $(window.parent.document).find('iframe[id=' + ifrm + ']');
     if(ss.length==0)
    	 return;
     var l = $(window.parent.document).height() - ss.offset().top;
     var t = $(document).height();
     if (l > t) {
         s = l;
     }
     else {
         s = $(document).height();
     }
     $($(window.parent.document).find('iframe[id=' + ifrm + ']')).height(s);
     window.parent.sidebar_r();

 });