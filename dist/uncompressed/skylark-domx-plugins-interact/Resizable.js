define([
    "skylark-langx/langx",
    "skylark-domx-noder",
    "skylark-domx-data",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "skylark-domx-eventer",
    "skylark-domx-styler",
    "skylark-domx-query",
    "skylark-domx-plugins",
    "./interact",
    "./Movable"
],function(langx,noder,datax,finder,geom,eventer,styler,$,plugins,interact,Movable){
    var on = eventer.on,
        off = eventer.off,
        attr = datax.attr,
        removeAttr = datax.removeAttr,
        offset = geom.pagePosition,
        addClass = styler.addClass,
        height = geom.height,
        some = Array.prototype.some,
        map = Array.prototype.map;


    var Resizable = plugins.Plugin.inherit({
        klassName: "Resizable",

        "pluginName" : "lark.resizable",
        
        options : {
            // prevents browser level actions like forward back gestures
            touchActionNone: true,

            // selector for handle that starts dragging
            handle : {
                border : {
                    directions : {
                        top: true, //n
                        left: true, //w
                        right: true, //e
                        bottom: true, //s
                        topLeft : true, // nw
                        topRight : true, // ne
                        bottomLeft : true, // sw
                        bottomRight : true // se                         
                    },
                    classes : {
                        all : "resizable-handle",
                        top : "resizable-handle-n",
                        left: "resizable-handle-w",
                        right: "resizable-handle-e",
                        bottom: "resizable-handle-s", 
                        topLeft : "resizable-handle-nw", 
                        topRight : "resizable-handle-ne",
                        bottomLeft : "resizable-handle-sw",             
                        bottomRight : "resizable-handle-se"                         
                    }
                },
                grabber: {
                    selector : "",
                    direction : "bottomRight"
                },
                selector: true
            },

            constraints : {
                minWidth : null,
                minHeight : null
            }
        },

        _construct :function (elm, options) {
            this.overrided(elm,options);


            options = this.options;
            var handle = options.handle || {},
                handleEl,
                direction = options.direction,
                currentSize,
                startedCallback = options.started,
                movingCallback = options.moving,
                stoppedCallback = options.stopped;

            if (langx.isString(handle)) {
                handleEl = finder.find(elm,handle);
            } else if (langx.isHtmlNode(handle)) {
                handleEl = handle;
            }

            function handleResize(handleEl,dir,minWidth,minHeight) {
                let  startRect;

                Movable(handleEl,{
                    auto : false,
                    started : function(e) {
                        startRect = geom.relativeRect(elm);
                        if (startedCallback) {
                            startedCallback(e);
                        }
                    },
                    moving : function(e) {
                        currentRect = {
                        };
                        if (dir == "right" || dir == "topRight" || dir == "bottomRight" ) {
                            currentRect.width = startRect.width + e.deltaX;
                        } 

                        if (dir == "bottom" || dir == "bottomLeft" || dir == "bottomRight" ) {
                            currentRect.height = startRect.height + e.deltaY;
                        } 

                        if (dir == "left" || dir == "topLeft" || dir == "bottomLeft" ) {
                            currentRect.left = startRect.left + e.deltaX;
                            currentRect.width = startRect.width - e.deltaX;
                        } 

                        if (dir == "top" || dir == "topLeft" || dir == "topRight" ) {
                            currentRect.top = startRect.top + e.deltaY;
                            currentRect.height = startRect.height - e.deltaY;
                        } 

                        geom.relativeRect(elm,currentRect);

                        if (movingCallback) {
                            movingCallback(e);
                        }
                    },
                    stopped: function(e) {
                        if (stoppedCallback) {
                            stoppedCallback(e);
                        }                
                    }
                });
            }

            if (handle && handle.border) {
                let borders = []
                for (var dir in handle.border.directions) {
                    if (handle.border.directions[dir]) {
                        let handleEl = noder.createElement("div",{
                            "className": handle.border.classes.all + " " + handle.border.classes[dir],
                            "direction" : dir
                        },elm);   
                        handleResize(handleEl,dir) ; 

                    }

                }
            }

            if (handle && handle.grabber && handle.grabber.selector) {
                 let handleEl = finder.find(elm,handle.grabber.selector);
                 handleResize(handleEl,handle.grabber.direction) ; 
            }

        },

        // destroys the dragger.
        remove: function() {
            eventer.off(this._handleEl);
        }
    });

    plugins.register(Resizable,"resizable");

    return interact.Resizable = Resizable;
});
