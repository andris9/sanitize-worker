var sanitizer = require("sanitizer"),
    Gearman = require("node-gearman"),
    gearman = new Gearman();

var counter = 0;

sanitizer.initialize(function(err){
    if(err){
        throw err;
    }
    
    console.log("Sanitizer initialized, waiting for jobs");
    
    gearman.registerWorker("sanitize", function(payload, worker){
        console.log("Incoming job #"+(++counter));
        
        if(!payload){
            worker.error();
            return;
        }
    
        sanitizer.sanitize(payload, function(err, data){
            if(err){
                worker.error();
            }else{
                worker.end(JSON.stringify(data));
            }
        });
    });
});


