var http = require('http');
const https = require('https');
const endpoints = require('./endpoints');
const dtoTemplate = require('./dtoTemplate')
var settings = require('./settings')
//var router 
var memoryObj = require('./memoryObj');
var mainLayer = require('./mainLayer/mainLayer');
var businessLayer = require('./businessLayer');

memoryObj = memoryObj(settings)

http.createServer(async function (request, response) {
        // if(request'/favicon.ico', response.statusCode(204))
        if (request.url === '/favicon.ico') {
         response.writeHead(200, {'Content-Type': 'image/x-icon'} );
         response.end();
         console.log('favicon requested');
         return;
       } else {
          console.log(`requested url`, request.url)
       }
         var outData = "{ddd}"
         try {
         //{"status": "ok|invalid|error", "data": "obj", "comment": ""}
         const checkedAuthObj = await  mainLayer.auth(request, dtoTemplate)//check auth
         const parsedEndpointDto = await mainLayer.parse(checkedAuthObj, request, dtoTemplate)
         console.log(`PARSED DTO`, parsedEndpointDto)
       /*  if(parsedEndpointDto.status === 'exception' && parsedEndpointDto.status === 'favicon'){
            response.statusCode(204)
                  response.end()
         }*/
         //const route = await router(parsedEndpointDto, dtoTemplate, request)
         const searchRequest = await mainLayer.checkEndPoint(parsedEndpointDto, dtoTemplate, endpoints, request)
         outData = await businessLayer.pipe(memoryObj, searchRequest, https, settings)
                
                /*.then(checkedAuthObj => mainLayer.parse(checkedAuthObj, request, dtoTemplate))
                .then(parsedEndpointDto => mainLayer.checkEndPoint(parsedEndpointDto, dtoTemplate, endpoints, request))
                .then(searchRequest => businessLayer.pipe(memoryObj, searchRequest, https, settings))
                .then(res => { 
                  outData =  JSON.stringify(res)
                  //console.log(`outData`, outData)

                })
                   //.then(mainLayer.prepareResponse(TempResponse))
                .catch(er => console.log(`er`, er)
                   //mainLayer.prepareResponse(TempResponse)
                )*/
   
                //console.log(`outData`, outData)
                //console.log(`inMemoryObj`, memoryObj)
                response.writeHead(200, { 'Content-Type': 'application/json' });
                //console.log(`outData\n`, outData)
                response.write(JSON.stringify(outData))
                 response.end()
               } catch(e) {
                  console.log(`EXCEPTION`, e)
                  response.statusCode(204)
                  response.end()
               }
               
         
                   
    }).listen(settings.port);