"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const generateArray = () => {
    let chessArray = [];
    for (let i = 0; i < 8; i++) {
        chessArray[i] = [];
        for (let j = 0; j < 8; j++) {
            chessArray[i][j] = j;
        }
    }
    return chessArray;
};
const chessArray = generateArray();
const findPossibleMove = (index, number) => {
    let possiblePositions = [];
    //possible upwardmotion
    if (chessArray[index - 1] != undefined && chessArray[index - 2] != undefined) {
        if (chessArray[index][number - 1] != undefined) {
            let leftpostion = {
                index: index - 2,
                secondArrayIndex: number - 1
            };
            possiblePositions.push(leftpostion);
        }
        if (chessArray[index][number + 1] != undefined) {
            let rightpostion = {
                index: index - 2,
                secondArrayIndex: number + 1
            };
            possiblePositions.push(rightpostion);
        }
    }
    //checking DownwardMotion
    if (chessArray[index + 1] != undefined && chessArray[index + 2] != undefined) {
        if (chessArray[index][number - 1] != undefined) {
            let leftpostion = {
                index: index + 2,
                secondArrayIndex: number - 1
            };
            possiblePositions.push(leftpostion);
        }
        if (chessArray[index][number + 1] != undefined) {
            let rightpostion = {
                index: index + 2,
                secondArrayIndex: number + 1
            };
            possiblePositions.push(rightpostion);
        }
    }
    // checking LeftwardMotion
    if (chessArray[index][number - 1] != undefined && chessArray[index][number - 2] != undefined) {
        if (chessArray[index - 1] != undefined) {
            let upwardposition = {
                index: index - 1,
                secondArrayIndex: number - 2
            };
            possiblePositions.push(upwardposition);
        }
        if (chessArray[index + 1] != undefined) {
            let downwardpostion = {
                index: index + 1,
                secondArrayIndex: number - 2
            };
            possiblePositions.push(downwardpostion);
        }
    }
    //checking Rightwardmotion
    if (chessArray[index][number + 1] != undefined && chessArray[index][number + 2] != undefined) {
        if (chessArray[index - 1] != undefined) {
            let upwardposition = {
                index: index - 1,
                secondArrayIndex: number + 2
            };
            possiblePositions.push(upwardposition);
        }
        if (chessArray[index + 1] != undefined) {
            let downwardpostion = {
                index: index + 1,
                secondArrayIndex: number + 2
            };
            possiblePositions.push(downwardpostion);
        }
    }
    return possiblePositions;
};
app.post('/getmoves', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstArrayIndex = req.body.i;
        const secondArrayIndex = req.body.j;
        const result = findPossibleMove(firstArrayIndex, secondArrayIndex);
        res.json(result);
    }
    catch (_a) {
    }
}));
app.listen(PORT, () => {
    console.log('listening at', PORT);
});
