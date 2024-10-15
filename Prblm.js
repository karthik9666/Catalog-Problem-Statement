function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, xValue) {
    let total = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                const [xj] = points[j];
                term *= (xValue - xj) / (xi - xj);
            }
        }
        total += term;
    }

    return total;
}

function findConstantTerm(jsonData) {
    const n = jsonData.keys.n;
    const points = [];

    // Decode each root
    for (const key in jsonData) {
        if (key !== 'keys') {
            const base = parseInt(jsonData[key].base);
            const encodedValue = jsonData[key].value;
            const yDecoded = decodeValue(base, encodedValue);
            const x = parseInt(key);
            points.push([x, yDecoded]);
        }
    }

    // Calculate the constant term (evaluating polynomial at x = 0)
    const c = lagrangeInterpolation(points, 0);

    return c;
}

// Sample Test Case JSON input as strings
const jsonInput1 = `{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}`;

const jsonInput2 = `{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}`;

// Parse JSON inputs
const testCase1 = JSON.parse(jsonInput1);
const testCase2 = JSON.parse(jsonInput2);

// Find constant terms
const secret1 = findConstantTerm(testCase1);
const secret2 = findConstantTerm(testCase2);

// Print the results
console.log(`Secret for Test Case 1: ${secret1}`);
console.log(`Secret for Test Case 2: ${secret2}`);

