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

const threeCharsArr = sliceStr(fullAdnFile, 3)


const protTable = new Map()
const protObj = {}

threeCharsArr.forEach(element => {
    protTable.set(element, conversionTable[element])
    protObj[element] = conversionTable[element]
})

// console.log(protObj)


const twentyfiveCharsArr = sliceStr(fullAdnFile, 25)

const fiveSeqSubGroup = twentyfiveCharsArr.map(element => sliceStr(element, 5))


// console.log(fiveSeqSubGroup)

// pour chaque groupe
// itérer sur les 5 sous groupe
// compter le nombre de A C G T et leurs index
// 

const recurrentPatterns = {}

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

    recurrentPatterns[`seq${i+1}`] = seq

}

// console.log(fiveSeqSubGroup[1])
// console.log(recurrentPatterns)
