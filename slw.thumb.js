/**
 * SlwPlugins.SlwThumb v2.1 2016.7 by CSS WangWeidong
 */
;
(function($) {
	var SlwPlugins = {};
	$.fn.slwThumb = $.fn.cssThumb = function(option) {
		var thumb = new SlwPlugins.SlwThumb(this, option);
		thumb.init();
		return thumb;
	};
	
	SlwPlugins.SlwThumb = function(el, option) {
		this.version = 'slwThumb v2.1';
		this.defaults = {
			url : null,
			picClass : 'pic-element',
			picData : 'data-url',
			thumbW : 40,
			thumbH : 50,
			fitType : 'fixed' // fixed, scale
		};
		this.option = $.extend(this.defaults, option);
		this.el = $(el);
	}
	/**
	 * SlwPlugins.SlwThumb方法
	 */
	SlwPlugins.SlwThumb.prototype = {
		init : function() {
			var o = this.option;
			var $images = this.el;
			if (o.url == null) {
				$images = this.el.find('.' + o.picClass);
				if ($images.length == 0) return;
			}
			$images.each(function(i) {
				var $parent = $(this);
				var $el = $(this);
				var url = o.url;
				if (url == null) {
					$el = $('<div />');
					url = $parent.attr(o.picData);
				}
				var viewImage = function(img) {
					var $image = $(img);
					SlwImage.trumbImage(img, o);
					$el.css({
						'overflow' : 'hidden',
						'width' : (o.fitType == 'scale' ? $image.width() : o.thumbW) + 'px',
						'height' : (o.fitType == 'scale' ? $image.height() : o.thumbH) + 'px'
					});
					$el.html($image);
					if (o.url == null) $parent.prepend($el);
				}
				SlwImage.loadImage(url, viewImage);
			});
		}
	}
	var SlwImage = {
		trumbImage : function(img, o) {
			var naturalWidth = img.width;
			var naturalHeight = img.height;
			var imgRatio = naturalWidth / naturalHeight;
			var canvasRatio = o.thumbW / o.thumbH;
			var width, height;
			if (o.fitType == 'scale') {
				if (imgRatio > canvasRatio) {
					width = o.thumbW;
					height = width / imgRatio;
				}
				else {
					height = o.thumbH;
					width = imgRatio * height;
				}
			}
			else {
				if (imgRatio > canvasRatio) {
					height = o.thumbH;
					width = imgRatio * height;
				}
				else {
					width = o.thumbW;
					height = width / imgRatio;
				}
			}
			width = (width > naturalWidth) ? naturalWidth : width;
			height = (height > naturalHeight) ? naturalHeight : height;
			$(img).css({
				'width' : width + 'px',
				'height' : height + 'px'
			});
			if (o.fitType == 'fixed') {
				if (width > o.thumbW) $(img).css('margin-left', -(width - o.thumbW) / 2 + 'px');
				if (height > o.thumbH) $(img).css('margin-top', -(height - o.thumbH) / 2 + 'px');
			}
		},
		loadImage : function(imgUrl, callback) {
			var img = document.createElement('img');
			img.onload = function() {
				callback(img);
			};
			img.src = imgUrl;
		}
	};
})(jQuery)
