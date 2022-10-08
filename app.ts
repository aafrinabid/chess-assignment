const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const chessArray:number[][]=[
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7],
[0,1,2,3,4,5,6,7]
]
console.log(chessArray[0][7])


const findPossibleMove=(index:number,number:number)=>{
  let possiblePositions=[]
  //possible upwardmotion
    if(chessArray[index-1]!=undefined && chessArray[index-2]!=undefined){
        if(chessArray[index][number-1]!=undefined){
            let leftpostion={                                                                                                                       
                index:index-2,
                secondArrayIndex:number-1
            }
            possiblePositions.push(leftpostion)
    
        }
        if(chessArray[index][number+1]!=undefined){
            let rightpostion={
                index:index-2,
                secondArrayIndex:number+1
            }
            possiblePositions.push(rightpostion)
    
        }
    }
    //checking DownwardMotion
    if(chessArray[index+1]!=undefined && chessArray[index+2]!=undefined){
        if(chessArray[index][number-1]!=undefined){
            let leftpostion={
                index:index+2,
                secondArrayIndex:number-1
            }
            possiblePositions.push(leftpostion)
    
        }
        if(chessArray[index][number+1]!=undefined){
            let rightpostion={
                index:index+2,
                secondArrayIndex:number+1
            }
            possiblePositions.push(rightpostion)
    
        }
    }

    // checking LeftwardMotion
    if(chessArray[index][number-1]!=undefined && chessArray[index][number-2]!=undefined){
      if(chessArray[index-1]!=undefined){
        let upwardposition={
            index:index-1,
            secondArrayIndex:number-2
            
        }
        possiblePositions.push(upwardposition)
      }
      if(chessArray[index+1]!=undefined){
        let downwardpostion={
            index:index+1,
            secondArrayIndex:number-2
        }
        possiblePositions.push(downwardpostion)
      }
    }

//checking Rightwardmotion
if(chessArray[index][number+1]!=undefined && chessArray[index][number+2]!=undefined){
    if(chessArray[index-1]!=undefined){
      let upwardposition={
          index:index-1,
          secondArrayIndex:number+2
          
      }
      possiblePositions.push(upwardposition)
    }
    if(chessArray[index+1]!=undefined){
      let downwardpostion={
          index:index+1,
          secondArrayIndex:number+2
      }
      possiblePositions.push(downwardpostion)
    }
  }
return possiblePositions

}

app.post('/getmoves',async(req:any,res:any)=>{
    try{
        const i=req.body.i
        const j=req.body.j
       const result= findPossibleMove(i,j)
       res.json(result)
         
    }catch{

    }

})

app.listen(4000,()=>{
    console.log('listending 4000')
})