
exports.getVersion=function(req,res){
    var data={version:"1.0.1",date:new Date()};
    res.send(data);
}