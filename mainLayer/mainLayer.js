var mainLayer = {}

mainLayer.parse = (authDto, request, dto) => {
  console.log(`URL`, request.url, request.url.match('/(.*)[\?]q=(.*)'))
   var parsed  = request.url.match('/(.*)[\?]q=(.*)')
   var endpoint = parsed[1]
   var searchRequest = parsed[2]

   //console.log(`REFERER`, request.headers.referer)
   //console.log(`HEADERS`, request.headers)
   if(request.url === '/favicon.ico'){
      return {...dto, status: 'exception', comment: 'favicon'}
   }
   //if(request.headers.referer !== undefined){
       //console.log(request.headers.referer.match(request.headers.host+'/(.*)')[1])
     //  console.log(`endpoint`, request.headers)
     //  const endpoint = request.headers.referer.match()
       //console.log(endpoint, request.headers.referer.match('/search[\/?]q=(.*)'))//+'/[\w]?q=(.*)'))
       return  {...dto, status: 'ok', data: {endpoint}} ///endpoint// == '' ? '/' : endpoint
   //}
   return {...dto, status: 'invalid'}
}

mainLayer.checkEndPoint = (parsedEndpointDto, dtoTemplate, endpoints, request) => {
    //console.log(`point`,  parsedEndpointDto, endpoints)//, endpoints.includes(parsedEndpointDto.data.endpoint))
    endpoints.includes(parsedEndpointDto.data.endpoint) ? '' : ''
    //console.log(`checkEndPoint`, request.headers)
 
    /*var searchRequest
    if(request.headers.referer !== undefined){
      searchRequest = request.headers.referer.match(request.headers.host+'/search[\/?]q=(.*)')[1]
    }*/
    var splited = request.url.split("&")
    var parsed = splited[0].match('q=(.*)')
    var parsed1
    if(splited.length > 1){ 
      parsed1 = splited[1].match('page=[\d]{0,10}')
    }
  
   //var endpoint = parsed[1]
   console.log(`PARSED\n`, splited, parsed, parsed1)
   var searchRequest = parsed[1]
   var page = 5;//parsed1[1];
   // searchRequest = Math.round(Math.random()) == 0 ? 'vodka' : 'margarita'
    
    console.log(`SR`, searchRequest, page)
    return searchRequest;// || 'vodka' //'google' 
}

mainLayer.auth = (authData) => {
    return new Promise((res, rej) => {
        res(true)
    }) 
}


module.exports = mainLayer