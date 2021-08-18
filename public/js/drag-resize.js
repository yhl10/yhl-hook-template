(function($) {

    // 默认参数
    const defaultOpts = {
        stage: document, // 舞台
        itemClass: 'resize-item', // 可缩放的类名
        canvasClass: 'canvas-container', // 画布类名
        delClass: 'del-item', // 删除按钮类名
    };

    // 定义构造函数
    const DragResize = function(options) {
        this.options = $.extend({}, defaultOpts, options);
        this.canvas = $('.' + this.options.canvasClass);
        this.init();
    }

    // 原型上添加方法
    DragResize.prototype = {
        // 初始化拖拽item
        init: function() {
            let self = this;
            $('.' + self.options.itemClass).each(function() {
                // 创建面板
                let width = $(this).width();
                let height = $(this).height();
                let titleHei = $('.title').height();
                let resizePanel = $('<div class="resize-panel"></div>');
                resizePanel.css({
                    width: width,
                    height: height,
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    'background-color': 'transparent',
                    display: 'none'
                });
                self.appendHandler(resizePanel, $(this));

                // 创建拖拽区域
                let panelTitle = $('<div class="panel-title"></div>');
                panelTitle.css({
                    width: '100%',
                    height: titleHei,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'move',
                    'background-color': 'inherit',
                })
                
                // 创建控制点
                let n = $('<div class="n"></div>');//北
                let s = $('<div class="s"></div>');//南
                let w = $('<div class="w"></div>');//西
                let e = $('<div class="e"></div>');//东
                let ne = $('<div class="ne"></div>');//东北
                let nw = $('<div class="nw"></div>');//西北
                let se = $('<div class="se"></div>');//东南
                let sw = $('<div class="sw"></div>');//西南

                //添加公共样式
                self.addHandlerCss([n, s, w, e, ne, nw, se, sw]);

                //添加各自样式
                n.css({
                    'top': '-4px',
                    'margin-left': '-4px',
                    'left': '50%',
                    'cursor': 'n-resize'
                });
                s.css({
                    'bottom': '-4px',
                    'margin-left': '-4px',
                    'left': '50%',
                    'cursor': 's-resize'
                });
                e.css({
                    'top': '50%',
                    'margin-top': '-4px',
                    'right': '-4px',
                    'cursor': 'e-resize'
                });
                w.css({
                    'top': '50%',
                    'margin-top': '-4px',
                    'left': '-4px',
                    'cursor': 'w-resize'
                });
                ne.css({
                    'top': '-4px',
                    'right': '-4px',
                    'cursor': 'ne-resize'
                });
                nw.css({
                    top: '-4px',
                    'left': '-4px',
                    'cursor': 'nw-resize'
                });
                se.css({
                    'bottom': '-4px',
                    'right': '-4px',
                    'cursor': 'se-resize'
                });
                sw.css({
                    'bottom': '-4px',
                    'left': '-4px',
                    'cursor': 'sw-resize'
                });

                // 添加项目
                self.appendHandler([panelTitle, n, s, w, e, ne, nw, se, sw], resizePanel);
                
                //绑定拖拽缩放事件
                self.bindResizeEvent(resizePanel);

                // 绑定删除事件
                self.bindDelEvent($(this));

                //绑定触发事件
                self.bindTrigger($(this));
            });

            self.bindHidePanel();
            self.addLine();
        },

        // 添加辅助线
        addLine: function() {
            let vLine = $('<div class="v-line"></div>');
            let hLine = $('<div class="h-line"></div>');
            vLine.css({
                width: 1,
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                'border-left': '1px dashed #6a90a6',
                display: 'none'
            });
            hLine.css({
                height: 1,
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                'border-bottom': '1px dashed #6a90a6',
                display: 'none'
            });
            this.canvas.append(vLine);
            this.canvas.append(hLine);
        },

        //控制点公共样式
        addHandlerCss: function(els) {
            for(let i = 0; i < els.length; i++) {
                el = els[i];
                el.css({
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    background: 'rgb(106 144 166 / 66%)',
                    margin: 0,
                    'border-radius': '100%',
                });
            }
        },
        
        // 插入容器
        appendHandler: function(handlers, target) {
            for(let i = 0; i < handlers.length; i++) {
                el = handlers[i];
                target.append(el);
            }
        },
       
        // 显示拖拽面板
        triggerResize: function(el) {
            let self = this;
            el.siblings('.' + self.options.itemClass).children('div').css({
                display: 'none'
            });
            el.children('div').css({
                display: 'block'
            });
        },

        // 绑定删除事件
        bindDelEvent: function(el) {
            let self = this;
            el.on('click', '.'+ self.options.delClass, function() {
                el.remove()
            });
        },
        
        // 拖拽事件控制：包含8个缩放点和一个拖拽位置
        bindResizeEvent: function(resizePanel) {
            let self = this;
            let ox = 0; //原始事件x位置
            let oy = 0; //原始事件y位置
            let ow = 0; //原始宽度
            let oh = 0; //原始高度

            let oleft = 0; //原始元素位置
            let otop = 0;
            let itemBox = resizePanel.parent('div');

            //东
            let emove = false;
            resizePanel.on('mousedown', '.e', function(e) {
                ox = e.pageX;//原始x位置
                ow = resizePanel.width();
                emove = true;
            });

            //南
            let smove = false;
            resizePanel.on('mousedown', '.s', function(e) {
                oy = e.pageY;//原始x位置
                oh = resizePanel.height();
                smove = true;
            });

            //西
            let wmove = false;
            resizePanel.on('mousedown', '.w', function(e) {
                ox = e.pageX;//原始x位置
                ow = resizePanel.width();
                wmove = true;
                oleft = parseInt(itemBox.css('left').replace('px', ''));
            });

            //北
            let nmove = false;
            resizePanel.on('mousedown', '.n', function(e) {
                oy = e.pageY;
                oh = resizePanel.height();
                nmove = true;
                otop = parseInt(itemBox.css('top').replace('px', ''));
            });

            //东北
            let nemove = false;
            resizePanel.on('mousedown', '.ne', function(e) {
                ox = e.pageX;
                oy = e.pageY;
                ow = resizePanel.width();
                oh = resizePanel.height();
                nemove = true;
                otop = parseInt(itemBox.css('top').replace('px', ''));
            });

            //西北
            let nwmove = false;
            resizePanel.on('mousedown', '.nw', function(e) {
                ox = e.pageX;
                oy = e.pageY;
                ow = resizePanel.width();
                oh = resizePanel.height();
                otop = parseInt(itemBox.css('top').replace('px', ''));
                oleft = parseInt(itemBox.css('left').replace('px', ''));
                nwmove = true;
            });

            //东南
            let semove = false;
            resizePanel.on('mousedown', '.se', function(e) {
                ox = e.pageX;
                oy = e.pageY;
                ow = resizePanel.width();
                oh = resizePanel.height();
                semove = true;
            });

            //西南
            let swmove = false;
            resizePanel.on('mousedown', '.sw', function(e) {
                ox = e.pageX;
                oy = e.pageY;
                ow = resizePanel.width();
                oh = resizePanel.height();
                swmove = true;
                oleft = parseInt(itemBox.css('left').replace('px', ''));
            });

            //拖拽
            let drag = false;
            resizePanel.on('mousedown', '.panel-title', function(e) {
                ox = e.pageX;
                oy = e.pageY;
                otop = parseInt(itemBox.css('top').replace('px', ''));
                oleft = parseInt(itemBox.css('left').replace('px', ''));
                drag = true;

                // 显示辅助线
                $('.v-line').css({
                    top: 0,
                    left: oleft,
                    display: 'block'
                })
                $('.h-line').css({
                    top: otop,
                    left: 0,
                    display: 'block'
                })
            });

            $(self.options.stage).on('mousemove', function(e) {
                let minW = 120; // 缩放最小宽度
                let minH = 50; // 缩放最小高度

                if(emove) { // 东
                    let x = (e.pageX - ox);
                    resizePanel.css({
                        width: Math.max(ow + x, minW)
                    });
                    itemBox.css({
                        width: Math.max(ow + x, minW)
                    });
                } else if(smove) { // 南
                    let y = (e.pageY - oy);
                    resizePanel.css({
                        height: Math.max(oh + y, minH)
                    });
                    itemBox.css({
                        height: Math.max(oh + y, minH)
                    });
                } else if(wmove) { // 西
                    let x = (e.pageX - ox);
                    resizePanel.css({
                        width: Math.max(ow - x, minW),
                        // left: oleft + x
                    });
                    itemBox.css({
                        width: Math.max(ow - x, minW),
                        left: oleft + x
                    });
                } else if(nmove) { // 北
                    let y = (e.pageY - oy);
                    resizePanel.css({
                        height: Math.max(oh - y, minH),
                        // top: otop + y
                    });
                    itemBox.css({
                        height: Math.max(oh - y, minH),
                        top: otop + y
                    });
                } else if(nemove) { // 东北
                    let x = e.pageX - ox;
                    let y = e.pageY - oy;
                    resizePanel.css({
                        height: Math.max(oh - y, minH),
                        // top: otop + y,
                        width: Math.max(ow + x, minW),
                    });
                    itemBox.css({
                        height:  Math.max(oh - y, minH),
                        top: otop + y,
                        width: Math.max(ow + x, minW),
                    });
                } else if(nwmove) { // 西北
                    let x = e.pageX - ox;
                    let y = e.pageY - oy;
                    resizePanel.css({
                        height: Math.max(oh - y, minH),
                        // top: otop + y,
                        width: Math.max(ow - x, minW),
                        // left: oleft + x
                    });
                    itemBox.css({
                        height: Math.max(oh - y, minH),
                        top: otop + y,
                        width: Math.max(ow - x, minW),
                        left: oleft + x
                    });
                } else if(semove) { // 东南
                    let x = e.pageX - ox;
                    let y = e.pageY - oy;
                    resizePanel.css({
                        width: Math.max(ow + x, minW),
                        height: Math.max(oh + y, minH),
                    });
                    itemBox.css({
                        width: Math.max(ow + x, minW),
                        height:  Math.max(oh + y, minH),
                    });
                } else if(swmove) { // 西南
                    let x = e.pageX - ox;
                    let y = e.pageY - oy;
                    resizePanel.css({
                        width: Math.max(ow - x, minW),
                        // left: oleft + x,
                        height: Math.max(oh + y, minH)
                    });
                    itemBox.css({
                        width: Math.max(ow - x, minW),
                        left: oleft + x,
                        height: Math.max(oh + y, minH),
                    });
                } else if(drag) {
                    let x = e.pageX - ox;
                    let y = e.pageY - oy;
                    let leftVal = oleft + x;
                    let topVal = otop + y;
                    let boxW = itemBox.width();
                    let boxH = itemBox.height();
                    let canvas = self.canvas;
                    // 限制区域
                    if(leftVal < 0) {
                        leftVal = 0;
                    }
                    if(leftVal > canvas.width() - boxW) {
                        leftVal = canvas.width() - boxW;
                    }
                    if(topVal < 0) {
                        topVal = 0;
                    }
                    if(topVal > canvas.height() - boxH) {
                        topVal = canvas.height() - boxH;
                    }

                    itemBox.css({
                        left: leftVal,
                        top: topVal
                    });

                    // 辅助线跟随移动
                    $('.v-line').css({
                        left: leftVal,
                        top: 0
                    })
                    $('.h-line').css({
                        left: 0,
                        top: topVal
                    })
                }
            }).on('mouseup', function() {
                emove = false;
                smove = false;
                wmove = false;
                nmove = false;
                nemove = false;
                nwmove = false;
                swmove = false;
                semove = false;
                drag = false;

                // 隐藏辅助线
                $('.v-line').css({
                    display: 'none'
                })
                $('.h-line').css({
                    display: 'none'
                })
            });
        },
       
        // 点击item显示拖拽面板
        bindTrigger: function(el) {
            let self = this;
            el.on('click', function(e) {
                e.stopPropagation();
                self.triggerResize(el);
            });
        },
        
        // 点击舞台空闲区域 隐藏缩放面板
        bindHidePanel: function() {
            let stage = this.options.stage;
            let itemClass = this.options.itemClass;
            $(stage).bind('click', function() {
                $('.' + itemClass).children('div').css({
                    display: 'none'
                });
            })
        }
    }

    window.DragResize = DragResize;

})(jQuery);