fetch('./paises.json')
    .then(pegarpais => pegarpais.json())
    .then(paises => MostrarPais(paises));

let paisesGlobal = []; // Para armazenar os países globalmente
let totalPopulacaoTabela1 = 0; // Total de população na tabela 1
let totalPopulacaoTabela2 = 0; // Total de população na tabela 2

function MostrarPais(paises) {
    const tabela1 = document.querySelector('#paises tbody');
    const tabela2 = document.querySelector('#paises2 tbody');

    paisesGlobal = paises;
    let populationSum = 0;

    paises.sort((a, b) => a.name.localeCompare(b.name)); // Ordena os países alfabeticamente

    paises.forEach((item, index) => {
        populationSum += item.population;
        tabela1.innerHTML += `
            <tr id="row-${index}">
                <td>${item.name}</td>
                <td>${item.capital}</td>
                <td><img src="${item.flag}" alt="Bandeira de ${item.name}"></td>
                <td>${item.numericCode}</td>
                <td>${item.population}</td>
                <td><button onclick="moverPais(${index})">+</button></td>
            </tr>`;
    });

    totalPopulacaoTabela1 = populationSum;

    const totalRow1 = `
        <tr id="totalRow1">
            <td colspan="4"><strong>Total de países:</strong> ${paises.length}</td>
            <td><strong>Total da população:</strong> ${populationSum}</td>
            <td></td>
        </tr>`;
    const totalRow2 = `
        <tr id="totalRow2">
            <td colspan="4"><strong>Total de países:</strong> 0</td>
            <td><strong>Total da população:</strong> 0</td>
            <td></td>
        </tr>`;

    tabela1.innerHTML += totalRow1;
    tabela2.innerHTML += totalRow2;
}

window.moverPais = function(index) {
    const tabela1 = document.querySelector('#paises tbody');
    const tabela2 = document.querySelector('#paises2 tbody');
    const row = document.querySelector(`#row-${index}`);
    const country = paisesGlobal[index];

    totalPopulacaoTabela1 -= country.population;
    totalPopulacaoTabela2 += country.population;

    // Remove a linha da primeira tabela
    tabela1.removeChild(row);

    // Adiciona a linha na segunda tabela
    tabela2.insertAdjacentHTML('beforeend', `
        <tr id="row-${index}">
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td><img src="${country.flag}" alt="Bandeira de ${country.name}"></td>
            <td>${country.numericCode}</td>
            <td>${country.population}</td>
            <td><button onclick="removerPais(${index})">-</button></td>
        </tr>`);

    atualizarTotais();
    ordenarTabela('#paises2 tbody');
}

window.removerPais = function(index) {
    const tabela1 = document.querySelector('#paises tbody');
    const tabela2 = document.querySelector('#paises2 tbody');
    const row = document.querySelector(`#row-${index}`);
    const country = paisesGlobal[index];

    totalPopulacaoTabela1 += country.population;
    totalPopulacaoTabela2 -= country.population;

    // Remove a linha da segunda tabela
    tabela2.removeChild(row);

    // Adiciona a linha na primeira tabela
    tabela1.insertAdjacentHTML('beforeend', `
        <tr id="row-${index}">
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td><img src="${country.flag}" alt="Bandeira de ${country.name}"></td>
            <td>${country.numericCode}</td>
            <td>${country.population}</td>
            <td><button onclick="moverPais(${index})">+</button></td>
        </tr>`);

    atualizarTotais();
    ordenarTabela('#paises tbody');
}

function atualizarTotais() {
    const tabela1 = document.querySelector('#paises tbody');
    const tabela2 = document.querySelector('#paises2 tbody');
    const totalRow1 = document.querySelector('#totalRow1');
    const totalRow2 = document.querySelector('#totalRow2');

    const totalPaisesTabela1 = document.querySelectorAll('#paises tbody tr').length - 1; // Exclui a linha total
    const totalPaisesTabela2 = document.querySelectorAll('#paises2 tbody tr').length - 1; // Exclui a linha total

    totalRow1.innerHTML = `
        <td colspan="4"><strong>Total de países:</strong> ${totalPaisesTabela1}</td>
        <td><strong>Total da população:</strong> ${totalPopulacaoTabela1}</td>
        <td></td>`;

    totalRow2.innerHTML = `
        <td colspan="4"><strong>Total de países:</strong> ${totalPaisesTabela2}</td>
        <td><strong>Total da população:</strong> ${totalPopulacaoTabela2}</td>
        <td></td>`;

    tabela1.appendChild(totalRow1);
    tabela2.appendChild(totalRow2);
}

function ordenarTabela(tabelaId) {
    const tabela = document.querySelector(tabelaId);
    const linhas = Array.from(tabela.querySelectorAll('tr'));
    const linhasSemTotal = linhas.slice(0, -1); // Exclui a linha total

    linhasSemTotal.sort((a, b) => {
        const nomeA = a.querySelector('td').innerText.toLowerCase();
        const nomeB = b.querySelector('td').innerText.toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    linhasSemTotal.forEach(linha => tabela.insertBefore(linha, tabela.querySelector('tr:last-child')));
}

function Paises() {
    return (
        <>
            <div id="tabela-container">
                <table id='paises'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capital</th>
                            <th>Bandeira</th>
                            <th>Id</th>
                            <th>População</th>
                            <th>Adicionar</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

                <table id='paises2'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capital</th>
                            <th>Bandeira</th>
                            <th>Id</th>
                            <th>População</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Paises;
