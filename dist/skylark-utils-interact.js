/**
 * skylark-utils-interact - The interact features enhancement for skylark utils.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,t){function r(e,t){if("."!==e[0])return e;var r=t.split("/"),a=e.split("/");r.pop();for(var n=0;n<a.length;n++)"."!=a[n]&&(".."==a[n]?r.pop():r.push(a[n]));return r.join("/")}var a=t.define,n=t.require,i="function"==typeof a&&a.amd,o=!i&&"undefined"!=typeof exports;if(!i&&!a){var s={};a=t.define=function(e,t,a){"function"==typeof a?(s[e]={factory:a,deps:t.map(function(t){return r(t,e)}),exports:null},n(e)):s[e]=a},n=t.require=function(e){if(!s.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var r=s[e];if(!r.exports){var a=[];r.deps.forEach(function(e){a.push(n(e))}),r.exports=r.factory.apply(t,a)}return r.exports}}if(!a)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(e(a,n),!i){var l=n("skylark-langx/skylark");o?module.exports=l:t.skylarkjs=l}}(function(e,t){e("skylark-utils-interact/interact",["skylark-langx/skylark","skylark-langx/langx"],function(e,t){var r=e.interact={};return r}),e("skylark-utils-interact/ddmanager",["./interact","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/finder","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler"],function(e,t,r,a,n,i,o,s){var l=(o.on,o.off,a.attr,a.removeAttr,i.pagePosition,s.addClass,i.height,e.DndManager=t.Evented.inherit({klassName:"DndManager",init:function(){},prepare:function(e){var t=o.create("preparing",{dragSource:e.dragSource,dragHandle:e.dragHandle});e.trigger(t),e.dragSource=t.dragSource},start:function(e,r){var a=i.pagePosition(e.dragSource);this.draggingOffsetX=parseInt(r.pageX-a.left),this.draggingOffsetY=parseInt(r.pageY-a.top);var n=o.create("started",{elm:e.elm,dragSource:e.dragSource,dragHandle:e.dragHandle,ghost:null,transfer:{}});e.trigger(n),this.dragging=e,e.draggingClass&&s.addClass(e.dragSource,e.draggingClass),this.draggingGhost=n.ghost,this.draggingGhost||(this.draggingGhost=e.elm),this.draggingTransfer=n.transfer,this.draggingTransfer&&t.each(this.draggingTransfer,function(e,t){r.dataTransfer.setData(e,t)}),r.dataTransfer.setDragImage(this.draggingGhost,this.draggingOffsetX,this.draggingOffsetY),r.dataTransfer.effectAllowed="copyMove";var l=o.create("dndStarted",{elm:n.elm,dragSource:n.dragSource,dragHandle:n.dragHandle,ghost:n.ghost,transfer:n.transfer});this.trigger(l)},over:function(){},end:function(e){var t=this.dragging;t&&t.draggingClass&&s.removeClass(t.dragSource,t.draggingClass);var r=o.create("dndEnded",{});this.trigger(r),this.dragging=null,this.draggingTransfer=null,this.draggingGhost=null,this.draggingOffsetX=null,this.draggingOffsetY=null}})),d=new l;return d}),e("skylark-utils-interact/Draggable",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/finder","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/plugins","./interact","./ddmanager"],function(e,t,r,a,n,i,o,s,l,d){var g=(i.on,i.off,r.attr,r.removeAttr,n.pagePosition,o.addClass,n.height,s.Plugin.inherit({klassName:"Draggable",pluginName:"lark.draggable",options:{draggingClass:"dragging"},_construct:function(t,n){this.overrided(t,n);var o=this,n=this.options;o.draggingClass=n.draggingClass,["preparing","started","ended","moving"].forEach(function(t){e.isFunction(n[t])&&o.on(t,n[t])}),i.on(t,{mousedown:function(e){var t=o.options;t.handle&&(o.dragHandle=a.closest(e.target,t.handle),!o.dragHandle)||(t.source?o.dragSource=a.closest(e.target,t.source):o.dragSource=o._elm,d.prepare(o),o.dragSource&&r.attr(o.dragSource,"draggable","true"))},mouseup:function(e){o.dragSource&&(o.dragSource=null,o.dragHandle=null)},dragstart:function(e){r.attr(o.dragSource,"draggable","false"),d.start(o,e)},dragend:function(e){i.stop(e),d.dragging&&d.end(!1)}})}}));return s.register(g,"draggable"),l.Draggable=g}),e("skylark-utils-interact/Droppable",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/finder","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/plugins","./interact","./ddmanager"],function(e,t,r,a,n,i,o,s,l,d){var g=(i.on,i.off,r.attr,r.removeAttr,n.pagePosition,o.addClass,n.height,s.Plugin.inherit({klassName:"Droppable",pluginName:"lark.droppable",options:{draggingClass:"dragging"},_construct:function(t,r){this.overrided(t,r);var a,n,s=this,r=s.options,l=(r.draggingClass,!0);["started","entered","leaved","dropped","overing"].forEach(function(t){e.isFunction(r[t])&&s.on(t,r[t])}),i.on(t,{dragover:function(e){if(e.stopPropagation(),l){var t=i.create("overing",{overElm:e.target,transfer:d.draggingTransfer,acceptable:!0});s.trigger(t),t.acceptable&&(e.preventDefault(),e.dataTransfer.dropEffect="copyMove")}},dragenter:function(e){var t=(s.options,s._elm),r=i.create("entered",{transfer:d.draggingTransfer});s.trigger(r),e.stopPropagation(),a&&l&&o.addClass(t,a)},dragleave:function(e){var t=(s.options,s._elm);if(!l)return!1;var r=i.create("leaved",{transfer:d.draggingTransfer});s.trigger(r),e.stopPropagation(),a&&l&&o.removeClass(t,a)},drop:function(e){var t=(s.options,s._elm);if(i.stop(e),d.dragging){a&&l&&o.addClass(t,a);var r=i.create("dropped",{transfer:d.draggingTransfer});s.trigger(r),d.end(!0)}}}),d.on("dndStarted",function(e){var r=i.create("started",{transfer:d.draggingTransfer,acceptable:!1});s.trigger(r),l=r.acceptable,a=r.hoverClass,n=r.activeClass,n&&l&&o.addClass(t,n)}).on("dndEnded",function(e){var r=i.create("ended",{transfer:d.draggingTransfer,acceptable:!1});s.trigger(r),a&&l&&o.removeClass(t,a),n&&l&&o.removeClass(t,n),l=!1,n=null,a=null})}}));return s.register(g,"droppable"),l.Droppable=g}),e("skylark-utils-interact/Movable",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/plugins","./interact"],function(e,t,r,a,n,i,o,s){var l=(n.on,n.off,r.attr,r.removeAttr,a.pagePosition,i.addClass,a.height,Array.prototype.some,Array.prototype.map,o.Plugin.inherit({klassName:"Movable",pluginName:"lark.movable",_construct:function(e,r){function o(e){var t,r;if(e.changedTouches)for(t="screenX screenY pageX pageY clientX clientY".split(" "),r=0;r<t.length;r++)e[t[r]]=e.changedTouches[0][t[r]]}this.overrided(e,r),r=this.options;var s,l,d,g,u,c,f,p,h=r.handle||e,m=r.auto!==!1,k=r.constraints,v=r.document||document,y=r.started,b=r.moving,x=r.stopped,d=function(r){var d,m=a.getDocumentSize(v);o(r),r.preventDefault(),l=r.button,u=r.screenX,c=r.screenY,f=a.relativePosition(e),p=a.size(e),d=i.css(h,"curosr"),s=t.createElement("div"),i.css(s,{position:"absolute",top:0,left:0,width:m.width,height:m.height,zIndex:2147483647,opacity:1e-4,cursor:d}),t.append(v.body,s),n.on(v,"mousemove touchmove",C).on(v,"mouseup touchend",g),y&&y(r)},C=function(t){if(o(t),0!==t.button)return g(t);if(t.deltaX=t.screenX-u,t.deltaY=t.screenY-c,m){var r=f.left+t.deltaX,n=f.top+t.deltaY;k&&(r<k.minX&&(r=k.minX),r>k.maxX&&(r=k.maxX),n<k.minY&&(n=k.minY),n>k.maxY&&(n=k.maxY))}a.relativePosition(e,{left:r,top:n}),t.preventDefault(),b&&b(t)},g=function(e){o(e),n.off(v,"mousemove touchmove",C).off(v,"mouseup touchend",g),t.remove(s),x&&x(e)};n.on(h,"mousedown touchstart",d),this._handleEl=h},remove:function(){n.off(this._handleEl)}}));return o.register(l,"movable"),s.Movable=l}),e("skylark-utils-interact/Resizable",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/finder","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/query","skylark-utils-dom/plugins","./interact","./Movable"],function(e,t,r,a,n,i,o,s,l,d,g){var u=(i.on,i.off,r.attr,r.removeAttr,n.pagePosition,o.addClass,n.height,Array.prototype.some,Array.prototype.map,l.Plugin.inherit({klassName:"Resizable",pluginName:"lark.resizable",options:{touchActionNone:!0,direction:{top:!1,left:!1,right:!0,bottom:!0},handle:{border:!0,grabber:"",selector:!0}},_construct:function(t,r){this.overrided(t,r),r=this.options;var i,o,s,l=r.handle||{},d=r.direction,u=r.started,c=r.moving,f=r.stopped;e.isString(l)?i=a.find(t,l):e.isHtmlNode(l)&&(i=l),g(i,{auto:!1,started:function(e){o=n.size(t),u&&u(e)},moving:function(e){s={},d.left||d.right?s.width=o.width+e.deltaX:s.width=o.width,d.top||d.bottom?s.height=o.height+e.deltaY:s.height=o.height,n.size(t,s),c&&c(e)},stopped:function(e){f&&f(e)}}),this._handleEl=i},remove:function(){i.off(this._handleEl)}}));return l.register(u,"resizable"),d.Resizable=u}),e("skylark-utils-interact/Selectable",["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/query","./interact","./Movable"],function(e,t,r,a,n,i,o,s,l){function d(e){e=e||{},E=e.classPrefix||"";var r=e.appendTo||document.body;m=t.createElement("div",{"class":E+"resizer-c"}),t.append(r,m),k={},["tl","tc","tr","cl","cr","bl","bc","br"].forEach(function(e){return k[e]=t.createElement("i",{"class":E+"resizer-h "+E+"resizer-h-"+e,"data-resize-handler":e})});for(var a in k){var n=k[a];t.append(m,n),l(n,{auto:!1,started:g,moving:u,stopped:c})}}function g(e){e.target;y=a.size(v),x&&x(e)}function u(e){b={},P.left||P.right?b.width=y.width+e.deltaX:b.width=y.width,P.top||P.bottom?b.height=y.height+e.deltaY:b.height=y.height,a.size(v,b),a.pageRect(m,a.pageRect(v)),C&&C(e)}function c(e){S&&S(e)}function f(e,t){e&&e===v||(v=e,startDim=rectDim=startPos=null,a.pageRect(m,a.pageRect(v)),i.show(m))}function p(e){m&&i.hide(m),v=null}function h(){return h}var m,k,v,y,b,x,C,S,E=(n.on,n.off,r.attr,r.removeAttr,a.pagePosition,i.addClass,a.height,Array.prototype.some,Array.prototype.map,""),P={left:!0,right:!0,top:!0,bottom:!0};return e.mixin(h,{init:d,select:f,unselect:p}),s.Selectable=h}),e("skylark-utils-interact/Sortable",["./interact","skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/datax","skylark-utils-dom/geom","skylark-utils-dom/eventer","skylark-utils-dom/styler","skylark-utils-dom/query","skylark-utils-dom/plugins","./Draggable","./Droppable","./Movable","./Resizable"],function(e,t,r,a,n,i,o,s,l,d,g,u,c){var f,p=(i.on,i.off,a.attr,a.removeAttr,n.pagePosition,o.addClass,n.height,Array.prototype.some,Array.prototype.map,l.Plugin.inherit({klassName:"Sorter",enable:function(){},disable:function(){},destory:function(){}}),s()),h=l.Plugin.inherit({klassName:"Sortable",pluginName:"lark.sortable",options:{connectWith:!1,placeholder:null,placeholderClass:"sortable-placeholder",draggingClass:"sortable-dragging",items:null},_construct:function(e,t){this.overrided(e,t),t=this.options;var a,n=s(e),i=n.children(t.items),o=s(t.placeholder||r.createElement(/^(ul|ol)$/i.test(e.tagName)?"li":"div",{"class":t.placeholderClass}));d(e,{source:t.items,handle:t.handle,draggingClass:t.draggingClass,preparing:function(e){},started:function(e){e.ghost=e.dragSource,e.transfer={text:"dummy"},a=(f=s(e.dragSource)).index()},ended:function(e){f&&(f.show(),p.detach(),a!=f.index()&&f.parent().trigger("sortupdate",{item:f}),f=null)}}),g(e,{started:function(e){e.acceptable=!0,e.activeClass="active",e.hoverClass="over"},overing:function(e){i.is(e.overElm)?(t.forcePlaceholderSize&&o.height(f.outerHeight()),f.hide(),s(e.overElm)[o.index()<s(e.overElm).index()?"after":"before"](o),p.not(o).detach()):p.is(e.overElm)||s(e.overElm).children(t.items).length||(p.detach(),s(e.overElm).append(o))},dropped:function(e){p.filter(":visible").after(f),f.show(),p.detach(),f=null}}),n.data("items",t.items),p=p.add(o),t.connectWith&&s(t.connectWith).add(this).data("connectWith",t.connectWith)}});return l.register(h,"sortable"),e.Sortable=h}),e("skylark-utils-interact/main",["./interact","./Draggable","./Droppable","./Movable","./Resizable","./Selectable","./Sortable"],function(e){return e}),e("skylark-utils-interact",["skylark-utils-interact/main"],function(e){return e})},this);
//# sourceMappingURL=sourcemaps/skylark-utils-interact.js.map
