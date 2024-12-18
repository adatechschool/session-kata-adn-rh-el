const fs = require('fs')
const fullAdnFile = fs.readFileSync("adn.txt", "utf8")
const conversionTable = {
    'ATA':'I',
    'ATC':'I',
    'ATT':'I',
    'ATG':'M',
    'ACA':'T',
    'ACC':'T',
    'ACG':'T',
    'ACT':'T',
    'AAC':'N',
    'AAT':'N',
    'AAA':'K',
    'AAG':'K',
    'AGC':'S',
    'AGT':'S',
    'AGA':'R',
    'AGG':'R',
    'CTA':'L',
    'CTC':'L',
    'CTG':'L',
    'CTT':'L',
    'CCA':'P',
    'CCC':'P',
    'CCG':'P',
    'CCT':'P',
    'CAC':'H',
    'CAT':'H',
    'CAA':'Q',
    'CAG':'Q',
    'CGA':'R',
    'CGC':'R',
    'CGG':'R',
    'CGT':'R',
    'GTA':'V',
    'GTC':'V',
    'GTG':'V',
    'GTT':'V',
    'GCA':'A',
    'GCC':'A',
    'GCG':'A',
    'GCT':'A',
    'GAC':'D',
    'GAT':'D',
    'GAA':'E',
    'GAG':'E',
    'GGA':'G',
    'GGC':'G',
    'GGG':'G',
    'GGT':'G',
    'TCA':'S',
    'TCC':'S',
    'TCG':'S',
    'TCT':'S',
    'TTC':'F',
    'TTT':'F',
    'TTA':'L',
    'TTG':'L',
    'TAC':'Y',
    'TAT':'Y',
    'TAA':'_',
    'TAG':'_',
    'TGC':'C',
    'TGT':'C',
    'TGA':'_',
    'TGG':'W',
}


const sliceStr = (str, x) => {
    const res = []
    for (let i = 0; i<str.length; i+=x) {
        res.push(str.slice(i, x+i))
    }
    return res
}



const convertElements = (data, table) => {
    const threeCharsArr = sliceStr(data, 3)
    const protObj = {}

    threeCharsArr.forEach(element => {
        protObj[element] = table[element]
    })

    return protObj
}

// const test = convertElements(fullAdnFile, conversionTable)
// console.log(test)


const findRecurrentElements = (data) => {
    const twentyfiveCharsArr = sliceStr(data, 25)
    const fiveSeqSubGroup = twentyfiveCharsArr.map(element => sliceStr(element, 5))
    const recurrentPatternsArr = []
    
    for (let i = 0; i< fiveSeqSubGroup.length; i++) {
    
        const seq = {
            A: [0,0,0,0,0],
            C: [0,0,0,0,0],
            G: [0,0,0,0,0],
            T: [0,0,0,0,0]
        }
        
        for (let j = 0; j<5; j++) {
    
            fiveSeqSubGroup[i][j].split('').map((element, index) => seq[element][index]++)
    
        }
    
        recurrentPatternsArr.push(seq)

    }    

    return recurrentPatternsArr
}


const isBigger = (numberToCheck, biggest) => {
    return numberToCheck >= biggest && numberToCheck > 1 ? true : false
}


const createAllSequences = (data) => {

    const recurrentPatternsArr = findRecurrentElements(data)
    const sequences = []

    // iterate on every subgroup
    for (let i = 0; i<recurrentPatternsArr.length; i++) {
        sequences.push(createSubSequence(recurrentPatternsArr, i))
    }

    return sequences

}

const createSubSequence = (patterns, index) => {
    const sequence = []

    // for each subgroup, iterate on each index of the 5 numbers sequence
    for (let j = 0; j < 5; j++) {

        let winner = ""
        let biggestNum = 1

        // for each index, find biggest number and save corresponding letter
        for (let k = 0; k<4; k++) {

            const numberToCheck = Object.entries(patterns[index])[k][1][j]
            const letterChecked = Object.entries(patterns[index])[k][0]

            if (isBigger(numberToCheck, biggestNum)) {
                biggestNum = numberToCheck
                winner += letterChecked
            }

        }

        sequence.push(winner)       

    }

    return sequence
}

const test = createAllSequences(fullAdnFile)
console.log(test)