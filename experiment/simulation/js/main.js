var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};

function filledCell(cell) {
    return cell !== '' && cell != null;
}

function loadFileData(filename) {
    if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
        try {
            var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
            var filteredData = jsonData.filter(row => row.some(filledCell));
            var headerRowIndex = filteredData.findIndex((row, index) =>
                row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
            );
            if (headerRowIndex === -1 || headerRowIndex > 25) {
                headerRowIndex = 0;
            }
            var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
            csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
            return csv;
        } catch (e) {
            console.error(e);
            return "";
        }
    }
    return gk_fileData[filename] || "";
}

let results = {
    case1: null,
    case2: null,
    case3: null
};
let currentCase = 'case1';
let observationCount = 0;
const maxObservations = 5;
let isAddingToTable = false;

function updateCircuitLabels() {
    const v1 = parseFloat(document.getElementById('v1-input').value) || 0;
    const v2 = parseFloat(document.getElementById('v2-input').value) || 0;
    const r1 = parseFloat(document.getElementById('r1-input').value) || 100;
    const r2 = parseFloat(document.getElementById('r2-input').value) || 150;
    const r3 = parseFloat(document.getElementById('r3-input').value) || 200;

    document.getElementById('v1-label').textContent = `V1: ${v1} V`;
    document.getElementById('v2-label').textContent = `V2: ${v2} V`;
    document.getElementById('r1-label').textContent = `R1: ${r1} Ω`;
    document.getElementById('r2-label').textContent = `R2: ${r2} Ω`;
    document.getElementById('r3-label').textContent = `R3: ${r3} Ω`;
}

