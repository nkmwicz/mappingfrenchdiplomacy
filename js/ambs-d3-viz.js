/* eslint-disable require-jsdoc */
export function makeBasicBarChart(data, svgSelection, div) {
  const getSvgWidth = parseInt(d3.select(svgSelection).style('width'), 10);
  // const cheight = parseInt(d3.select(svgSelection).style('height'), 10);
  const height = '400';
  const svg = d3.select(svgSelection)
      .attr('viewBox', `0 0 ${getSvgWidth} ${height}`);
  // .attr('preserveAspectRatio', 'xMidYMid meet')
  // .attr('width', 500)
  // .attr('height', 400);
  // const height = +svg.attr('height');

  // const width = +svg.attr('width');
  const svgWidth = parseInt(d3.select(svgSelection).style('width'));

  const sortedXValue = data.sort((a, b) =>
    b.value.length - a.value.length);
  const xValue = (d) => d.place;
  const yValue = (d) => d.value.length;
  const margin = {top: 15, right: 10, bottom: 50, left: 25};
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // const xScale = d3.scaleBand()
  //     .domain(arrayGrouped1515To1525.map(xValue))
  //     .range([0, innerWidth])
  //     .padding(0.1);
  const xScale = d3.scaleBand()
      .domain(sortedXValue.map(xValue))
      .range([0, innerWidth])
      .padding(0.1);

  // const yScale = d3.scaleLinear()
  //     .domain([0, d3.max(arrayGrouped1515To1525, yValue)])
  //     .range([innerHeight, 0])
  //     .nice();
  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .range([innerHeight, 0])
      .nice();

  const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth);
  const xAxis = d3.axisBottom(xScale);

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g').call(yAxis);
  g.append('g').call(xAxis)
      .classed('xAxisStuff', true)
      .attr('transform', `translate(0, ${innerHeight})`)
      .selectAll('.tick line')
      .attr('text-anchor', 'start')
      .selectAll('.tick line')
      .remove();

  d3.selectAll('.xAxisStuff .tick line').remove();

  changeTickText();

  g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(xValue(d)))
      .attr('y', (d) => yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(yValue(d)))
      .attr('fill', (d) => styleCircles(d).fillCircle)
      .attr('stroke', (d) => styleCircles(d).colorCircle)
      .attr('data-toggle', 'popover')
      .attr('title', (d) => basicPopoverTitleContent(d))
      .attr('data-content', (d) => basicDataContent(d))
      .attr('data-html', 'true')
      .attr('title-html', 'true');

  // g.append('text')
  //     .attr('class', 'bar-chart-title')
  //     .attr('y', -10)
  //     .attr('x', innerWidth / 2)
  //     .style('text-anchor', 'middle')
  //     .text('Cumulative Years of Ambassadorial Presence by Host State');

  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    container: 'body',
    placement: 'top',
  });

  function basicPopoverTitleContent(d) {
    let titleText = `
        <p class='text-center'>
        ${d.place}: ${d.value.length} year(s) of representation
        </p>
        `;
    return titleText;
  }
  function basicDataContent(d) {
    const arrayValues = [];
    let popoverText = `
        <table class='popover-table table-striped'>
        <thead>
        <tr>
        <th>Ambassador(s) </th>
        <th>Year(s)</th>
        </tr>
        </thead>
        `;
    for (const values of d.value) {
      arrayValues.push(values);
    }
    const groupedDataName = Array.from(d3.group(arrayValues,
        (d) => d.properties.name),
    ([name, value]) =>
      ({name, value}));
    for (const nameValues of groupedDataName) {
      const arrayYearValues = [];
      for (const yearValues of nameValues.value) {
        arrayYearValues.push(yearValues.properties.year);
      }
      popoverText += `
        <tr>
        <td>${nameValues.name}</td>
        <td>${arrayYearValues.join(', ')}</td>
        </tr>
        `;
    }
    return popoverText;
  }
}

