;(function($){
		'use strict';
		$.fn.showTimer =function(options, callback){
			var i = 0,
				//_index = 0,
				j = 0, 
				count = 0,  
				SS = 59, 
				MS = 9, 
				timer1 = null, 
				timer2 = null, 
				timer3 = null,
				$this = $(this),
				opts = $.extend({
					MM: 3, //从0开始计算，即0==1
					box1: $this.first('div'), //右侧的半圆环
					box2: $this.first('div').next(), //左侧的半圆环
					time: $this.last('div') //显示时间的html
				}, options || {}),
				tor1 = opts.box1.children('div'),
				tor2 = opts.box2.children('div'),
				totle = (opts.MM + 1)*600, 
				d = 180*(opts.MM + 1),
				callback = callback || function(){};
				if(opts.MM < 10){
					opts.MM = '0' + opts.MM;
				}

			function showTime(){
				totle --;
				if(totle == 0){
					clearInterval(timer1);
					clearInterval(timer2);
					clearInterval(timer3);
					tor2.css({
						"-moz-transform": "rotate(" + d + "deg)"
					});
					tor2.css({
						"-ms-transform": "rotate(" + d + "deg)"
					});
					tor2.css({
						"-webkit-transform": "rotate(" + d + "deg)"
					});
				}else{
					if(totle > 0 && MS > 0){
						MS --;
						if(MS < 10){
							MS = '0' + MS;
						}
					};
					if(MS == 0 && SS > 0){
						MS = 10;
						SS --;
						if(SS < 10){
							SS = '0' + SS;
						}
					};
					if(SS == 0 && opts.MM > 0){
						SS = 60;
						opts.MM --;
						if(opts.MM < 10){
							opts.MM = '0' + opts.MM;
						}
					}
				}
				opts.time.html(opts.MM + ':' + SS + ':' + MS);
			};
			timer3 = setInterval(showTime, 100);
			function start1(){
				i = i + 0.6;
				count ++;
				if(count >= 300){
					count = 0;
					clearInterval(timer1);
					timer2 = setInterval(start2, 100);
				}
				tor1.css({
					"-moz-transform": "rotate(" + i + "deg) translateZ(0)" //translateZ(0)消除锯齿
				});
				tor1.css({
					"-ms-transform": "rotate(" + i + "deg) translateZ(0)"
				});
				tor1.css({
					"-webkit-transform": "rotate(" + i + "deg) translateZ(0)"
				});
			};
			function start2(){
				j = j + 0.6;
				count ++;
				if(count >= 300){
					count = 0;
					clearInterval(timer2);
					timer1 = setInterval(start1, 100);
				}
				tor2.css({
					"-moz-transform": "rotate(" + j + "deg) translateZ(0)"
				});
				tor2.css({
					"-ms-transform": "rotate(" + j + "deg) translateZ(0)"
				});
				tor2.css({
					"-webkit-transform": "rotate(" + j + "deg) translateZ(0)"
				});
			};
			timer1 = setInterval(start1, 100);
			// 回调
            callback();
		}
		
	})(window.jQuery);