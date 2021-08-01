/* eslint-disable require-jsdoc */
const months = ['Jan.', 'Feb.', 'Mar.',
  'Apr.', 'May', 'Jun.', 'Jul.',
  'Aug.', 'Sept.', 'Oct.',
  'Nov.', 'Dec.',
];
const table16cAmbBody = document.querySelector('#table-16c-amb tbody');
const table16cAmb = document.querySelector('#table-16c-amb');
const tableHenri3Letters =
  document.querySelector('#table-henri3-letters');
const tableHenri3LettersBody =
  document.querySelector('#table-henri3-letters tbody');
const dataTables =
  document.querySelectorAll('.data-tables');


const btnOpen16cAmbTable = document.querySelector('#btn-open-16c-ambs');
const btnClose16cAmbTable = document.querySelector('#btn-close-16c-ambs');
const btnOpenHenri3Letters = document.querySelector('#btn-open-henri3-letters');
const btnCloseHenri3Letters =
  document.querySelector('#btn-close-henri3-letters');

btnOpen16cAmbTable.addEventListener('click', function() {
  closeTables();
  table16cAmb.style.display = 'block';
});

btnClose16cAmbTable.addEventListener('click', function() {
  table16cAmb.style.display = 'none';
});

btnOpenHenri3Letters.addEventListener('click', function() {
  closeTables();
  tableHenri3Letters.style.display = 'block';
});

btnCloseHenri3Letters.addEventListener('click', function() {
  tableHenri3Letters.style.display = 'none';
});

fetch('data/16c-diplomats_data.geojson', {
  method: 'GET',
}).then((Response) => Response.json()).then((json) => {
  const ambassadors16c = json.features;
  class TableOfLetters {
    addLayerToList(layerInfo) {
      const tr = table16cAmbBody.insertRow(-1);
      tr.innerHTML = `
          <td class = "text-center table-layer-button" id="${layerInfo.id}">
          ${layerInfo.id}</td>
          <td>${layerInfo.name}</td>
          <td>${layerInfo.place}</td>
          <td>${layerInfo.lat}</td>
          <td>${layerInfo.long}</td>
          <td>${layerInfo.year}</td>
          <td>${layerInfo.duration}</td>
          <td>${layerInfo.ambInfo}</td>
          <td>${layerInfo.source}</td>
          <td>${layerInfo.link}</td>
          `;
    };
  }

  class AmbInfo16c {
    constructor(
        id,
        name,
        place,
        lat,
        long,
        year,
        duration,
        ambInfo,
        source,
        link) {
      this.id = id;
      this.name = name;
      this.place = place;
      this.lat = lat;
      this.long = long;
      this.year = year;
      this.duration = duration;
      this.ambInfo = ambInfo;
      this.source = source;
      this.link = link;
    }
  }

  ambassadors16c.forEach(function(layer) {
    const ambID = layer.properties.objectID.toString();
    const ambName = layer.properties.name;
    const ambPlace = layer.properties.place;
    const ambLat = layer.geometry.coordinates[1];
    const ambLong = layer.geometry.coordinates[0];
    const ambYear = layer.properties.year;
    const ambduration = layer.properties.duration;
    const ambInfo = layer.properties.ambInfo;
    const ambSource = layer.properties.source;
    const ambLink = layer.properties.link;

    const layerInfo = new AmbInfo16c(
        ambID,
        ambName,
        ambPlace,
        ambLat,
        ambLong,
        ambYear,
        ambduration,
        ambInfo,
        ambSource,
        ambLink,
    );
    const tableOfLetters = new TableOfLetters();
    tableOfLetters.addLayerToList(layerInfo);
  });
});

