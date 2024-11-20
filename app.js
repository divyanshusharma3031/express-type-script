let obj = {
    x: 1,
    y: 2,
}

obj.methods = function() {
    console.log(this);// should point to the obj
}
obj.methods();