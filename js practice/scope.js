function abc(){
    var a = 10;
    function xyz(){
        console.log(a);
        var b = 20;
    }
    xyz();
    console.log(b);
}

abc();