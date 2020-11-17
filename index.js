const { default: Axios } = require("axios")

//TODO: Swallow CORS error
$('#send-comment').click(async () => {
  let comment = $('#comment-box').val()

  try {
    $.ajax({
      type: "POST",
      url: "http://86.25.163.116:8003/comments/add",
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      crossDomain: true,
      data: JSON.stringify({
        "comment": comment
    }),
      success: () => {try{alert("Comment added"); updateCommentsTable();} catch(ex){updateCommentsTable();} },
    });
  } catch (ex) { updateCommentsTable(); }
})

function updateCommentsTable() {
  if($('#comment-table').length > 0) {$('#comment-table').remove()}
  $.ajax({
    type: "GET",
    url: "http://86.25.163.116:8003/comments/all",
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    crossDomain: true,
    success: (comments) => {
      let myTable = document.createElement('table')
      myTable.id = "comment-table"
      comments.forEach(comment => {
        let myRow = document.createElement('tr')
        let idCell = document.createElement('td')
        idCell.innerText = comment["_id"]
        let commentCell = document.createElement('td')
        if(comment["comment"]) {
          commentCell.innerText = comment["comment"]
        } else {
          commentCell.innerText = comment["Comment"]
        }
        let btnCell = document.createElement('button')
        btnCell.innerText = 'DELETE'
        btnCell.setAttribute("commentid", comment["_id"])
        btnCell.classList.add("btnDelete")
        let btnCellUpd = document.createElement('button')
        btnCellUpd.innerText = 'EDIT'
        btnCellUpd.setAttribute("commentid", comment["_id"])
        btnCellUpd.classList.add("btnEdit")
        myRow.appendChild(idCell)
        myRow.appendChild(commentCell)
        myRow.appendChild(btnCell)
        myRow.appendChild(btnCellUpd)
        myTable.appendChild(myRow)
      })
      $('#comments-table-div').append(myTable)
    }
  });
}

$('document').ready( () => { updateCommentsTable() })

$('#clear-all').click(() => {
  if(confirm("Are you sure you want to clear all comments?")) {
    try {
      $.ajax({
        type: "DELETE",
        url: `http://86.25.163.116:8003/comments/clear`,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        crossDomain: true,
        success: () => {alert("All comments deleted"); updateCommentsTable(); },
      });
    } catch (ex) {updateCommentsTable()}
  }
})

//disgusting
setTimeout(() => {
  $('.btnDelete').click(function() {
    try {
      const commentID = $(this).attr("commentid")
      $.ajax({
        type: "DELETE",
        url: `http://86.25.163.116:8003/comments/remove/${commentID}`,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        crossDomain: true,
        success: () => {alert("Comment deleted"); updateCommentsTable(); },
      });
    } catch (ex) { updateCommentsTable()}
  })

  $('.btnEdit').click(function() {
    try{
      const commentID = $(this).attr("commentid")
      comment = prompt()
      $.ajax({
        type: "PATCH",
        url: `http://86.25.163.116:8003/comments/update/${commentID}`,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        crossDomain: true,
        data: JSON.stringify({
          "comment": comment
        }),
        success: () => {alert("Comment edited"); updateCommentsTable(); },
      });
    } catch(ex) {updateCommentsTable()}
  })
}, 1000)