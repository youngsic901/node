import figlet from "figlet";

figlet(123123, function(err,data) {
    if(err) {
        console.log('❌ Somthing went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});