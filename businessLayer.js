var businessLayer = {}

businessLayer.pipe = async (memoryObj, searchRequest, https, settings) => {

    var outResp = {}
    var outData = {}
    var ErrorData = {}
    var inMemoryData = businessLayer.getDataFromInMemoryObj(memoryObj, searchRequest, settings)
    outData = inMemoryData.data
      // console.log(`inmemoryQQQ`, inMemoryData)
      console.log(`Inmemory Date`, inMemoryData['data']['date'], (new Date).getTime(), (new Date).getTime() - inMemoryData['data']['date'] )
    if(inMemoryData.status === 'noEntry' || inMemoryData.status === 'entryExpired') {
        console.log(`call APi`)//, inMemoryData.status)//, inMemoryData)
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
  console.log(`get from api`, searchRequest, page = 1)
  //https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    const options = {
        hostname: settings.apiLink.hostname,
        port: settings.apiLink.port,
        path: `/search/repositories?q=${searchRequest}&sort=best_matched&order=desc&page=${page}&per_page=${settings.per_page}`,
        //path: `/api/json/v1/1/search.php?s=${searchRequest}`,//`${settings.apiLink.path}/${searchRequest}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
          //'Content-Length': data.length
        },
      };

      console.log(`PATH \n`, options.hostname, options.path)

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          
          var responseBody = '';
    
          res.on('data', (chunk) => {
            responseBody += chunk;
          });
    
          res.on('end', () => {
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
    memoryObj.put({[searchRequest]: {date: (new Date).getTime(), answer: data}})
}

module.exports = businessLayer