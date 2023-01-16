//Visualize the ten most populated countries and the ten most spoken languages in the world using DOM(HTML, CSS, JS)

const populationButton = document.querySelector('.population');
const languagesButton = document.querySelector('.languages');
const graphTitle = document.querySelector('.graph-title');
const subtitle = document.querySelector('.subtitle');


subtitle.innerHTML = `Currently, we have ${countries_data.length} countries`;


function mostSpokenLanguages(arr, num) {
    let result = [];  
    const newArr = [];
  
    arr.forEach(item => newArr.push(...item["languages"]));
    const allLang = new Set(newArr);
  
    for (item of allLang) {
      const filtredLang = newArr.filter(lang => item === lang);
      result.push({[item]: filtredLang.length});
    }
  
    result = result.sort((a, b) => Object.values(b) - Object.values(a));
  
    return result.slice(0, num);
}


function mostPopulated(arr, num) {
    const result = [];
    arr.sort((a, b) => b['population'] - a['population']);

    let sumForWorld = arr.reduce((sum, value) => sum + Number(value.population), 0)

    result.push({World: sumForWorld})
    for (i = 0; i < num; i++) {
        result.push({[arr[i].name]: arr[i].population});
    }

    return result;
}


function createRow(item, coefficient = 1) {

    const row = document.createElement('div');
    row.className = 'row';

    const lang = document.createElement('span');
    lang.className = 'text-span';
    (!/\s/.test(Object.entries(item)[0][0]))
    ? lang.innerHTML = Object.entries(item)[0][0]
    : lang.innerHTML = createAbbreviation(Object.entries(item)[0][0]);

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row-div';

    const colorDiv = document.createElement('div');
    colorDiv.style.backgroundColor = 'Orange';
    colorDiv.style.height = '85%';
    colorDiv.style.borderRadius = '2px';
    colorDiv.style.width = `${Object.entries(item)[0][1] * coefficient}%`;

    const amount = document.createElement('span');
    amount.innerHTML = new Intl.NumberFormat('en-US').format(Object.entries(item)[0][1]);


    rowDiv.append(colorDiv);
    row.append(lang);
    row.append(rowDiv);
    row.append(amount);

    const graphWrapper = document.querySelector('.graph-wrapper');
    graphWrapper.appendChild(row);
}


function createAbbreviation(str) {
    let rstr = '';
    const pattern = /[A-Z]/;

    for (i of str) {
        if (pattern.test(i)) rstr += i;
    }

    return rstr;
}


function deleteRows() {
    const graphWrapper = document.querySelector('.graph-wrapper');
    const rows = document.querySelectorAll('.row');

    for (i of rows) {
        graphWrapper.removeChild(i);
    }
}



populationButton.addEventListener('click', () => {
    deleteRows();

    graphTitle.innerHTML = '10 Most populated countries in the world';

    for (item of mostPopulated(countries_data, 10)) {
        createRow(item, 0.000000013);
    }
});


languagesButton.addEventListener('click', () => {
    deleteRows();

    graphTitle.innerHTML = '10 Most spoken languages in the world';

    for (item of mostSpokenLanguages(countries_data, 10)) {
        createRow(item);
    }
});
