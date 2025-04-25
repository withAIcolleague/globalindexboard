const economicIndicators = [
    {
        name: "GDP",
        value: "2.3%",
        definition: "Gross Domestic Product measures the economic performance of a country.",
        impact: "A rise in GDP indicates economic growth."
    },
    {
        name: "Unemployment Rate",
        value: "5.0%",
        definition: "The unemployment rate measures the percentage of the labor force that is unemployed.",
        impact: "A decrease in unemployment rate suggests a healthier economy."
    },
    {
        name: "Inflation Rate",
        value: "1.8%",
        definition: "The inflation rate measures the rate at which the general level of prices for goods and services is rising.",
        impact: "Higher inflation can erode purchasing power."
    },
    {
        name: "Consumer Confidence Index",
        value: "90.5",
        definition: "The Consumer Confidence Index measures how optimistic or pessimistic consumers are regarding their expected financial situation.",
        impact: "Higher confidence can lead to increased consumer spending."
    }
];

function displayIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';

    economicIndicators.forEach(indicator => {
        const indicatorElement = document.createElement('div');
        indicatorElement.className = 'indicator';
        indicatorElement.innerHTML = `
            <h3>${indicator.name}</h3>
            <p>${indicator.value}</p>
        `;

        indicatorElement.addEventListener('mouseover', () => {
            showDefinition(indicator.definition);
            showImpact(indicator.impact);
        });

        indicatorElement.addEventListener('mouseout', () => {
            hideDefinition();
            hideImpact();
        });

        indicatorsContainer.appendChild(indicatorElement);
    });
}

function showDefinition(definition) {
    const definitionElement = document.getElementById('definition');
    definitionElement.innerText = definition;
    definitionElement.style.display = 'block';
}

function hideDefinition() {
    const definitionElement = document.getElementById('definition');
    definitionElement.style.display = 'none';
}

function showImpact(impact) {
    const impactElement = document.getElementById('impact');
    impactElement.innerText = impact;
    impactElement.style.display = 'block';
}

function hideImpact() {
    const impactElement = document.getElementById('impact');
    impactElement.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    displayIndicators();
});