export function makeUniqueAmbBarChart(data, svgSelection, div) {
  const getSvgWidth = parseInt(d3.select(svgSelection).style('width'), 10);

  const getSvgHeight = parseInt(d3.select(svgSelection).style('height'), 10);
  const height = '400';
  const svg = d3.select(svgSelection)
      .attr('viewBox', `0 0 ${getSvgWidth} ${height}`);

  // const width = +svg.attr('width');
  const svgWidth = parseInt(d3.select(svgSelection).style('width'));

  const sortedXValue = data.sort((a, b) =>
    b.value.size - a.value.size);
  const xValue = (d) => d.place;
  const yValue = (d) => d.value.size;
  const margin = {top: 15, right: 10, bottom: 50, left: 25};
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
      .domain(sortedXValue.map(xValue))
      .range([0, innerWidth])
      .padding(0.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .range([innerHeight, 0])
      .nice();

  const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth);
  const xAxis = d3.axisBottom(xScale);

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  g.append('g').call(yAxis);
  g.append('g').call(xAxis)
      .classed('xAxisStuff', true)
      .attr('transform', `translate(0, ${innerHeight})`)
      .selectAll('.tick line')
      .attr('text-anchor', 'start')
      .selectAll('.tick line')
      .remove();

  d3.selectAll('.xAxisStuff .tick line').remove();

  changeTickText();

  g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(xValue(d)))
      .attr('y', (d) => yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(yValue(d)))
      .attr('fill', (d) => styleCircles(d).fillCircle)
      .attr('stroke', (d) => styleCircles(d).colorCircle)
      .attr('data-toggle', 'popover')
      .attr('title', (d) => uniqueAmbPopoverTitleContent(d))
      .attr('data-content', (d) => uniqueAmbDataContent(d))
      .attr('data-html', 'true')
      .attr('title-html', 'true');

  // g.append('text')
  //     .attr('class', 'bar-chart-title')
  //     .attr('y', -10)
  //     .attr('x', innerWidth / 2)
  //     .style('text-anchor', 'middle')
  //     .text('Cumulative Years of Ambassadorial Presence by Host State');

  $('[data-toggle="popover"]').popover({
    trigger: 'hover',
    container: 'body',
    placement: 'top',
  });

  function uniqueAmbPopoverTitleContent(d) {
    let titleText = `
        <p class='text-center'>
        ${d.place}: ${d.value.size} unique ambassador(s).
        </p>
        `;
    return titleText;
  }
  function uniqueAmbDataContent(d) {
    let popoverText = `
        <table class='popover-table table-striped'>
        <thead>
        <tr>
        <th>Ambassador(s) </th>
        <th>Year(s)</th>
        </tr>
        </thead>
        `;
    for (let values of d.value) {
      const arrayValues = [];

      for (let years of values) {
        values[1].forEach((a) =>{
          arrayValues.push(a.properties.year);
        });
      }
      let maxYear = d3.max(arrayValues);
      let minYear = d3.min(arrayValues);
      // console.log(`${minYear} - ${maxYear}`);
      if (minYear === maxYear) {
        popoverText += `
        <tr>
        <td>${values[0]}</td>
        <td class = 'text-center'>${minYear}</td>
        </tr>
      `;
      } else {
        popoverText += `
        <tr>
        <td>${values[0]}</td>
        <td>${minYear} - ${maxYear}</td>
        </tr>
      `;
      }
    }
    return popoverText;
  }
}

function changeTickText() {
  const tickText = document.querySelectorAll('.xAxisStuff .tick text');
  for (let i=0; i< tickText.length; i++) {
    tickText[i].style.transform = 'translate(-15px, 25px) rotate(-90deg)';
    if (tickText[i].textContent === 'Holy Roman Empire') {
      tickText[i].textContent = 'HRE';
    } else if (tickText[i].textContent === 'Ottoman Empire') {
      tickText[i].textContent = 'Ott. E.';
    } else if (tickText[i].textContent === 'Denmark') {
      tickText[i].textContent = 'Den.';
    } else if (tickText[i].textContent === 'England') {
      tickText[i].textContent = 'Eng.';
    } else if (tickText[i].textContent === 'Ferrara') {
      tickText[i].textContent = 'Ferr.';
    } else if (tickText[i].textContent === 'Geneva') {
      tickText[i].textContent = 'Gen.';
    } else if (tickText[i].textContent === 'Grisons') {
      tickText[i].textContent = 'Gris.';
    } else if (tickText[i].textContent === 'Netherlands') {
      tickText[i].textContent = 'Neth.';
    } else if (tickText[i].textContent === 'Poland') {
      tickText[i].textContent = 'Pol';
    } else if (tickText[i].textContent === 'Portugal') {
      tickText[i].textContent = 'Port.';
    } else if (tickText[i].textContent === 'Rome') {
      tickText[i].textContent = 'Rome';
    } else if (tickText[i].textContent === 'Santa-Fiore') {
      tickText[i].textContent = 'St.Fiore.';
    } else if (tickText[i].textContent === 'Savoy') {
      tickText[i].textContent = 'Sav.';
    } else if (tickText[i].textContent === 'Saxony') {
      tickText[i].textContent = 'Sax.';
    } else if (tickText[i].textContent === 'Scotland') {
      tickText[i].textContent = 'Scot.';
    } else if (tickText[i].textContent === 'Spain') {
      tickText[i].textContent = 'Sp.';
    } else if (tickText[i].textContent === 'Swiss Cantons') {
      tickText[i].textContent = 'Swiss';
    } else if (tickText[i].textContent === 'Tuscany') {
      tickText[i].textContent = 'Tus.';
    } else if (tickText[i].textContent === 'Urbino') {
      tickText[i].textContent = 'Urb.';
    } else if (tickText[i].textContent === 'Venice') {
      tickText[i].textContent = 'Ven.';
    } else if (tickText[i].textContent === 'Wurttemburg') {
      tickText[i].textContent = 'Wurt.';
    } else if (tickText[i].textContent === 'Lorraine') {
      tickText[i].textContent = 'Lor.';
    } else if (tickText[i].textContent === 'Brandenbourg') {
      tickText[i].textContent = 'Brand.';
    }
  }
}

