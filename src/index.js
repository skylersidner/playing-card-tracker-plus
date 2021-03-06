const suits = [
  {
    name: 'Hearts',
    icon: '&heartsuit;'
  },
  {
    name: 'Spades',
    icon: '&spadesuit;'
  },
  {
    name: 'Diamonds',
    icon: '&diamondsuit;'
  },
  {
    name: 'Clubs',
    icon: '&clubsuit;'
  }
]

const baseRanks = [
  {
    name: 'Ace',
    value: 1,
    character: 'A'
  },
  {
    name: 'Two',
    value: 2,
    character: '2'
  },
  {
    name: 'Three',
    value: 3,
    character: '3'
  },
  {
    name: 'Four',
    value: 4,
    character: '4'
  },
  {
    name: 'Five',
    value: 5,
    character: '5'
  },
  {
    name: 'Six',
    value: 6,
    character: '6'
  },
  {
    name: 'Seven',
    value: 7,
    character: '7'
  },
  {
    name: 'Eight',
    value: 8,
    character: '8'
  },
  {
    name: 'Nine',
    value: 9,
    character: '9'
  },
  {
    name: 'Ten',
    value: 10,
    character: '10'
  },
  {
    name: 'Jack',
    value: 11,
    character: 'J'
  },
  {
    name: 'Queen',
    value: 12,
    character: 'Q'
  },
  {
    name: 'King',
    value: 13,
    character: 'K'
  },
  {
    name: 'Ace',
    value: 14,
    character: 'A'
  }
]

let cardSuit, cardRank

// jquery initialization function
$(function() {
  let colorPicker;

  function selectCell(cell) {
    cell.addClass('selected')
  }

  function deselectCell(cell) {
    cell.removeClass('selected')
  }

  function toggleSelectedCell(cell) {
    cell.hasClass('selected')
      ? deselectCell(cell)
      : selectCell(cell)
  }

  function buildCell(suit, rank) {
    const cell = $('<td></td>').html(`${rank.character} <span class="icon">${suit.icon}</span>`)
    cell.on('click', () => toggleSelectedCell(cell))
    return cell
  }

  function buildRow(suit, ranks) {
    const row = $('<tr></tr>')

    const rowCells = ranks.map(rank => {
      return buildCell(suit, rank)
    })

    const suitName = suit.name
    if (suitName === 'Diamonds' || suitName === 'Hearts') {
      row.addClass('alt-color')
    } else {
      row.addClass('primary-color')
    }

    rowCells[0].addClass('first-ace')
    rowCells[13].addClass('last-ace')

    row.append(...rowCells)
    return row
  }

  function buildTrackingTable() {
    const trackingTableWrapper = $('#tracking-table-wrapper')
    const trackingTable = $('<table id="tracking-table"></table>')
    const rows = suits.map(suit => buildRow(suit, baseRanks))


    trackingTable.append(...rows)
    trackingTableWrapper.html(trackingTable)
    hideInactiveAces()
  }

  function hideInactiveAces() {
    const aceToggle = $('#ace-high-toggle')
    const isChecked = aceToggle.is(":checked")
    if (isChecked) {
      const firstAces = $('.first-ace')
      firstAces.each((idx, ace) => $(ace).addClass('hidden'))
    } else {
      const lastAces = $('.last-ace')
      lastAces.each((idx, ace) => $(ace).addClass('hidden'))
    }
  }

  function resetTable() {
    const cells = $('td')
    deselectCell(cells)
  }

  function bindResetButton() {
    $('#reset').on('click', () => {
      const isConfirmed = confirmReset()      
      if (isConfirmed) {
        resetTable()
      }
    })
  }

  function createAceHighLowToggle() {
    const toggle = $('<input type="checkbox" id="ace-high-toggle">Ace High (will reset form)</input>')
    toggle.on('click', () => onAceToggleClick())

    toggle.insertAfter('#header')
  }

  function onAceToggleClick() {
    const isConfirmed = confirmReset()
    if (isConfirmed) {
      buildTrackingTable()
    }
  }
  
  function confirmReset() {
    return confirm("Are you sure you want to reset the table?")
  } 
  
  function setColor(color, rowReference) {
    const colorRows = $(`.${rowReference}-color`)
    colorRows.css("color", color)
  }

  function initializeColorPicker() {
    //documentation can be found at https://iro.js.org

    const iro = window.iro

    const colorPickerInstance = new iro.ColorPicker("#picker", {
      // Set the size of the color picker
      width: 250,
      // Set the initial color to pure red
      color: "#f00"
    })

    colorPickerInstance.on('color:change', function(color) {
      const selectedToggleValue = $("input[name='color-toggle']:checked").val()
      setColor(color.hexString, selectedToggleValue)
    })

    return colorPickerInstance
  }

  function handleColorPickerRadioClick(event) {
    // get the id from the target, separate by dash into an array (e.g.: "radio-alt" => ["radio", "alt"])
    // and grab the second element in the array ("alt")
    const targetId = event.currentTarget.id
    const rowId = targetId.split("-")[1]

    // use this Id to get the corresponding row and see the color css attribute
    const row = $(`.${rowId}-color`)
    const currentRowColor = row.css('color')

    // set the color on the picker
    colorPicker.color.set(currentRowColor)
  }

  function setColorPickerRadioOnClick() {
    const colorPickerRadioButtons = $("input[name='color-toggle']");
    colorPickerRadioButtons.click(handleColorPickerRadioClick)
  }

  createAceHighLowToggle()
  buildTrackingTable()
  bindResetButton()
  colorPicker = initializeColorPicker()
  setColor(colorPicker.color.hexString, "alt")
  setColorPickerRadioOnClick()
})

