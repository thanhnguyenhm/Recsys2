(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(7),c=n.n(a),i=n(1),s=n(2),l=n(4),u=n(3),p=n(5),m=n(8),h=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getStyle=function(){return{background:"#f4f4f4",padding:"10px",borderBottom:"1px #ccc dotted",textDecoration:n.props.movie.userRating>-1?"underline":"none"}},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{style:this.getStyle()},o.a.createElement("p",null,this.props.movie.title),o.a.createElement("img",{src:"http://image.tmdb.org/t/p/w300"+this.props.movie.poster,alt:""}))}}]),t}(r.Component),d=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){for(var e=[],t=0,n=0,r=Object.entries(this.props.movies);n<r.length;n++){var a=r[n],c=Object(m.a)(a,2),i={id:t,title:c[0],poster:c[1]};e.push(i),t++}return e.map((function(e){return o.a.createElement(h,{key:e.id,movie:e})}))}}]),t}(r.Component),v=(n(14),function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={movies:window.topN},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Welcom to Movie Recommendation System"),o.a.createElement("h2",null,"Popular Movies"),o.a.createElement(d,{movies:this.state.movies}))}}]),t}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.f0c6c475.chunk.js.map