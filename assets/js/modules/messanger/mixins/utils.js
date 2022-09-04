let utils = {
    methods: {
        isObjectEmpty(obj) {
            return Object.keys(obj).length === 0;
        },

        getRandomColor() {
            // Note : To get random dark color
            let lum = -0.25;
            let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            let rgb = "#",
                c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        },

        generateAvatar(name){
            let initials = name.split(' ').map(function(str) { return str ? str[0].toUpperCase() : "";}).join('');
            let canvas = document.createElement('canvas');
            let radius = 30;
            let margin = 5;
            canvas.width = radius*2+margin*2;
            canvas.height = radius*2+margin*2;
          
            // Get the drawing context
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(radius+margin,radius+margin,radius, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = this.getRandomColor();
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = 'center';
            ctx.fillText(initials, radius+5,radius*4/3+margin);
            return canvas.toDataURL();
        }
    }
}