function animateMeter(needleId, shadowId, value, maxValue, isVoltmeter = false) {
    const angle = isVoltmeter ? -90 + (value / maxValue) * 90 : -90 + (value / maxValue) * 180;
    anime({
        targets: [`#${needleId}`, `#${shadowId}`],
        rotate: [
            { value: angle * 0.9, duration: 800, easing: 'easeOutQuad' },
            { value: angle * 1.05, duration: 300, easing: 'easeInOutQuad' },
            { value: angle, duration: 200, easing: 'easeInOutQuad' }
        ],
        duration: 1300,
        easing: 'easeInOutQuad'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedAddToObservationTable = debounce(() => {
    if (isAddingToTable) return;
    isAddingToTable = true;
    const addBtn = document.getElementById('add-to-table-btn');
    addBtn.disabled = true;

    try {
        addToObservationTable();
    } finally {
        isAddingToTable = false;
        addBtn.disabled = false;
    }
}, 300);

function selectTab(caseId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab[onclick="selectTab('${caseId}')"]`).classList.add('active');

    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const v1Input = document.getElementById('v1-input');
    const v2Input = document.getElementById('v2-input');
    const resultsTitle = document.getElementById('results-title');
    const switchInstruction = document.getElementById('switch-instruction');
    const addToTableBtn = document.getElementById('add-to-table-btn');

    currentCase = caseId;

    if (caseId === 'case1') {
        s1.value = 'power';
        s2.value = 'power';
        v1Input.value = 220;
        v2Input.value = 110;
        resultsTitle.textContent = 'In presence of both V1 and V2';
        switch instruction.textContent = 'Select both the switches, S1 and S2 to power.';
        addToTableBtn.style.display = 'none';
    } else if (caseId === 'case2') {
        s1.value = 'power';
        s2.value = 'short';
        v1Input.value = 220;
        v2Input.value = 0;
        resultsTitle.textContent = 'In presence of V1 only';
        switchInstruction.textContent = 'Select switch S1 to Power and S2 to Short.';
        addToTableBtn.style.display = 'none';
    } else if (caseId === 'case3') {
        s1.value = 'short';
        s2.value = 'power';
        v1Input.value = 0;
        v2Input.value = 110;
        resultsTitle.textContent = 'In presence of V2 only';
        switchInstruction.textContent = 'Select switch S1 to Short and S2 to Power.';
        addToTableBtn.style.display = 'inline-block';
    }
    updateCircuitLabels();
}

function simulate() {
    const R1 = parseFloat(document.getElementById('r1-input').value) || 100;
    const R2 = parseFloat(document.getElementById('r2-input').value) || 150;
    const R3 = parseFloat(document.getElementById('r3-input').value) || 200;
    const V1 = parseFloat(document.getElementById('v1-input').value) || 0;
    const V2 = parseFloat(document.getElementById('v2-input').value) || 0;

    if (R1 <= 0 || R2 <= 0 || R3 <= 0) {
        alert('Resistor values must be greater than 0 to avoid division by zero.');
        return;
    }

    const S1 = document.getElementById('s1').value;
    const S2 = document.getElementById('s2').value;

    let I1 = 0, I2 = 0, Vmc = 0, I_total = 0, I_R3 = 0;

    if (S1 === 'power' && S2 === 'power') {
        const Va = (V1 * (R2 * R3) + V2 * (R1 * R3)) / (R1 * R2 + R2 * R3 + R1 * R3);
        I1 = (V1 - Va) / R1;
        I2 = (Va - V2) / R2;
        I_R3 = Va / R3;
        Vmc = Va;
        I_total = I1;
    } else if (S1 === 'power' && S2 === 'short') {
        const R_parallel = (R2 * R3) / (R2 + R3);
        const R_eq = R1 + R_parallel;
        I_total = V1 / R_eq;
        I1 = I_total;
        const V_R2_R3 = I_total * R_parallel;
        I2 = V_R2_R3 / R2;
        I_R3 = V_R2_R3 / R3;
        Vmc = I1 * R1;
    } else if (S1 === 'short' && S2 === 'power') {
        const R_12 = (R1 * R2) / (R1 + R2);
        const R_total = R_12 + R3;
        I_R3 = V2 / R_total;
        const V_R12 = I_R3 * R_12;
        I1 = V_R12 / R1;
        I2 = V_R12 / R2;
        Vmc = V_R12;
        I_total = I_R3;
    } else if (S1 === 'dpdt' || S2 === 'dpdt') {
        I1 = 0;
        I2 = 0;
        I_R3 = 0;
        Vmc = 0;
        I_total = 0;
    }

    const P1 = -I1 * I1 * R1;
    const P2 = -I2 * I2 * R2;
    const PR3 = -I_R3 * I_R3 * R3;
    const PV1 = V1 * I1;
    const PV2 = (S1 === 'short' && S2 === 'power') ? V2 * (I1 + I2) : -V2 * I2;
    const totalPower = P1 + P2 + PR3 + PV1 + PV2;

    animateMeter('a1-needle', 'a1-needle-shadow', Math.abs(I1), 5);
    animateMeter('a2-needle', 'a2-needle-shadow', Math.abs(I2), 5);
    animateMeter('mc-needle', 'mc-needle-shadow', Vmc, 300, true);

    const powerResult = document.getElementById('power-result');
    if (powerResult) powerResult.textContent = totalPower.toFixed(4);

    const p1Value = document.getElementById('p1-value');
    if (p1Value) p1Value.textContent = P1.toFixed(4);

    const p2Value = document.getElementById('p2-value');
    if (p2Value) p2Value.textContent = P2.toFixed(4);

    const p3Value = document.getElementById('p3-value');
    if (p3Value) p3Value.textContent = PR3.toFixed(4);

    const pv1Value = document.getElementById('pv1-value');
    if (pv1Value) pv1Value.textContent = PV1.toFixed(4);

    const pv2Value = document.getElementById('pv2-value');
    if (pv2Value) pv2Value.textContent = PV2.toFixed(4);

    const totalPowerValue = document.getElementById('total-power-value');
    if (totalPowerValue) totalPowerValue.textContent = totalPower.toFixed(4);

    results[currentCase] = { P1, P2, PR3, PV1, PV2, totalPower };
    updateCircuitLabels();
}

function addToObservationTable() {
    if (!results.case1 || !results.case2 || !results.case3) {
        alert('Please simulate all cases (Case 1, Case 2, and Case 3) before adding to the observation table.');
        return;
    }

    if (observationCount >= maxObservations) {
        alert('Maximum number of observations (5) reached. Please print the table to start over.');
        return;
    }

    const tableBody = document.getElementById('observation-body');
    if (!tableBody) {
        alert('Error: Observation table body not found.');
        return;
    }

    if (tableBody.rows.length < maxObservations) {
        alert('Error: Observation table does not have the expected number of rows. Please check the table structure.');
        return;
    }

    const row = tableBody.rows[observationCount];
    if (!row) {
        alert('Error: Table row not found for observation ' + (observationCount + 1) + '.');
        return;
    }

    if (row.cells.length < 14) {
        alert('Error: Table row does not have enough cells. Expected 14 cells, found ' + row.cells.length + '.');
        return;
    }

    row.cells[1].textContent = results.case1.P1.toFixed(4);
    row.cells[2].textContent = results.case1.P2.toFixed(4);
    row.cells[3].textContent = results.case1.PR3.toFixed(4);
    row.cells[4].textContent = results.case1.PV1.toFixed(4);
    row.cells[5].textContent = results.case1.PV2.toFixed(4);
    row.cells[6].textContent = results.case2.P1.toFixed(4);
    row.cells[7].textContent = results.case2.P2.toFixed(4);
    row.cells[8].textContent = results.case2.PR3.toFixed(4);
    row.cells[9].textContent = results.case2.PV1.toFixed(4);
    row.cells[10].textContent = results.case3.P1.toFixed(4);
    row.cells[11].textContent = results.case3.P2.toFixed(4);
    row.cells[12].textContent = results.case3.PR3.toFixed(4);
    row.cells[13].textContent = results.case3.PV2.toFixed(4);

    observationCount++;
}

function printPage() {
    window.print();
    const tableBody = document.getElementById('observation-body');
    if (tableBody) {
        for (let i = 0; i < tableBody.rows.length; i++) {
            const row = tableBody.rows[i];
            for (let j = 1; j < row.cells.length; j++) {
                row.cells[j].textContent = '';
            }
        }
    }
    observationCount = 0;
    results = {
        case1: null,
        case2: null,
        case3: null
    };
}

// Initialize circuit labels and meters after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCircuitLabels();
    animateMeter('a1-needle', 'a1-needle-shadow', 0, 5);
    animateMeter('a2-needle', 'a2-needle-shadow', 0, 5);
    animateMeter('mc-needle', 'mc-needle-shadow', 0, 300, true);
    selectTab('case1');
});//Your JavaScript goes in here
