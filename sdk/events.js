// event runafterstart
global.fn.eventEmitter.on('runafterstart', (params, callback) => {
    let task = {'patams': params, 'callback': callback};
    global.afterStart.push(task)
});