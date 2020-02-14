function alert_msg(title, text, mode, level) {
  $("<div id='alertMessage'></div>").dialog({
    autoOpen: false,
    modal: mode,
    height: 'auto',
    width: 500,
    resizable: false,
    buttons: {
      OK: function () {
        $(this).dialog('destroy');
        return false;
      }
    }
  });
  if (title === '') {
    $('#alertMessage').dialog('option', 'dialogClass', 'noTitle');
  } else {
    $('#alertMessage').dialog('option', 'title', title);
  }
  switch (level) {
    case 0:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid royalblue');
      $('#alertMessage').html(
        `<img src="images/info.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    case 1:
      $('.ui-widget.ui-widget-content.ui-dialog [aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('[aria-describedby="alertMessage"]').css('border', '4px solid gold');
      $('#alertMessage').html(
        `<img src="images/warn.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    case 2:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid red');
      $('#alertMessage').html(
        `<img src="images/error.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
    default:
      $('[aria-describedby="alertMessage"]').css('border', '4px solid royalblue');
      $('#alertMessage').html(
        `<img src="images/confirm.png" style="float: left; padding-right: 10px"/> <p style="font-size: medium; font-weight: bold">${  text  }</p>`);
      break;
  }
  $('#alertMessage').dialog('open');
  return false;
}
const data = {
  note_index: 2,
  notes: [
    {
      id: 1,
      note: 'This is a test',
      date: '2/14/2020',
    },
    {
      id: 2,
      note: 'Another test',
      date: '3/14/2020',
    },
  ],
};

function deleteNote(id) {

  displayNotes(data.notes);
  alert_msg('', `Deleted Note #:${id}`, true, 0);
}

function saveNote() {
  const msg = $('#txtAddNote').val();


  displayNotes(data.notes);
  $('#dlgAddNote').dialog('close');
  alert_msg('', 'Note Saved!', false, 0);
}

function displayNotes(notes) {
  // Clear current Display & Populate Display with each Note Card
  $('#main').html('');
  notes.forEach(note => {
    const html = `<div class="col mb-4">
                <div class="card h-100 shadow rounded">
                    <div class="card-header">
                        <h4>NOTE #: ${note.id}</h4>
                        <h4><i class="far fa-clock"> </i> ${note.date}</h4>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title border border-dark p-2">${note.note}</h5>
                    <button class="btnDelete btn btn-danger" onclick="deleteNote(${note.id})">Delete</button>
                    </div>
                </div>
            </div>`;
    $('#main').append(html);
  });
}

$(function () {
  $('#dlgAddNote').dialog({
    autoOpen: false,
    modal: true,
    width: 400,
    height: 'auto',
    dialogClass: "noTitle",
    resizable: false,
  });
  $('#btnAddNote').click(function() {
    $('#dlgAddNote').dialog('open');
  });
});
