$(document).ready(function() {
  // Create the modal base
  modal_base = $('<div class="modal"><div class="modal-content"></div></div>').css('display', 'none');

  // Create a note modal
  note_modal = modal_base.clone();
  note_modal.attr("id","note-modal").find('.modal-content').append('<textarea></textarea>');
  note_modal.attr("id","note-modal").find('.modal-content').append('<div class="share"></div>');
  $('body').append(note_modal);

  note_modal.easyModal({
    opacity: 0.5
  });

  $('.modal-bar li.note a').click(function(e) {
    note_modal.trigger('openModal');
    note_modal.find('textarea').focus();
    e.preventDefault();
  });
});
