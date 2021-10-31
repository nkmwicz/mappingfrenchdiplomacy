/* eslint-disable require-jsdoc */
function makeBasicBarChart(data, svgSelection, div) {
  // const width = +svg.attr('width');
  const width = parseInt(d3.select(svgSelection).style('width'), 10);
  // const height = +svg.attr('height');
  const height = parseInt(d3.select(svgSelection).style('height'), 10);

  const svg = d3.select(svgSelection)
      .attr('viewBox', `0 0 ${width} ${height}`);
    // .attr('preserveAspectRatio', 'xMidYMid meet')
    // .attr('width', 300)
    // .attr('height', 300);
  const sortedXValue = data.sort((a, b) =>
    b.value.length - a.value.length);
  const xValue = (d) => d.place;

  const yValue = (d) => d.value.length;
  const margin = {top: 30, right: 20, bottom: 200, left: 20};
  const innerWidth = width - margin.left - margin.right;
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

  const tickText = document.querySelectorAll('.xAxisStuff .tick text');
  for (i=0; i< tickText.length; i++) {
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

  g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(xValue(d)))
      .attr('y', (d) => yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(yValue(d)))
      .attr('fill', (d) => fillColor(d))
      .attr('stroke', (d) => strokeColor(d))
      .attr('data-toggle', 'popover')
      .attr('title', (d) => popoverTitleContent(d))
      .attr('data-content', (d) => dataContent(d))
      .attr('data-html', 'true')
      .attr('title-html', 'true');

  g.append('text')
      .attr('class', 'bar-chart-title')
      .attr('y', -10)
      .attr('x', innerWidth / 2)
      .style('text-anchor', 'middle')
      .text('Cumulative Years of Ambassadorial Presence by Host State');

  $('[data-toggle="popover"]').popover({trigger: 'hover', container: 'body'});
}


function popoverTitleContent(d) {
  titleText = `
      <p class='text-center'>
      ${d.place}: ${d.value.length} year(s) of representation
      </p>
      `;
  return titleText;
}

