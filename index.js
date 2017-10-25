    var express = require('express');
    var path = require('path');


    var myApp = express();
    
    
    var headerObj = {IP: null, Language: null, OS: null};
    
    //serve static index.html file using static middleware from the public folder
    //myApp.use('/', express.static(path.join(__dirname, 'public')));
    
    
    //use body parser middleware to capture and parse the request
    //myApp.use(bodyparser.urlencoded({extended: false}));
    
    
    
    myApp.get('/*', function (request, response)
                                {
                                  headerObj.IP = request.headers['x-forwarded-for'];
                                  var language = request.headers['accept-language'].split(",");
                                  headerObj.Language = language[0];
                                  var os = request.headers['user-agent'].split("(");
                                  var os1 = os[1].split(")");
                                  headerObj.OS = os1[0];
                                  console.log(headerObj);
                                  
                                  //console.log(JSON.stringify(request.headers['user-agent']));
                                  
                                  
                                  
                                  response.end(JSON.stringify(headerObj));


                                }
            );                    


    myApp.listen(process.env.PORT,process.env.IP, function() {
                                                                console.log("Listening on port: " + process.env.PORT);
                                                                console.log("Listening on IP: " + process.env.IP);
                                                            }
                );  