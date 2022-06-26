var businessLayer = {}

businessLayer.pipe = async (memoryObj, searchRequest, https, settings) => {

    var outResp = {}
    var outData = {}
    var ErrorData = {}
    var inMemoryData = businessLayer.getDataFromInMemoryObj(memoryObj, searchRequest, settings)
    outData = inMemoryData.data
      // console.log(`inmemoryQQQ`, inMemoryData)
    if(inMemoryData.status === 'noEntry' || inMemoryData.status === 'entryExpired') {
        console.log(`call APi`)//, inMemoryData)
        var APIData = await businessLayer.getDataFromGithub(searchRequest, https, settings)

       // console.log(`api`, APIData)
        APIData.status === 'ok' ? businessLayer.writeDataToInMemoryObj(memoryObj,  searchRequest, APIData) 
                                : ''

       outData = APIData.status === 'ok' ? APIData : ErrorData                               
    }
    //console.log(`pipe out data\n`, outData)
    return ({...outResp, ...outData})
}

businessLayer.getDataFromInMemoryObj = (memoryObj, searchRequest, settings) => {
    //console.log(`from inmemory`, memoryObj, searchRequest)
    var data = memoryObj.get(searchRequest, settings.cacheRecordLifeTime)
    return data
}    
businessLayer.getDataFromGithub = async (searchRequest, https, settings) => {
  console.log(`get from api`, searchRequest)
  //https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    const options = {
        hostname: `thecocktaildb.com`,//settings.apiLink.hostname,
        port: settings.apiLink.port,
        path: `/api/json/v1/1/search.php?s=${searchRequest}`,//`${settings.apiLink.path}/${searchRequest}`,
        method: 'GET',
        /*headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        },*/
      };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          
          var responseBody = '';
    
          res.on('data', (chunk) => {
            responseBody += chunk;
          });
    
          res.on('end', () => {
            //console.log(`end of fetching`, responseBody)
            resolve({status: 'ok', data: responseBody});
          });
        });
    
        req.on('error', (err) => {
          reject(err);
        });
    
       // req.write(data)
        req.end();
      });
}

businessLayer.writeDataToInMemoryObj = (memoryObj, searchRequest, data) => {
   /// console.log(`search req write`, searchRequest)
    memoryObj.put({[searchRequest]: {date: (new Date).getTime(), answer: data}})
}

module.exports = businessLayer