export function styleCircles(d, latitude) {
  let fillCircle,
    colorCircle,
    clusterPopText,
    clusterColor;
  if (d? d.place === 'Swiss Cantons' : latitude === 46.94) {
    (fillCircle = 'mediumpurple'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Swiss Cantons</strong><p>'),
    (clusterColor = 'rgba(147,112,219,0.8)'); 
  } else if (d? d.place === 'Grisons' : latitude === 46.66) {
    (fillCircle = 'darkred'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Grisons</strong><p>'),
    (clusterColor = 'rgba(139,0,0,0.8)');
  } else if (d? d.place === 'Holy Roman Empire' : latitude === 48.21) {
    (fillCircle = 'yellow'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Holy Roman Emperor</strong></p>'),
    (clusterColor = 'rgba(255,255,0,0.8)');
  } else if (d? d.place === 'England' : latitude === 51.51) {
    (fillCircle = 'lawngreen'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>England</strong><p>'),
    (clusterColor = 'rgba(124,252,193,0.8)');
  } else if (d? d.place === 'Venice' : latitude === 45.44) {
    (fillCircle = 'darkgrey'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Venice</strong></p>'),
    (clusterColor = 'rgba(169,169,169,0.8)');
  } else if (d? d.place === 'Denmark' : latitude === 55.68) {
    (fillCircle = 'darkkhaki'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Denmark</strong></p>'),
    (clusterColor = 'rgba(189,183,107,0.8)');
  } else if (d? d.place === 'Ferrara' : latitude === 44.84) {
    (fillCircle = 'lightpink'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Ferrara</strong></p>'),
    (clusterColor = 'rgba(255,182,193,0.8)');
  } else if (d? d.place === 'Geneva' : latitude === 46.21) {
    (fillCircle = 'lightblue'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Geneva</strong></p>'),
    (clusterColor = 'rgba(173,216,230,0.8)');
  } else if (d? d.place === 'Ottoman Empire' : latitude === 41.01) {
    (fillCircle = 'black'),
    (colorCircle = 'white'),
    (clusterPopText = '<p><strong>Ottoman Empire</strong></p>'),
    (clusterColor = 'rgba(0,0,0,0.8)');
  } else if (d? d.place === 'Netherlands' : latitude === 52.37) {
    (fillCircle = 'darkseagreen'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Netherlands</strong></p>'),
    (clusterColor = 'rgba(143,188,143,0.8)');
  } else if (d? d.place === 'Poland' : latitude === 52.23) {
    (fillCircle = 'cyan'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Poland</strong></p>'),
    (clusterColor = 'rgba(0,255,255,0.8)');
  } else if (d? d.place === 'Portugal' : latitude === 38.72) {
    (fillCircle = 'lemonchiffon'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Portugal</strong></p>'),
    (clusterColor = 'rgba(255,250,205,0.8)');
  } else if (d? d.place === 'Rome' : latitude === 41.89) {
    (fillCircle = 'magenta'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Rome</strong></p>'),
    (clusterColor = 'rgba(255,0,255,0.8)');
  } else if (d? d.place === 'Savoy' : latitude === 45.06) {
    (fillCircle = 'sandybrown'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Savoy</strong></p>'),
    (clusterColor = 'rgba(244,164,96,0.8)');
  } else if (d? d.place === 'Saxony' : latitude === 51.05) {
    (fillCircle = 'beige'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Saxony</strong></p>'),
    (clusterColor = 'rgba(245,245,220,0.8)');
  } else if (d? d.place === 'Scotland' : latitude === 55.95) {
    (fillCircle = 'coral'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Scotland</strong></p>'),
    (clusterColor = 'rgba(255,127,80,0.8)');
  } else if (d? d.place == 'Spain' : latitude === 40.43) {
    (fillCircle = 'hotpink'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Spain</strong></p>'),
    (clusterColor = 'rgba(255,105,180,0.8)');
  } else if (d? d.place == 'Tuscany' : latitude === 43.46) {
    (fillCircle = 'mediumturquoise'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Tuscany</strong></p>'),
    (clusterColor = 'rgba(72,209,204,0.8)');
  } else if (d? d.place == 'Santa-Fiore' : latitude === 43.77) {
    (fillCircle = 'navajowhite'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Santa-Fiore</strong></p>'),
    (clusterColor = 'rgba(255,222,173,0.8)');
  } else if (d? d.place == 'Lorraine' : latitude === 48.76) {
    (fillCircle = 'deepskyblue'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Lorraine</strong></p>'),
    (clusterColor = 'rgba(0,191,255,0.8)');
  } else if (d? d.place == 'Urbino' : latitude === 43.72) {
    (fillCircle = 'teal'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Urbino</strong></p>'),
    (clusterColor = 'rgba(0,128,128,0.8)');
  } else if (d? d.place == 'Electorate of the Palatine' : latitude === 49.91) {
    (fillCircle = 'cadetblue'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Electorate of the Palatine</strong></p>'),
    (clusterColor = 'rgba(95,158,160)');
  } else if (d? d.place == 'Brandenbourg' : latitude === 52.39) {
    (fillCircle = 'darkorange'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Brandenbourg</strong></p>'),
    (clusterColor = 'rgba(255,140,0,0.8)');
  } else if (d? d.place == 'Sweden' : latitude === 59.33) {
    (fillCircle = 'palevioletred'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Sweden</strong></p>'),
    (clusterColor = 'rgba(219,112,147,0.8)');
  } else if (d? d.place == 'Mantua' : latitude === 45.17) {
    (fillCircle = 'royalblue'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Mantua</strong></p>'),
    (clusterColor = 'rgba(65,105,225,0.8)');
  } else if (d? d.place == 'Wurttemburg' : latitude === 48.55) {
    (fillCircle = 'red'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Wurttemburg</strong></p>'),
    (clusterColor = 'rgba(255,0,0,0.8)');
  } else if (d? d.place == 'Spanish Netherlands' : latitude === 50.84) {
    (fillCircle = 'ivory'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Spanish Netherlands</strong></p>'),
    (clusterColor = 'rgba(255,255,240,0.8)');
  } else if (d? d.place == 'Fribourg' : latitude === 46.8) {
    (fillCircle = 'peachpuff'),
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Fribourg</strong></p>'),
    (clusterColor = 'rgba(255,218,185,0.8)');
  } else if (d? d.place == 'Hamburg' : latitude === 52.55) {
    (fillCircle = 'olive'), 
    (colorCircle = 'black'),
    (clusterPopText = '<p><strong>Hamburg</strong></p>'),
    (clusterColor = 'rgba(128,128,0,0.8)');
  }
  return {
    fillCircle,
    colorCircle,
    clusterPopText,
    clusterColor
  }
}


export function nameClusters(latitude) {
  let popupText;
      // console.log(a);
      switch (latitude) {
        case 55.68:
          popupText = '<p><strong>Denmark</strong></p>';
          break;
        case 51.51:
          popupText = '<p><strong>England</strong></p>';
          break;
        case 44.84:
          popupText = '<p><strong>Ferrara</strong></p>';
          break;
        case 46.21:
          popupText = '<p><strong>Geneva</strong></p>';
          break;
        case 46.66:
          popupText = '<p><strong>Grisons</strong></p>';
          break;
        case 48.21:
          popupText = '<p><strong>Holy Roman Emperor</strong></p>';
          break;
        case 52.37:
          popupText = '<p><strong>Netherlands</strong></p>';
          break;
        case 41.01:
          popupText = '<p><strong>Ottoman Empire</strong></p>';
          break;
        case 52.23:
          popupText = '<p><strong>Poland<strong></p>';
          break;
        case 38.72:
          popupText = '<p><strong>Portugal</strong></p>';
          break;
        case 41.89:
          popupText = '<p><strong>Rome</strong></p>';
          break;
        case 45.06:
          popupText = '<p><strong>Savoy</strong></p>';
          break;
        case 51.05:
          popupText = '<p><strong>Saxony</strong></p>';
          break;
        case 55.95:
          popupText = '<p><strong>Scotland</strong></p>';
          break;
        case 40.43:
          popupText = '<p><strong>Spain</strong></p>';
          break;
        case 46.94:
          popupText = '<p><strong>The Swiss Cantons</strong></p>';
          break;
        case 43.46:
          popupText = '<p><strong>Tuscany</strong></p>';
          break;
        case 45.44:
          popupText = '<p><strong>Venice</strong></p>';
          break;
        default:
          popupText = '<p></p>';
          break;
      }
      return popupText
}