// Fetch and create the table for the json information from
// Letters of Henri III
fetch('data/henri3letters.geojson', {
  method: 'GET',
}).then((Response) => Response.json()).then((json) => {
  const lettersHenri3 = json.features;
  console.log(lettersHenri3);
  class TableOfLetters {
    addLayerToList(layerInfo) {
      const tr = tableHenri3LettersBody.insertRow(-1);
      tr.innerHTML = `
          <td class = "text-center table-layer-button" id="${layerInfo.id}">
          ${layerInfo.id}</td>
          <td>${layerInfo.author}</td>
          <td>${layerInfo.authorLoc}</td>
          <td>${layerInfo.date}</td>
          <td>${layerInfo.recipient}</td>
          <td>${layerInfo.recipientPlace}</td>
          <td>${layerInfo.lat}</td>
          <td>${layerInfo.long}</td>
          <td>${layerInfo.recipientInfo}</td>
          <td>${layerInfo.summary}</td>
          <td>${layerInfo.topics}</td>
          <td>${layerInfo.source}</td>
          <td>${layerInfo.link}</td>
          `;
    };
  }


  class Henri3LettersInfo {
    constructor(
        id,
        author,
        authorLoc,
        date,
        recipient,
        recipientPlace,
        lat,
        long,
        recipientInfo,
        summary,
        topics,
        source,
        link) {
      this.id = id;
      this.author = author;
      this.authorLoc = authorLoc;
      this.date = date;
      this.recipient = recipient;
      this.recipientPlace = recipientPlace;
      this.lat = lat;
      this.long = long;
      this.recipientInfo = recipientInfo;
      this.summary = summary;
      this.topics = topics;
      this.source = source;
      this.link = link;
    }
  }

  lettersHenri3.forEach(function(layer) {
    const letterID = layer.properties.objectID;
    const letterAuth = layer.properties.author;
    const letterAuthPlace = layer.properties.authorPlace;
    const letterDate = formatDate(new Date(layer.properties.date));
    const letterRecipient = layer.properties.recipient;
    const letterRecPlace = layer.properties.place;
    const letterLat = layer.geometry.coordinates[1];
    const letterLong = layer.geometry.coordinates[0];
    const letterRecipientInfo = layer.properties.recipientInformation;
    const letterSummary = layer.properties.summary;
    const letterTopic1 = layer.properties.topic1;
    const letterTopic2 = layer.properties.topic2;
    const letterTopic3 = layer.properties.topic3;
    const letterTopic4 = layer.properties.topic4;
    const letterSource = layer.properties.citation;
    const letterLink = layer.properties.link;
    if (letterTopic1 !== '' && letterTopic2 !== '' &&
    letterTopic3 !== '' && letterTopic4 !== '') {
      letterTopics = `${letterTopic1} / ${letterTopic2}
      / ${letterTopic3} / ${letterTopic4}`;
    } else if (letterTopic1 !== '' && letterTopic2 !== '' &&
    letterTopic3 !== '' && letterTopic4 == '') {
      letterTopics = `${letterTopic1} / ${letterTopic2}
      / ${letterTopic3}`;
    } else if (letterTopic1 !== '' && letterTopic2 !== '' &&
    letterTopic3 == '' && letterTopic4 == '') {
      letterTopics = `${letterTopic1} / ${letterTopic2}`;
    } else {
      letterTopics = `${letterTopic1}`;
    };

    const layerInfo = new Henri3LettersInfo(
        letterID,
        letterAuth,
        letterAuthPlace,
        letterDate,
        letterRecipient,
        letterRecPlace,
        letterLat,
        letterLong,
        letterRecipientInfo,
        letterSummary,
        letterTopics,
        letterSource,
        letterLink,
    );
    const tableOfLetters = new TableOfLetters();
    tableOfLetters.addLayerToList(layerInfo);
  });
});

function formatDate(date) {
  // eslint-disable-next-line max-len
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

function closeTables() {
  for (let i = 0; i < dataTables.length; i++) {
    dataTables[i].style.display = 'none';
  };
}

$('[data-toggle="popover"]').popover({
  trigger: 'hover',
});
$('[data-toggle="tooltip"]').tooltip();
