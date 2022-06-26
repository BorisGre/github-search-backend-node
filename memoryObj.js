var memoryObj = (settings) => {
    var req = Symbol("req")
 
   return {
     cachedReq: {
           req: { date: 'unixtimestamp', answer: 'jsonObj'}
     },
     put(newEntry){ 
        // console.log(`put date`, newEntry.date) 
        // console.log(`newEntry`, newEntry)
         this.cachedReq = {...this.cachedReq, ...newEntry}
        // console.log(`CACHE`, this.cachedReq)
     },
     get(request){    
        var preAns = this.cachedReq[request] || {}
        //console.log(`preAns`, preAns)
        var cacheInvalidationDiffTime = settings.cacheInvalidationDiffTime*100//convert second to ms
        var status = 'ok'
            status = Object.keys(preAns).length < 1 ? 'noEntry' : status
            status = ((new Date).getTime() - preAns.date >= cacheInvalidationDiffTime) ? 'entryExpired': status
            var out =  {status, data: preAns}  
             console.log(`MEMORY GET`, out)                                              
        return out                                                         
     },
     cleanOne(request){
         delete this.cachedReq[request]
     },
     cleanAll(){
        this.cachedReq = {req: { date: 'unixtimestamp', answer: 'jsonObj'}}  
     }, 
    }
}

module.exports = memoryObj