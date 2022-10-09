import * as dotenv from "dotenv";
dotenv.config()
const express:any =require('express');
import {Request,Response} from "express"
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT=process.env.PORT || 5000


const generateArray=()=>{
    let chessArray:number[][]=[]
    for(let i =0;i<8;i++){
   chessArray[i]=[]
        for(let j=0;j<8;j++){
            chessArray[i][j]=j
        }
    }
    return chessArray
}
const chessArray=generateArray()




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

app.post('/getmoves',async(req:Request,res:Response)=>{
    try{
        const firstArrayIndex=req.body.i
        const secondArrayIndex=req.body.j
       const result= findPossibleMove(firstArrayIndex,secondArrayIndex)
       res.json(result)
         
    }catch{

    }

})

app.listen(PORT,()=>{
    console.log('listening at',PORT)
})