function dataContent(d) {
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

function fillColor(d) {
  if (d.place == 'Swiss Cantons') {
    (fillCircle = 'mediumpurple'), (colorCircle = 'black');
  } else if (d.place == 'Grisons') {
    (fillCircle = 'darkred'), (colorCircle = 'black');
  } else if (d.place == 'Holy Roman Empire') {
    (fillCircle = 'yellow'), (colorCircle = 'black');
  } else if (d.place == 'England') {
    (fillCircle = 'lawngreen'), (colorCircle = 'black');
  } else if (d.place == 'Venice') {
    (fillCircle = 'darkgrey'), (colorCircle = 'black');
  } else if (d.place == 'Denmark') {
    (fillCircle = 'darkkhaki'), (colorCircle = 'black');
  } else if (d.place == 'Ferrara') {
    (fillCircle = 'lightpink'), (colorCircle = 'black');
  } else if (d.place == 'Geneva') {
    (fillCircle = 'lightblue'), (colorCircle = 'black');
  } else if (d.place == 'Ottoman Empire') {
    (fillCircle = 'black'), (colorCircle = 'white');
  } else if (d.place == 'Netherlands') {
    (fillCircle = 'darkseagreen'), (colorCircle = 'black');
  } else if (d.place == 'Poland') {
    (fillCircle = 'cyan'), (colorCircle = 'black');
  } else if (d.place == 'Portugal') {
    (fillCircle = 'lemonchiffon'), (colorCircle = 'black');
  } else if (d.place == 'Rome') {
    (fillCircle = 'magenta'), (colorCircle = 'black');
  } else if (d.place == 'Savoy') {
    (fillCircle = 'sandybrown'), (colorCircle = 'black');
  } else if (d.place == 'Saxony') {
    (fillCircle = 'beige'), (colorCircle = 'black');
  } else if (d.place == 'Scotland') {
    (fillCircle = 'coral'), (colorCircle = 'black');
  } else if (d.place == 'Spain') {
    (fillCircle = 'hotpink'), (colorCircle = 'black');
  } else if (d.place == 'Tuscany') {
    (fillCircle = 'mediumturquoise'), (colorCircle = 'black');
  } else if (d.place == 'Santa-Fiore') {
    (fillCircle = 'navajowhite'), (colorCircle = 'black');
  } else if (d.place == 'Lorraine') {
    (fillCircle = 'deepskyblue'), (colorCircle = 'black');
  } else if (d.place == 'Urbino') {
    (fillCircle = 'teal'), (colorCircle = 'black');
  } else if (d.place == 'Electorate of the Palatine') {
    (fillCircle = 'cadetblue'), (colorCircle = 'black');
  } else if (d.place == 'Brandenbourg') {
    (fillCircle = 'darkorange'), (colorCircle = 'black');
  } else if (d.place == 'Sweden') {
    (fillCircle = 'palevioletred'), (colorCircle = 'black');
  } else if (d.place == 'Mantua') {
    (fillCircle = 'royalblue'), (colorCircle = 'black');
  } else if (d.place == 'Wurttemburg') {
    (fillCircle = 'red'), (colorCircle = 'black');
  } else if (d.place == 'Spanish Netherlands') {
    (fillCircle = 'ivory'), (colorCircle = 'black');
  } else if (d.place == 'Fribourg') {
    (fillCircle = 'peachpuff'), (colorCircle = 'black');
  } else if (d.place == 'Hamburg') {
    (fillCircle = 'olive'), (colorCircle = 'black');
  }
  return fillCircle;
}

function strokeColor(d) {
  if (d.place == 'Swiss Cantons') {
    'mediumpurple';
  } else if (d.place == 'Grisons') {
    (fillCircle = 'darkred'), (colorCircle = 'black');
  } else if (d.place == 'Holy Roman Empire') {
    (fillCircle = 'yellow'), (colorCircle = 'black');
  } else if (d.place == 'England') {
    (fillCircle = 'lawngreen'), (colorCircle = 'black');
  } else if (d.place == 'Venice') {
    (fillCircle = 'darkgrey'), (colorCircle = 'black');
  } else if (d.place == 'Denmark') {
    (fillCircle = 'darkkhaki'), (colorCircle = 'black');
  } else if (d.place == 'Ferrara') {
    (fillCircle = 'lightpink'), (colorCircle = 'black');
  } else if (d.place == 'Geneva') {
    (fillCircle = 'lightblue'), (colorCircle = 'black');
  } else if (d.place == 'Ottoman Empire') {
    (fillCircle = 'black'), (colorCircle = 'white');
  } else if (d.place == 'Netherlands') {
    (fillCircle = 'darkseagreen'), (colorCircle = 'black');
  } else if (d.place == 'Poland') {
    (fillCircle = 'cyan'), (colorCircle = 'black');
  } else if (d.place == 'Portugal') {
    (fillCircle = 'lemonchiffon'), (colorCircle = 'black');
  } else if (d.place == 'Rome') {
    (fillCircle = 'magenta'), (colorCircle = 'black');
  } else if (d.place == 'Savoy') {
    (fillCircle = 'sandybrown'), (colorCircle = 'black');
  } else if (d.place == 'Saxony') {
    (fillCircle = 'beige'), (colorCircle = 'black');
  } else if (d.place == 'Scotland') {
    (fillCircle = 'coral'), (colorCircle = 'black');
  } else if (d.place == 'Spain') {
    (fillCircle = 'hotpink'), (colorCircle = 'black');
  } else if (d.place == 'Tuscany') {
    (fillCircle = 'mediumturquoise'), (colorCircle = 'black');
  } else if (d.place == 'Santa-Fiore') {
    (fillCircle = 'navajowhite'), (colorCircle = 'black');
  } else if (d.place == 'Lorraine') {
    (fillCircle = 'deepskyblue'), (colorCircle = 'black');
  } else if (d.place == 'Urbino') {
    (fillCircle = 'teal'), (colorCircle = 'black');
  } else if (d.place == 'Electorate of the Palatine') {
    (fillCircle = 'cadetblue'), (colorCircle = 'black');
  } else if (d.place == 'Brandenbourg') {
    (fillCircle = 'darkorange'), (colorCircle = 'black');
  } else if (d.place == 'Sweden') {
    (fillCircle = 'palevioletred'), (colorCircle = 'black');
  } else if (d.place == 'Mantua') {
    (fillCircle = 'royalblue'), (colorCircle = 'black');
  } else if (d.place == 'Wurttemburg') {
    (fillCircle = 'red'), (colorCircle = 'black');
  } else if (d.place == 'Spanish Netherlands') {
    (fillCircle = 'ivory'), (colorCircle = 'black');
  } else if (d.place == 'Fribourg') {
    (fillCircle = 'peachpuff'), (colorCircle = 'black');
  } else if (d.place == 'Hamburg') {
    (fillCircle = 'olive'), (colorCircle = 'black');
  }
  return colorCircle;
}
