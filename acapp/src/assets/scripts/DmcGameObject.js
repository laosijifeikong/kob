const DMC_GAME_OBJECTS = [];

export class DMCGameObject {
    constructor() {
        DMC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() {

    }

    update() {

    }

    on_destory() { //删除之前执行

    }

    destroy() {
        this.on_destory();

        for (let i in DMC_GAME_OBJECTS) {
            const obj = DMC_GAME_OBJECTS[i];
            if (obj === this) {
                DMC_GAME_OBJECTS.splice(i); //从数组中删除用splice
                break;
            }
        }
    }
}

let last_timestamp; //上一次执行的时刻
const step = timestamp => {
    for (let obj of DMC_GAME_OBJECTS) { //of遍历值，in遍历下标
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        }
        else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)
