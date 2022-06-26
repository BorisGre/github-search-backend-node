var mainLayer = {}

mainLayer.parse = (authDto, request, dto) => {
  //console.log(request)
  // console.log(`req`, request.headers.referer)
   if(request.headers.referer !== undefined){
       //console.log(request.headers.referer.match(request.headers.host+'/(.*)')[1])
       console.log(`endpoint`, request.headers)
       const endpoint = request.headers.referer.match()
       //console.log(endpoint, request.headers.referer.match('/search[\/?]q=(.*)'))//+'/[\w]?q=(.*)'))
       return  {...dto, status: 'ok', data: {endpoint}} ///endpoint// == '' ? '/' : endpoint
   }
   return {...dto, status: 'invalid'}
}

mainLayer.checkEndPoint = (parsedEndpointDto, dtoTemplate, endpoints, request) => {
    //console.log(`point`,  parsedEndpointDto, endpoints)//, endpoints.includes(parsedEndpointDto.data.endpoint))
    endpoints.includes(parsedEndpointDto.data.endpoint) ? '' : ''
    //console.log(`checkEndPoint`, request.headers)
 
    var searchRequest
    if(request.headers.referer !== undefined){
      searchRequest = request.headers.referer.match(request.headers.host+'/search[\/?]q=(.*)')[1]
    }
    searchRequest = Math.round(Math.random()) == 0 ? 'vodka' : 'margarita'
    
    console.log(`SR`, searchRequest)
    return searchRequest;// || 'vodka' //'google' 
}

mainLayer.auth = (authData) => {
    return new Promise((res, rej) => {
        res(true)
    }) 
}


module.exports = mainLayer