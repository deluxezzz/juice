
//super game//
const SPIN = new function() {
    let SPIN = this,
    cnv, ctx, width, height, nodes = [], node_count = 0, for_destroy = {};

    let $ = (id) => {return document.getElementById(id)};

    let rect = (x, y, w, h, clr) => {
        ctx.fillstyle = clr;
        ctx.fillRect(x, y, w, h);
    };


    class Node {
        constructor (x, y, w, h, clr, upd) {
            this.id = node_count++;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.clr = clr;
            this.update = upd;
            nodes.push(this);

        }
        
        _update () {
            if (this.update)
                this.update(this);
        }
        

        draw () {
            rect(this.x, this.y, this.w, this.h, this.clr);

        }

        destroy () {
                for_destroy[this.id] = this;
        }
        move (x, y) {
            this.x +=x;
            this.y +=y;

        }
    }

    SPIN.create_node = (x, y, w, h, clr, upd) => {
        return new Node(x, y, w, h, clr, upd);
    };

    SPIN.update = () => {
            for (let i = 0, len = nodes.length; i < len; i++) {
                nodes[i]._update();
                nodes[i].draw();
            }

            requestAnimationFrame(SPIN.update);

    };



    SPIN.start = (W, H) => {
        cnv = $('cnv');
        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
        SPIN.update();

     };
};

window.addEventListener('load', function() {
    SPIN.start(640, 480);
    SPIN.create_node(10, 10, 15, 15, '#ff6d5a', (node) => {
        node.x += 1;
    });

});