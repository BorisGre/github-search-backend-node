var http = require('http');
const https = require('https');
const endpoints = require('./endpoints');
const dtoTemplate = require('./dtoTemplate')
var settings = require('./settings')
var memoryObj = require('./memoryObj');
var mainLayer = require('./mainLayer/mainLayer');
var businessLayer = require('./businessLayer');

memoryObj = memoryObj()

http.createServer(async function (request, response) {

         var outData = "{ddd}"
         //{"status": "ok|invalid|error", "data": "obj", "comment": ""}
         const checkedAuthObj = await  mainLayer.auth(request, dtoTemplate)//check auth
         const parsedEndpointDto = await mainLayer.parse(checkedAuthObj, request, dtoTemplate)
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
                response.end(JSON.stringify(outData))
         
                   
    }).listen(settings.port);